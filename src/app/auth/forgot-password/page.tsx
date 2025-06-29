import ForgotPasswordForm from "@/modules/auth/components/forgotPasswordForm/ForgotPassowrdForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-[#ff5100]">
        Forgot your password?
      </h1>
      <p className="text-3xl font-bold">
        Reset it <span className="text-[#ebe83a]">here</span>
      </p>{" "}
      <ForgotPasswordForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-center text-gray-500" href={"login"}>
          You already have an account, Sign In
        </Link>

        <Link className="text-center text-gray-500" href={"register"}>
          Don't have an account yet?, Create one
        </Link>
      </nav>
    </>
  );
}