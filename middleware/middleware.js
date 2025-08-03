import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const key = new TextEncoder().encode('varylhasbiathala');

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request) {
  const token = request.cookies.get('session')?.value || '';
  const pathname = request.nextUrl.pathname;

  const session = token ? await verifyToken(token) : null;
  const isAuthRoute = pathname.startsWith('/authentication');

  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL('/authentication/sign-in', request.url));
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|.*\\.ico).*)'],
};
