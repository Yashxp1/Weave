import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import generateToken from '@/lib/token';

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid Email Format.'),
  password: z
    .string()
    .min(6, 'You password must be at least 6 characters long'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = schema.parse(body);

    const { name, email, password } = result;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    generateToken(newUser.id);

    return NextResponse.json(
      { message: 'user registered successfully', data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    return NextResponse.json(
      { message: '---SERVER ERROR---' },
      { status: 500 }
    );
  }
}
