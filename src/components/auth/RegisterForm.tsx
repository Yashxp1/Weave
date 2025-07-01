'use client';
import { Registerschema } from '@/schema/Auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { date, z } from 'zod';
import { PacmanLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '../ui/input';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const { register, isRegistering } = useAuthStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof Registerschema>>({
    resolver: zodResolver(Registerschema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof Registerschema>) => {
    console.log(data);
    const success = await register(data);
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-xl">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                {...form.register('name')}
                id="name"
                type="name"
                placeholder="John Doe"
              />
               {form.formState.errors.name && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                {...form.register('email')}
                id="email"
                type="email"
                placeholder="johndoe@example.com"
              />
               {form.formState.errors.email && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Password</Label>
              </div>
              <Input
                {...form.register('password')}
                id="password"
                type="password"
                placeholder="••••••••••••"
              />
              {form.formState.errors.password && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="">
              <Button type="submit" className="w-full">
                {isRegistering ? <PacmanLoader /> : 'Register'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="w-full bg-">
          <Link href="/login" className="w-full">
            <Button variant="link" className="w-full justify-center">
              Already have an account? Login
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
