import { getUserByToken } from '@/lib/getUser';
import prisma from '@/lib/prisma';
import { tree } from 'next/dist/build/templates/app-page';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json(
        { message: 'User not authorized' },
        { status: 500 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        profilePic: true,
        posts: {
          select: {
            id: true,
            content: true,
            image: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting users', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
