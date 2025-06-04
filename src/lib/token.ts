import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function generateToken(userId: unknown) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

 ( await cookies()).set('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return token;
}
