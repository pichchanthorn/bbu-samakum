import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import MembersDirectory from "@/components/MembersDirectory";
import InfoPanel from "@/components/InfoPanel";
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
      <Wrap className="grid grid-cols-[1fr_292px] items-start gap-8 pb-14 max-[1080px]:grid-cols-1">
        <MembersDirectory members={members} />
        <InfoPanel note="New members are added the moment they verify their university email." />
      </Wrap>
    </>
  );
}
