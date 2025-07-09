import { getUserByToken } from '@/lib/getUser';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const { commentId } = await params;

    const user = await getUserByToken(req);
    if (!user) {
      return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return NextResponse.json(
        { message: 'Comment doesnt exist' },
        { status: 404 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId: user.id,
          commentId: commentId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_commentId: {
            userId: user.id,
            commentId,
          },
        },
      });

      const likeCount = await prisma.like.count({ where: { commentId } });

      return NextResponse.json(
        { message: 'Comment unliked', likeCount },
        { status: 200 }
      );
    }

    const newLike = await prisma.like.create({
      data: {
        userId: user.id,
        commentId: commentId,
      },
    });

    const likeCount = await prisma.like.count({ where: { commentId } });

    return NextResponse.json(
      { message: 'Comment liked successfully', data: newLike, likeCount },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Server Error',
      },
      { status: 500 }
    );
  }
}
