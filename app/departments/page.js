import Wrap from "@/components/Wrap";
import PageBanner from "@/components/PageBanner";
import DeptCard from "@/components/DeptCard";
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
      <Wrap className="pt-[22px] pb-14">
        <div className="grid grid-cols-3 gap-4 max-[1080px]:grid-cols-2 max-[880px]:grid-cols-1">
          {departments.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
      </Wrap>
    </>
  );
}
