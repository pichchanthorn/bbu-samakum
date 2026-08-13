import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase's default (free-tier, no custom SMTP) confirmation email only
// embeds {{ .ConfirmationURL }}, which points at GoTrue's own hosted
// /auth/v1/verify endpoint, not this app. GoTrue verifies the link there
// and then redirects back here with a PKCE `code` query param (since our
// browser client uses flowType: "pkce"). This route is what turns that
// code into an actual session — nothing else in the app does.
//
// The `token_hash` branch below is a fallback for the older verifyOtp-style
// link (used if the email template is ever customized to embed
// {{ .TokenHash }} directly instead of {{ .ConfirmationURL }}), which
// isn't reachable with the current locked template but costs nothing to
// support.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";

  const supabase = await createClient();
  let error = null;

  if (code) {
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  } else if (tokenHash && type) {
    ({ error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type }));
  } else {
    error = { message: "This verification link is missing or malformed." };
  }

  if (error) {
    const redirectUrl = new URL("/sign-in", origin);
    redirectUrl.searchParams.set("error", error.message);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(new URL(next, origin));
}
