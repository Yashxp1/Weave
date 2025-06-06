import { getUserByToken } from '@/lib/getUser';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  content: z.string().min(1),
  postId: z.string(),
  parentId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ message: 'Invalid Input' }, { status: 400 });
    }

    const { content, postId, parentId } = result.data;

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ message: 'Post NOT found' }, { status: 404 });
    }

    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: {
          id: parentId,
        },
      });
      if (!parentComment) {
        return NextResponse.json(
          { message: 'Parent comment NOT found' },
          { status: 400 }
        );
      }
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: user.id,
        parentId: parentId || null,
      },
    });

    return NextResponse.json(
      { message: 'Comment created', data: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error creating comment: ', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        createdAt: 'desc',
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
      },
    });

    if (!comments) {
      return NextResponse.json(
        {
          response: comments,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error Fetching comments', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
