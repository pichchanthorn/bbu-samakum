import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import MemberCard from "@/components/MemberCard";
import { SearchIcon } from "@/components/icons";
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
        <div className="my-6 flex flex-wrap gap-3.5">
          <div className="flex max-w-[380px] flex-1 items-center gap-2.5 rounded-[10px] border border-line bg-surface px-4 py-2.5 text-faint">
            <SearchIcon size={16} />
            <input
              type="text"
              placeholder="Search members by name..."
              disabled
              className="flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-faint"
            />
          </div>
          <div className="cursor-pointer rounded-[10px] border border-line bg-surface px-4 py-2.5 font-mono-sans text-[13px] text-charcoal">
            Track: All
          </div>
          <div className="cursor-pointer rounded-[10px] border border-line bg-surface px-4 py-2.5 font-mono-sans text-[13px] text-charcoal">
            Year: All
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 max-[1080px]:grid-cols-3 max-[880px]:grid-cols-2 max-[560px]:grid-cols-1">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </Wrap>
    </>
  );
}
