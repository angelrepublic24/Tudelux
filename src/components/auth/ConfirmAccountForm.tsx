"use client";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { confirmAccount } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";

export default function ConfirmAccountForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const {mutate, isPending} = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
        toast.success(data)
        router.push("/auth/login");
    },
    onError: (error) => {
        toast.error(error.message)
    }
  })

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
