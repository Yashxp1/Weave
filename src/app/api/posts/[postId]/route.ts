import prisma from '@/lib/prisma';
import generateToken from '@/lib/token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            reposts: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ message: 'POST NOT FOUND!' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error getting the posts', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await generateToken(req);
    const { postId } = await params;

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    if (post.authorId !== user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await prisma.post.delete({ where: { id: postId } });

    return NextResponse.json(
      { message: `Post deleted with id: ${postId}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('[DELETE_POST_ERROR]', error);
    return NextResponse.json(
      {
        message: 'Server Error',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
