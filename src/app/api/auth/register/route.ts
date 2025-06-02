import { z } from 'zod';
import { NextApiResponse, NextApiRequest } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid Email Format.'),
  password: z
    .string()
    .min(6, 'You password must be at least 6 characters long'),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method NOT allowed!' });
  }

  const result = schema.parse(req.body);

  const { name, email, password } = result;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('HASHED PASSWORD----------------->>>>', hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
      },
    });
    
    return res.status(201).json({ message: 'user registered successfully' });

  } catch (error) {
    return res.status(400).json({ message: 'Invalid Input', error: error });
  }
};
export default handler;
