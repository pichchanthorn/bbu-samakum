import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import DeptCard from "@/components/DeptCard";
import InfoPanel from "@/components/InfoPanel";
import { departments } from "@/lib/mock-data";

export const metadata = {
  title: "Departments — BBU Samakum",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageBanner
        eyebrow="6 faculties at BBU"
        title="Departments"
        description="BBU Samakum currently runs on the IT Department. The other faculties below are shown for reference and aren't open yet."
      />
      <Wrap className="grid grid-cols-[1fr_292px] items-start gap-8 pt-[22px] pb-14 max-[1080px]:grid-cols-1">
        <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
          {departments.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
        <InfoPanel
          note="Only the IT Department is open right now — other faculties launch as they get verified leads."
          ctaLabel="Sign up with university email"
        />
      </Wrap>
    </>
  );
}
