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
    // console.log('JWT token in request:', token);

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

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        userId?: string;
      };
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.json(
        { message: 'Unauthorized (invalid token)' },
        { status: 401 }
      );
    }

    if (!decoded?.userId) {
      return NextResponse.json(
        { message: 'Unauthorized (invalid token payload)' },
        { status: 401 }
      );
    }

    const authorId = decoded.userId;

    const body = await req.json();
    let result;
    try {
      result = schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { message: 'Validation failed', errors: error.errors },
          { status: 400 }
        );
      }
      throw error; // Re-throw unexpected errors
    }

    const { content, image } = result;

    const post = await prisma.post.create({
      data: { content, image, authorId },
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

    return NextResponse.json(
      {
        message: 'Post created successfully',
        ...post,
        likedByUser: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

async function addLikedByUser(posts: any[], userId: string) {
  return Promise.all(
    posts.map(async (post) => {
      const like = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId: post.id,
          },
        },
      });

      return {
        ...post,
        likedByUser: !!like,
      };
    })
  );
}

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get('jwt')?.value;
    // console.log('JWT token in request:', token);

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

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        userId?: string;
      };
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.json(
        { message: 'Unauthorized (invalid token)' },
        { status: 401 }
      );
    }

    if (!decoded?.userId) {
      return NextResponse.json(
        { message: 'Unauthorized (invalid token payload)' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
            comments: true,
            reposts: true,
          },
        },
      },
    });

    const postsWithLiked = await addLikedByUser(posts, userId);

    return NextResponse.json({ posts: postsWithLiked }, { status: 200 });
  } catch (error) {
    console.error('Error getting posts:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
