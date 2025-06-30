import { getUserByToken } from '@/lib/getUser';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = await params;

    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json(
        { message: 'User not authorize' },
        { status: 401 }
      );
    }

    const userId = user.id;

    const existingRepost = await prisma.repost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingRepost) {
      return NextResponse.json(
        { message: 'Already reposted' },
        { status: 400 }
      );
    }

    const repost = await prisma.repost.create({
      data: {
        userId,
        postId,
      },
    });

    return NextResponse.json({message: "SUCCESSFULLY RESPOTED ON YOUR ACCOUNT",
      response: repost,
    });
  } catch (error) {
    console.error('Error reposting', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = await params;

  try {
    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json(
        { message: 'User not authorized' },
        { status: 401 }
      );
    }

    const userId = user.id;

    const deleteRepost = await prisma.repost.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!deleteRepost) {
      return NextResponse.json(
        {
          message: 'NO RESPOST FOUND',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Repost removed successfullt' },
      { status: 200 }
    );
  } catch (error) {
    if (error === 'P2025') {
      return NextResponse.json(
        { message: 'Repost not found' },
        { status: 404 }
      );
    }

    console.error('Error Deleting repost', error);
    return NextResponse.json({ message: 'Server' }, { status: 500 });
  }
}
