import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import ShowcaseGrid from "@/components/ShowcaseGrid";
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
      <Wrap className="pt-[22px] pb-14">
        <ShowcaseGrid items={showcaseItems} initialQuery={q} />
      </Wrap>
    </>
  );
}
