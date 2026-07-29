import Wrap from "@/components/Wrap";
import SignInForm from "@/components/SignInForm";

export const metadata = {
  title: "Sign In — BBU Samakum",
};

export default function SignInPage() {
  return (
    <Wrap className="flex justify-center px-6 pt-[52px] pb-[70px]">
      <SignInForm />
    </Wrap>
  );
}
