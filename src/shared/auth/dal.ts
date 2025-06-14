import { UserSchema } from '@/modules/auth/schemas/auth.schema';
import { Api } from '@/shared/global/Global';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const verifySession = cache(async () => {
 try {
   const headersList = await headers();
    const cookieHeader = headersList.get('cookie') || '';

    // ⚠️ reenviamos todas las cookies al backend
    const { data } = await Api.get("/auth/profile", {
      headers: {
        Cookie: cookieHeader, // 🔥 reenviamos la cookie
      },
      withCredentials: true,
    });
  //  const cookieStore = await cookies();
  //   const token = cookieStore.get('TUDELU_TOKEN')?.value;

  //   if (!token) redirect("/auth/login");

  // const { data } = await Api.get("/auth/profile", {
  //   headers: {
  //     Cookie: `TUDELU_TOKEN=${token}`,
  //   },
  //   withCredentials: true
  // });

  const result = UserSchema.safeParse(data);
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
