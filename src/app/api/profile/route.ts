import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get('jwt')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId?: string;
    };

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },

      select: {
        name: true,
        id: true,
        email: true,
        profilePic: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        posts: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            content: true,
            image: true,
            createdAt: true,
          },
        },
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...user,
      followerCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
