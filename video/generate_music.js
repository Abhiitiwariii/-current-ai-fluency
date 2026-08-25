// Generates a low-key ambient pad WAV (no external assets/keys) for the persona
// clips. Soft detuned chord + slow tremolo + long fade in/out, kept quiet so it
// sits under the captions without distracting. Output: public/ambient.wav
const fs = require("fs");
const path = require("path");

const SR = 44100;
const DUR = 30; // seconds (matches the 900-frame / 30fps clip)
const N = SR * DUR;
const PEAK = 0.16; // low-key

// A warm, open chord (A major-ish), each note with a couple of detuned partials.
const notes = [110.0, 164.81, 220.0, 277.18, 329.63];
const detunes = [-0.15, 0.0, 0.18];

const data = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const t = i / SR;
  let s = 0;
  for (const f of notes) {
    for (const d of detunes) {
      s += Math.sin(2 * Math.PI * (f + d) * t);
    }
  }
  s /= notes.length * detunes.length;
  // gentle tremolo
  s *= 1 + 0.1 * Math.sin(2 * Math.PI * 0.08 * t);
  data[i] = s;
}

// envelope: 3s fade in, 4s fade out
const fadeIn = 3 * SR;
const fadeOut = 4 * SR;
for (let i = 0; i < N; i++) {
  let env = 1;
  if (i < fadeIn) env = i / fadeIn;
  else if (i > N - fadeOut) env = (N - i) / fadeOut;
  data[i] *= env * PEAK;
}

// write 16-bit mono PCM WAV
const bytesPerSample = 2;
const buffer = Buffer.alloc(44 + N * bytesPerSample);
buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + N * bytesPerSample, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(1, 22); // mono
buffer.writeUInt32LE(SR, 24);
buffer.writeUInt32LE(SR * bytesPerSample, 28);
buffer.writeUInt16LE(bytesPerSample, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(N * bytesPerSample, 40);
for (let i = 0; i < N; i++) {
  let v = Math.max(-1, Math.min(1, data[i]));
  buffer.writeInt16LE((v * 32767) | 0, 44 + i * bytesPerSample);
}

const outDir = path.join(__dirname, "public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "ambient.wav"), buffer);
console.log("wrote public/ambient.wav", (buffer.length / 1e6).toFixed(2), "MB");
