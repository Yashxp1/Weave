'use client';
import { Loginschema } from '@/schema/Auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<z.infer<typeof Loginschema>>({
    resolver: zodResolver(Loginschema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof Loginschema>) => {
    console.log('FORM SUBMITTED');
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-xl">Login</CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
          </CardDescription> */}
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>
          </CardAction> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                {...form.register('name')}
                id="name"
                type="name"
                placeholder="John Doe"
              />
            </div> */}

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                {...form.register('email')}
                id="email"
                type="email"
                placeholder="johndoe@example.com"
              />
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
            </div>
            <div className="">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="w-full bg-">
          <Link href="/login" className="w-full">
            <Button variant="link" className="w-full justify-center">
              Don't have an account? Register
            </Button>
          </Link>
          {/* <Link href="/login">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Link> */}
        </div>
        {/* <Button variant="outline" className="w-full">
          Login with Google
          </Button> */}
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
