import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  const res = NextResponse.next({ headers });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
