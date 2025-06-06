import ConfirmAccountForm from "@/modules/auth/components/confirmAccount/ConfirmAccountForm";

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-[#ff5100]">Confirm You Account</h1>
      <p className="text-3xl font-bold">
        Please enter the code you received {" "}
        <span className="text-amber-500">by email</span>
      </p>
      <ConfirmAccountForm />
    </>
  );
}