import PasswordResetHandle from '@/modules/auth/components/passwordReset/PasswordResetHandle';
import React from 'react'

export default function PasswordResetPage() {
   return (
    <>
      <h1 className="font-black text-6xl text-[#ff5100]">
        Reset your password
      </h1>
      <p className="text-3xl font-bold">
      Please enter the code you received {" "}
      <span className="text-[#ebe83a]"> by email</span>
      </p>

      <PasswordResetHandle/>
    </>
  );
}
