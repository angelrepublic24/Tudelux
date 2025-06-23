'use client';

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { toast } from "react-toastify";
import { useValidateToken } from "../../services/auth.service";

type Props = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>,
  token: string,
  setToken: Dispatch<SetStateAction<string>>
}

export default function ValidateTokenForm({setIsValidToken, token, setToken}: Props) {
  const handleValidateToken = useValidateToken();
    const [isComplete, setIsComplete] = useState(false)


  useEffect(() => {
    if (isComplete && token.length === 6) {
      handleValidateToken.mutate(token, {
        onSuccess: () => {
          toast.success("Token is valid");
          setIsValidToken(true);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  }, [isComplete]);

  return (
    <div className="flex justify-center items-center gap-5 my-10">
      {/* <p className="text-lg mb-2">Enter the 6-digit code sent to your email</p> */}
      <PinInput
        otp
        value={token}
        onChange={(val) => {
          setToken(val);
          setIsComplete(false);
        }}
        onComplete={() => setIsComplete(true)}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <PinInputField
            key={i}
            className="h-10 w-10 text-center flex border border-gray-300 shadow rounded-lg placeholder-white"
          />
        ))}
      </PinInput>
    </div>
  );
}
