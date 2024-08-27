import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request, response) {
  if (!request.cookies.get("token")) {
    if (request.nextUrl.pathname == "/" || request.nextUrl.pathname != "/") {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("token");
      response.cookies.delete("user");
      if (request.nextUrl.pathname == "/") return;
      else return response;
    }
  } else {
    if (request.cookies.get("token").value == "") {
      if (request.nextUrl.pathname == "/" || request.nextUrl.pathname != "/") {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        response.cookies.delete("user");
        if (request.nextUrl.pathname == "/") return;
        else return response;
      }
    }
    if (request.nextUrl.pathname == "/")
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/icons/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
