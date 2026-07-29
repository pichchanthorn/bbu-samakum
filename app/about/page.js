import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import { ShieldCheckIcon, NoSpamIcon, MembersIcon } from "@/components/icons";
import { missionValues } from "@/lib/mock-data";

export const metadata = {
  title: "About — BBU Samakum",
};

const valueIcons = {
  verified: ShieldCheckIcon,
  "spam-free": NoSpamIcon,
  classmates: MembersIcon,
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Starting with the IT Department"
        title="About BBU Samakum"
        description="A verified space built first for BBU's IT Department — helping students and lecturers find and trust each other online."
      />
      <Wrap className="grid grid-cols-2 items-start gap-11 pt-2.5 pb-[50px] max-[880px]:grid-cols-1">
        <div>
          <h2 className="mb-3 text-[23px] text-heading">Our mission</h2>
          <p className="mb-3 text-sm text-muted">
            BBU Samakum (&quot;samakum&quot; means community) exists because open
            groups get flooded with strangers, spam accounts, and people who have
            nothing to do with the university.
          </p>
          <p className="mb-3 text-sm text-muted">
            Right now, BBU Samakum is open to the IT Department only. Every member
            has confirmed a real @pp.bbu.edu.kh email before posting a single word
            — so what you read and who you talk to are actually part of BBU&apos;s
            IT Department.
          </p>
        </div>
        <div className="mt-1.5 flex flex-col gap-[18px]">
          {missionValues.map((value) => {
            const Icon = valueIcons[value.id];
            return (
              <div key={value.id} className="flex gap-3.5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-paper-2 text-moss">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="mb-[3px] text-sm text-heading">{value.title}</h4>
                  <p className="text-[12.5px] text-muted">{value.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Wrap>
    </>
  );
}
