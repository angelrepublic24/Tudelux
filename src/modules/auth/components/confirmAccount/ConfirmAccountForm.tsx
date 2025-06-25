'use client';

import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useConfirmAccount } from "../../services/auth.service";

export default function ConfirmAccountForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const { mutate, isPending } = useConfirmAccount();

  // ✅ Este useEffect espera que el token esté completo antes de mutar
  useEffect(() => {
    if (isComplete && token.length === 6) {
      mutate(token, {
        onSuccess: () => {
          toast.success("Account confirmed!");
          router.push("/login");
        },
        onError: (error) => {
          toast.error(error.message || "Invalid token");
        },
      });
    }
  }, [isComplete, token]);

  const handleChange = (val: string) => {
    setToken(val);
    setIsComplete(false);
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  return (
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
  );
}
