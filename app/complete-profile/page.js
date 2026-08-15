import Wrap from "@/components/Wrap";
import ProfileCompletionForm from "@/components/ProfileCompletionForm";

export const metadata = {
  title: "Complete your profile — BBU Samakum",
};

export default function CompleteProfilePage() {
  return (
    <Wrap className="flex justify-center px-6 pt-[52px] pb-[70px]">
      <ProfileCompletionForm />
    </Wrap>
  );
}
