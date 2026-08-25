// supabase.js — optional, ready-to-connect backend (v3.2).
//
// The app is backend-free by default. When BOTH env vars are set, this exposes a
// live Supabase client for Google auth + feedback/email capture. When they're
// absent (the default demo state), everything degrades to a no-op so the app
// keeps working purely on localStorage — nothing here ever throws or blocks the UI.
//
// Set these in .env.local (see .env.example) and in Vercel to go live:
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY

import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only construct the client when both values exist — createClient throws on
// undefined args, which would break the static build.
export const supabase = URL && ANON ? createClient(URL, ANON) : null;

export function isSupabaseConfigured() {
  return !!supabase;
}

// Best-effort insert. Resolves quietly when unconfigured or on any error, so a
// dropped network / RLS issue never surfaces to the user or loses the local copy.
export async function insertRow(table, row) {
  if (!supabase) return { ok: false, skipped: true };
  try {
    const { error } = await supabase.from(table).insert(row);
    if (error) return { ok: false, error };
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}
