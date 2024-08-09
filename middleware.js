import cookie from 'cookie';
import { NextResponse } from 'next/server'
import {jwtDecode} from 'jwt-decode';
const secretkey = process.env.SECRET_KEY;

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const isAuthenticated = !!cookies.token;
  const token = cookies.token;
  let isAdmin = false;
  
  if(token){
    try {
      const decodedToken = jwtDecode(token);
     const  admin = decodedToken.isAdmin;
      if(admin){
        isAdmin=true;
      }
      
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  }

  if (!isAuthenticated && path === '/user/profile') {
    const loginUrl = new URL('/user/login', request.url)
    loginUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(loginUrl);
  }

  if (!isAuthenticated && path === '/cabs/bookcab') {
    const loginUrl = new URL('/user/login', request.url)
    loginUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(loginUrl);
  }

  const publicpath = path === '/user/login' || path === '/user/signup'
  if (isAuthenticated && publicpath) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }


  if (!isAdmin &&path === '/admin') {
   
      return NextResponse.redirect(new URL('/unauthorized', request.nextUrl));
    
  }
  return NextResponse.next();

}


export const config = {
  matcher: [
    '/',
    '/user/profile',
    '/user/login',
    '/user/signup',
    '/cabs/bookcab',
    '/admin'
  ],
};