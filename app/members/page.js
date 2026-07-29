import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import MembersDirectory from "@/components/MembersDirectory";
import { members } from "@/lib/mock-data";

export const metadata = {
  title: "Members — BBU Samakum",
};

export default function MembersPage() {
  return (
    <>
      <PageBanner
        eyebrow="420+ verified IT Department accounts"
        title="IT Department Directory"
        description="Verified students and lecturers in the BBU IT Department."
      />
      <Wrap className="pb-14">
        <MembersDirectory members={members} />
      </Wrap>
    </>
  );
}
