import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  content: z.string().min(1, 'Content is required'),
  image: z.string().url().optional().or(z.literal('')),
});

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get('jwt')?.value;
    console.log('JWT token in request:', token);

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decoded?.userId) {
      return NextResponse.json(
        { message: 'Unauthorized (invalid token)' },
        { status: 401 }
      );
    }

    const authorId = decoded.userId;

    const body = await req.json();
    const result = schema.parse(body);

    const { content, image } = result;

    const post = await prisma.post.create({
      data: { content, image, authorId },
    });

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server Error', error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
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

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.log('Error getting posts --------->', error);
    return NextResponse.json({ message: 'Sever Error' }, { status: 500 });
  }
}
