import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useResetPassword } from "../../services/auth.service";
import { ResetPassworSchema } from "../../schemas/auth.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ResetPasswordInputs = z.infer<typeof ResetPassworSchema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const resetPassword = useResetPassword(token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(ResetPassworSchema),
  });

  const onSubmit = (data: ResetPasswordInputs) => {
    resetPassword.mutate(data.password, {
      onSuccess: () => {
        toast.success("Password reset successfully!");
        reset()
        router.push("/auth/login");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 mt-14"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">New Password</label>
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat new password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation && (
          <span className="text-red-500 text-sm">
            {errors.password_confirmation.message}
          </span>
        )}
      </div>

      <input
        type="submit"
        value="Save Password"
        className="border border-[#ff5100] text-[#ff5100] font-black hover:bg-[#ff5100] hover:text-white transition w-full p-3 rounded-lg text-xl cursor-pointer"
      />
    </form>
  );
}
