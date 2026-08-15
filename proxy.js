import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Routes that must never redirect to /complete-profile, regardless of
// profile state — the sign-in flow itself (email -> confirm -> verified)
// and the auth callback that completes it must stay untouched, and
// /complete-profile obviously can't redirect to itself.
const EXEMPT_PATHS = ["/sign-in", "/auth/confirm", "/complete-profile"];

// Enforces the Phase 6 "mandatory profile completion" step server-side, on
// every navigation, so an incomplete profile can't be bypassed by simply
// not clicking through a client-side redirect (which would still let the
// underlying page flash on screen first). This is the one place in the app
// that checks "is this user's profile complete" — everywhere else
// (Sidebar.js, the post-author displays) only ever renders a *complete*
// profile's data or the pre-existing "New member" fallback for edge cases
// this gate itself is meant to make unreachable going forward.
//
// Named `proxy` (not `middleware`) per Next.js 16's file convention rename
// — this build (16.2.12) still supports `middleware.js` but warns it's
// deprecated in favor of `proxy.js` exporting `proxy`.
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
        },
      },
    }
  );

  // getUser() (not getSession()) so an expired/invalid token is actually
  // revalidated against Supabase here, not just trusted from the cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || EXEMPT_PATHS.includes(pathname)) {
    return response;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  if (!profile?.name?.trim()) {
    const url = request.nextUrl.clone();
    url.pathname = "/complete-profile";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Skip static assets and Next internals — no auth/profile relevance and
  // no reason to pay a middleware + DB round trip for them.
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|opengraph-image).*)"],
};
