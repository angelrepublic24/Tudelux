
import RegisterDistributorForm from "@/modules/distributor/components/RegisterDistributorForm";
import RegisterSalesForm from "@/modules/sales/components/RegisterSalesForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Tudelu - Create Account',
//   description: 'Create an account to start tracking your income and expenses',
}
export default function RegisterSalesPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-[#ff5100]">Create Account</h1>
      <p className="text-3xl font-bold">
        and be part of our{" "}
        <span className="text-amber-500">Sales'team</span>
      </p>
      <RegisterSalesForm/>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link className="text-center text-gray-500" href={'login'}>You already have an account, Sign In</Link>
      </nav>
      
    </>
  );
}