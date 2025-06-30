import prisma from '@/lib/prisma';
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
    });

    if (!post) {
      return NextResponse.json({ message: 'POST NOT FOUND!' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Signle post fetched', response: post },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting the posts', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
