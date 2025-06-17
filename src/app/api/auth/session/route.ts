import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('TUDELU_TOKEN')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Llamas al backend para obtener el usuario
  const res = await fetch('https://tudeluserver.onrender.com/api/auth/profile', {
    headers: {
      Cookie: `TUDELU_TOKEN=${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) return NextResponse.json({ user: null }, { status: 401 });

  const user = await res.json();
  return NextResponse.json({ user });
}
