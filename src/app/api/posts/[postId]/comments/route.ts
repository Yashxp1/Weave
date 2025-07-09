import { getUserByToken } from '@/lib/getUser';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  content: z.string().min(1),
  // postId: z.string(),
  parentId: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
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

    const { content, parentId, image } = result.data;
    const { postId } = await params;

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
        image: image || null,
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
  const { postId } = await params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        parentId: null,
      },
      orderBy: {
        createdAt: 'desc',
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            profilePic: true,
          },
        },
        children: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                profilePic: true,
              },
            },
          },
        },
      },
    });

    if (!comments) {
      return NextResponse.json(
        {
          response: 'No comments found',
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('Error Fetching comments', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {}
