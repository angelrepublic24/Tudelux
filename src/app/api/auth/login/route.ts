import { LoginSchema } from "@/schemas";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const loginParse = LoginSchema.safeParse(body);

  if (!loginParse.success) {
    const errors = loginParse.error.flatten().fieldErrors;
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(loginParse.data),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }
    const response = NextResponse.json({ user: data.user });

    response.cookies.set("TUDELU_TOKEN", data.token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
