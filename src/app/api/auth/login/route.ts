import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.json();
  console.log(process.env.API_URL)

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ message: data.message }), {
      status: res.status,
    });
  }

 (await cookies()).set('TUDELU_TOKEN', data.token, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  })

  return Response.json({ success: true });
}
