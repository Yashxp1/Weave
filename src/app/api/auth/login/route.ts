import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Passowrd must be at least 6 characters long'),
});

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'Post') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const result = schema.parse(req.body);

  const { email, password } = result;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !hashedPassword) {
      return res.status(409).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res
      .status(201)
      .json({ userId: user.id, message: 'User logged in successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};
