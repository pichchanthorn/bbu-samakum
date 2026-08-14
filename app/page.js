import Link from "next/link";
import Wrap from "@/components/Wrap";
import IdCard from "@/components/IdCard";
import HomeFeed from "@/components/HomeFeed";
import InfoPanel from "@/components/InfoPanel";
import { idCardMember, homeStats, joinSteps } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { getPostsWithEngagement } from "@/lib/posts";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const currentUserId = userData?.user?.id ?? null;

  const { posts, error } = await getPostsWithEngagement({
    type: "feed",
    currentUserId,
  });

  return (
    <>
      {/* Hero */}
      <div className="pt-14 pb-12">
        <Wrap className="grid grid-cols-[1.1fr_0.9fr] items-center gap-12 max-[880px]:grid-cols-1 max-[880px]:gap-9">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3.5 py-1.5 text-[12.5px] text-moss before:content-['●'] before:text-[9px] before:text-stamp">
              IT Department • verified members only
            </div>
            <h1 className="mb-4 text-[42px] leading-[1.15] font-bold tracking-[-0.01em] text-heading max-[880px]:text-[32px]">
              A community built for BBU&apos;s <span className="text-brass">IT Department</span>
            </h1>
            <p className="mb-[26px] max-w-[460px] text-base text-muted">
              The gathering place for IT Department students and lecturers at Build
              Bright University. Registration only works with a university email
              (@pp.bbu.edu.kh) — no fake accounts, no spam.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/sign-in"
                className="inline-block rounded-full border border-ink bg-ink px-5 py-2.5 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss"
              >
                Sign up with university email
              </Link>
              <Link
                href="/departments"
                className="inline-block rounded-full border border-heading px-5 py-2.5 text-center text-sm font-semibold text-heading transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss hover:text-white"
              >
                View departments
              </Link>
            </div>
          </div>
          <IdCard member={idCardMember} />
        </Wrap>
      </div>

      {/* Stats */}
      <div className="border-t border-b border-line bg-paper-2">
        <Wrap className="grid grid-cols-3 py-7 max-[880px]:grid-cols-1 max-[880px]:gap-3.5">
          {homeStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center max-[880px]:border-b max-[880px]:border-line max-[880px]:pb-3 max-[880px]:last:border-b-0 max-[880px]:last:pb-0 ${
                i < homeStats.length - 1 ? "border-r border-line max-[880px]:border-r-0" : ""
              }`}
            >
              <div className="font-mono-sans text-[26px] font-bold text-heading">
                {stat.num}
              </div>
              <div className="mt-1 text-xs text-moss">{stat.label}</div>
            </div>
          ))}
        </Wrap>
      </div>

      {/* Community feed */}
      <Wrap className="py-14">
        <div className="mb-[22px]">
          <h2 className="text-[22px] font-bold text-heading">Community feed</h2>
          <p className="mt-[5px] text-[13.5px] text-muted">
            Posts from verified IT Department members appear here as soon as
            they&apos;re published.
          </p>
        </div>
        <div className="grid grid-cols-[1fr_292px] items-start gap-8 max-[1080px]:grid-cols-1">
          {error ? (
            <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
              Couldn&apos;t load the community feed right now. Please try
              again in a moment.
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
              {currentUserId ? (
                "No posts yet — be the first to share something."
              ) : (
                "Sign in with your university email to see the community feed."
              )}
            </div>
          ) : (
            <HomeFeed initialPosts={posts} userId={currentUserId} />
          )}

          <InfoPanel />
        </div>
      </Wrap>

      {/* Join in 3 steps */}
      <Wrap className="pb-14">
        <div className="rounded-card bg-ink text-white">
          <Wrap className="py-14">
            <div className="mb-[22px]">
              <h2 className="text-[22px] font-bold text-white">Join in 3 steps</h2>
              <p className="mt-[5px] text-[13.5px] text-[#B9C9C1]">
                A short verification flow — no need to upload an ID photo
              </p>
            </div>
            <div className="grid grid-cols-3 gap-5 max-[880px]:grid-cols-1">
              {joinSteps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-card border border-white/[0.14] p-[22px]"
                >
                  <div className="mb-3.5 flex h-7 w-7 items-center justify-center rounded-full border border-brass-light font-mono-sans text-[12.5px] text-brass-light">
                    {step.num}
                  </div>
                  <h3 className="mb-1.5 text-[15px] font-semibold">{step.title}</h3>
                  <p className="text-[13px] text-[#B9C9C1]">{step.desc}</p>
                </div>
              ))}
            </div>
          </Wrap>
        </div>
      </Wrap>
    </>
  );
}
