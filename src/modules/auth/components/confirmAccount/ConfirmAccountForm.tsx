"use client";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConfirmAccount } from "../../services/auth.service";

export default function ConfirmAccountForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const {mutate, isPending} = useConfirmAccount()

  const handleChange = (token: string) => {
    setIsComplete(false);
    setToken(token);
  };

  const handleComplete = async () => {
    setIsComplete(true);
        mutate(token)
  };

  return (
    <>
      <div className="flex justify-center gap-5 my-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
          isDisabled={isPending}
        >
          {[...Array(6)].map((_, i) => (
            <PinInputField
              key={i}
              className="h-10 w-10 border border-gray-300 shadow placeholder-white rounded-lg text-center"
            />
          ))}
        </PinInput>
      </div>
    </>
  );
}
