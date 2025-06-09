import { getUserByToken } from '@/lib/getUser';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { targetUserId: string } }
) {
  const { targetUserId } = params;
  try {
    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json(
        { message: 'User not authorized' },
        { status: 401 }
      );
    }

    const userId = user.id;

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      });

      return NextResponse.json({ message: 'Unfollowed user' }, { status: 200 });
    } else {
      await prisma.follow.create({
        data: {
          followerId: userId,
          followingId: targetUserId,
        },
      });

      return NextResponse.json({ message: 'Followed user' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error following/unfollowing user', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { targetUserId: string } }
) {
  const { targetUserId } = params;

  try {
    const user = await getUserByToken(req);
    if (!user || user.id !== targetUserId) {
      return NextResponse.json(
        { message: 'USER NOT AUTHORIZED' },
        { status: 401 }
      );
    }
    const userId = user.id;

    const followingUsers = await prisma.follow.findMany({
      where: {
        followerId: targetUserId,
      },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            posts: {
              select: {
                id: true,
                content: true,
                image: true,
                createdAt: true,
              },
            },
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
      },
    });

    const cleanFollowing = followingUsers.map((f) => f.following);

    return NextResponse.json({ following: cleanFollowing }, { status: 200 });
  } catch (error) {
    console.error('Error getting followers', error);
    return NextResponse.json({ message: 'Sever Error' }, { status: 500 });
  }
}
