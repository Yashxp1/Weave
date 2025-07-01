'use client';
import { Loginschema } from '@/schema/Auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '../ui/input';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { PacmanLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { login, isLoggingIN } = useAuthStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof Loginschema>>({
    resolver: zodResolver(Loginschema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof Loginschema>) => {
    console.log(data);
    const success = await login(data);
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label> Email</Label>
              <Input
                {...form.register('email')}
                id="email"
                type="email"
                placeholder="johndoe@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500 mt-1">
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
                <p className="text-xs text-red-500 mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="">
              <Button type="submit" className="w-full">
                {isLoggingIN ? <PacmanLoader size={10} /> : 'Login'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="w-full bg-">
          <Link href="/register" className="w-full">
            <Button variant="link" className="w-full justify-center">
              Don't have an account? Register
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
