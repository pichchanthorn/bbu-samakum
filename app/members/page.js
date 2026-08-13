import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import MembersDirectory from "@/components/MembersDirectory";
import InfoPanel from "@/components/InfoPanel";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Members — BBU Samakum",
};

// The `profiles` table only has one department right now (IT is the only
// active faculty per the domain restriction), so lecturers are always
// labeled "Lecturer · IT Department" — matching the fixed phrasing the old
// mock data used — rather than building out multi-department formatting
// nothing in the schema or product actually needs yet.
function formatRole(role, department) {
  if (role === "lecturer") return "Lecturer · IT Department";
  const trimmed = department?.trim();
  if (!trimmed) return "IT Department";
  return trimmed.replace(/^Department of\s+/i, "");
}

// Real sign-ups get a profiles row the moment they verify (see
// supabase/migrations/0003_profile_on_signup.sql), well before there's any
// profile-editing UI to fill in a name — so name/initials/batch are
// routinely null for real members today. Fall back to a clearly-a-
// placeholder label rather than showing blank space or the literal string
// "null". We can't fall back to their email instead: profiles has no email
// column by design (see 0003's comment — it's a world-readable directory
// table, and duplicating email there would expose every member's address
// to every other member).
function toDisplayMember(profile) {
  return {
    id: profile.id,
    initials: profile.initials?.trim() || "?",
    name: profile.name?.trim() || "New member",
    role: formatRole(profile.role, profile.department),
    batch: profile.batch?.trim() || "—",
  };
}

export default async function MembersPage() {
  const supabase = await createClient();

  const [{ data: userData }, { data: profiles, error }] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from("profiles")
      .select("id, name, initials, department, batch, role")
      .order("created_at", { ascending: true }),
  ]);

  const members = (profiles ?? []).map(toDisplayMember);

  return (
    <>
      <PageBanner
        eyebrow="420+ verified IT Department accounts"
        title="IT Department Directory"
        description="Verified students and lecturers in the BBU IT Department."
      />
      <Wrap className="grid grid-cols-[1fr_292px] items-start gap-8 pb-14 max-[1080px]:grid-cols-1">
        {error ? (
          <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
            Couldn&apos;t load the member directory right now. Please try
            again in a moment.
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
            {userData?.user ? (
              "No verified members yet."
            ) : (
              <>
                Sign in with your university email to view the member
                directory.
              </>
            )}
          </div>
        ) : (
          <MembersDirectory members={members} />
        )}
        <InfoPanel note="New members are added the moment they verify their university email." />
      </Wrap>
    </>
  );
}
