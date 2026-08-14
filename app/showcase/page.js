import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import ShowcaseGrid from "@/components/ShowcaseGrid";
import InfoPanel from "@/components/InfoPanel";
import { createClient } from "@/lib/supabase/server";
import { getPostsWithEngagement } from "@/lib/posts";

export const metadata = {
  title: "Showcase — BBU Samakum",
};

export default async function ShowcasePage({ searchParams }) {
  const { q = "" } = await searchParams;

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const currentUserId = userData?.user?.id ?? null;

  const { posts, error } = await getPostsWithEngagement({
    type: "showcase",
    currentUserId,
  });

  return (
    <>
      <PageBanner
        eyebrow="IT Department only"
        title="IT Department Showcase"
        description="Projects and articles shared by verified IT Department students and lecturers."
      />
      <Wrap className="grid grid-cols-[1fr_292px] items-start gap-8 pt-[22px] pb-14 max-[1080px]:grid-cols-1">
        {error ? (
          <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
            Couldn&apos;t load the showcase right now. Please try again in a
            moment.
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
            {currentUserId ? (
              "No showcase posts yet — be the first to share something."
            ) : (
              "Sign in with your university email to see the showcase."
            )}
          </div>
        ) : (
          <ShowcaseGrid items={posts} initialQuery={q} userId={currentUserId} />
        )}
        <InfoPanel note="Sign in to share your own project or article with the department." ctaLabel="Sign in to share" />
      </Wrap>
    </>
  );
}
