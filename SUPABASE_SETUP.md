# Supabase setup (Google login + email/feedback capture)

The app runs fully without this — Google login stays hidden and feedback/emails
are stored locally (visible in **Metrics → export**). Do the steps below only when
you want real Google sign-in and server-side capture. Everything is gated behind
two env vars, so nothing here can break the live demo.

## 1. Create a project
1. Go to <https://supabase.com> → **New project**. Note the project's **URL** and
   **anon public key** (Project Settings → API).

## 2. Create the tables
1. Open **SQL Editor** → paste the contents of
   [`supabase/migrations/0001_feedback_signups.sql`](supabase/migrations/0001_feedback_signups.sql)
   → **Run**. This creates `feedback` + `signups` with insert-only RLS for the anon role.

## 3. Enable Google sign-in
1. **Authentication → Providers → Google** → enable.
2. Create a Google OAuth client (Google Cloud Console → APIs & Services →
   Credentials → OAuth client ID → *Web application*). Paste the **client ID** and
   **client secret** into Supabase's Google provider.
3. In Google Cloud, add Supabase's callback URL (shown in the Supabase Google
   provider screen, e.g. `https://<project-ref>.supabase.co/auth/v1/callback`) to
   the OAuth client's **Authorized redirect URIs**.

## 4. Allow the app's origins to receive the redirect
**Authentication → URL Configuration → Redirect URLs**, add both:
- `http://localhost:3000`
- your production origin, e.g. `https://current-ai-fluency.vercel.app`

(The app calls `signInWithOAuth` with `redirectTo: window.location.origin`, so it
returns to whichever origin the user started from.)

## 5. Set the env vars
- **Local:** create `.env.local` (copy `.env.example`) and fill both values, then
  restart `npm run dev`.
- **Vercel:** Project → Settings → Environment Variables → add
  `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then redeploy.

## Verify
- The save-progress prompt now shows **"Continue with Google"**; it round-trips
  through Google and returns signed in (your name/email appear on the certificate).
- Submitting the **Feedback** form adds a row to `feedback`; a typed email adds a
  row to `signups`. Google users appear under **Authentication → Users**.
