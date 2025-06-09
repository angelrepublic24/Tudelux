// app/auth/logout/route.ts
import { cookies } from 'next/headers';

export async function POST() {
  // 🔥 Elimina la cookie
  (await cookies()).delete('TUDELU_TOKEN');

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
