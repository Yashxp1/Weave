import { getUserByToken } from '@/lib/getUser';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = await params;

  try {
    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
      });

      return NextResponse.json(
        {
          message: 'Unliked the post',
        },
        { status: 200 }
      );
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          postId,
        },
      });

      return NextResponse.json({ message: 'Liked the post' }, { status: 201 });
    }
  } catch (error) {
    console.error('Error liking the post', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
