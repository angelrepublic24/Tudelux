import LoginForm from "@/modules/auth/components/login/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tudelu - Login to Tudelu",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl lg:text-6xl text-[#ff5100]">Login</h1>
      <LoginForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-center text-sm lg:text-base text-gray-500" href={'register'}>Don't have an account yet?, Create one</Link>
        <Link className="text-center text-sm lg:text-base text-gray-500" href={'forgot-password'}>Did you forget your password? Click here to reset it.</Link>

      </nav>

    </>
  );
}