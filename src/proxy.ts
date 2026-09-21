import { NextResponse, type NextRequest } from "next/server";

/**
 * Basic Auth gate for /admin. Requires ADMIN_USERNAME / ADMIN_PASSWORD to be
 * set — if either is missing, no credentials can match and the route stays
 * locked rather than falling open.
 */
export function proxy(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);

    if (expectedUser && expectedPass && user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Dashboard"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
