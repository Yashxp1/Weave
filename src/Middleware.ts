import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value;

  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    console.log('ERROR IN MIDDLEWARE -----> ', error);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // App routes you want to protect
    '/dashboard',
    '/profile',

    // Add more if needed
  ],
};
