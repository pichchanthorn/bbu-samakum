import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import ShowcaseGrid from "@/components/ShowcaseGrid";
import InfoPanel from "@/components/InfoPanel";
import { showcaseItems } from "@/lib/mock-data";

export const metadata = {
  title: "Showcase — BBU Samakum",
};

export default async function ShowcasePage({ searchParams }) {
  const { q = "" } = await searchParams;

  return (
    <>
      <PageBanner
        eyebrow="IT Department only"
        title="IT Department Showcase"
        description="Projects and articles shared by verified IT Department students and lecturers."
      />
      <Wrap className="grid grid-cols-[1fr_292px] items-start gap-8 pt-[22px] pb-14 max-[1080px]:grid-cols-1">
        <ShowcaseGrid items={showcaseItems} initialQuery={q} />
        <InfoPanel note="Sign in to share your own project or article with the department." ctaLabel="Sign in to share" />
      </Wrap>
    </>
  );
}
