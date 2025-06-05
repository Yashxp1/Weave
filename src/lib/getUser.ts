import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { cookies } from 'next/headers';

export async function getUserByToken(req: Request) {
  const cookieStore = cookies();

  const token = (await cookieStore).get('jwt')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
    
  } catch (error) {
    console.error('TOKEN NOT FOUND!!!!', error);
  }
}
