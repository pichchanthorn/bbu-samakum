# BBU Samakum

The verified community website for Build Bright University's IT Department —
students and lecturers only, gated behind a `@pp.bbu.edu.kh` university email.

This is a Next.js (App Router) + Tailwind CSS rebuild of the original static
prototype, which is preserved untouched in [`reference/`](reference/) for
comparison.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Routes

- `/` — Home (hero + flippable ID card, stats, community feed, join steps)
- `/departments` — All 6 BBU faculties (only IT Department is active)
- `/showcase` — Project/article showcase with filter chips
- `/members` — Member directory
- `/sign-in` — University email verification flow
- `/about` — Mission and verification rationale

## Project structure

- `app/` — routes, one folder per page
- `components/` — shared UI (Sidebar, AppShell, IdCard, PostCard, DeptCard, etc.)
- `lib/mock-data.js` — all posts, members, departments, and showcase content
- `reference/` — the original static HTML/CSS/JS prototype, unmodified

## Notes

- No backend yet — the sign-in form's "Send verification code" button is a
  stub (`components/SignInForm.js`) structured so a real provider (e.g.
  Supabase Auth email OTP) can be wired in later without restructuring.
- Dark mode is handled by `next-themes` and persists across reloads.
- Scope is intentionally limited to the IT Department; the other 5 faculties
  on `/departments` are shown for reference only and aren't clickable.

## Build

```bash
npm run build
```
