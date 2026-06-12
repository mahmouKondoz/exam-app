// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("next-auth.session-token", "", {
    path: "/",
    expires: new Date(0), // instantly expire
  });

  return res;
}