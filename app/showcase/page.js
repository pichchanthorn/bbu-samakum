import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import ShowcaseFilters from "@/components/ShowcaseFilters";
import PostCard from "@/components/PostCard";
import { showcaseItems } from "@/lib/mock-data";

export const metadata = {
  title: "Showcase — BBU Samakum",
};

export default function ShowcasePage() {
  return (
    <>
      <PageBanner
        eyebrow="IT Department only"
        title="IT Department Showcase"
        description="Projects and articles shared by verified IT Department students and lecturers."
      />
      <Wrap className="pt-[22px] pb-14">
        <ShowcaseFilters />
        <div className="grid grid-cols-3 gap-5 max-[880px]:grid-cols-1">
          {showcaseItems.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <button className="mt-5 w-full rounded-[10px] border border-line bg-surface py-3.5 text-[13.5px] text-charcoal transition-colors duration-200 hover:bg-paper-2">
          Show more posts
        </button>
      </Wrap>
    </>
  );
}
