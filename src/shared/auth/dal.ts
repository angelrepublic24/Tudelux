import { UserSchema } from '@/modules/auth/schemas/auth.schema';
import { Api } from '@/shared/global/Global';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const verifySession = cache(async () => {
 try {
   const cookieHeader = await headers()
  const cookies = cookieHeader.get('cookie');

  const { data } = await Api.get("/auth/profile", {
    headers: {
      Cookie: cookies ?? '', // 👈 pasa la cookie manualmente
    },
  });

  const result = UserSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
 } catch (error) {
  redirect("/auth/login");
 }
});
