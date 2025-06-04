import prisma from '@/lib/prisma';
import generateToken from '@/lib/token';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Passowrd must be at least 6 characters long'),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = schema.parse(body);

  const { email, password } = result;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 409 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

     const token = await generateToken(user.id);
 

    return NextResponse.json(
      { userId: user.id, message: 'User logged in successfully', token},
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server Error', error },
      { status: 500 }
    );
  }
}
