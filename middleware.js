import cookie from 'cookie';
import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const isAuthenticated = !!cookies.token;
  if (!isAuthenticated && path === '/user/profile') {
    const loginUrl = new URL('/user/login', request.url)
    loginUrl.searchParams.set('redirectTo', path)
    console.log(loginUrl);
    return NextResponse.redirect(loginUrl)
  }
 
  const publicpath = path === '/user/login' || path === '/user/signup'
  if(isAuthenticated && publicpath )
    {
          return NextResponse.redirect(new URL('/',request.nextUrl));
    }
  return NextResponse.next();

}


export const config = {
  matcher: [
    '/',
    '/user/profile',
    '/user/login',
    '/user/signup',
  ],
};