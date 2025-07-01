import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { promises } from 'dns';
import { date } from 'zod';

const basedURL = 'http://localhost:3000/api';

type AuthUser = {
  name: string;
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthStore = {
  authUser: AuthUser | null;
  isRegistering: boolean;
  isLoggingIN: boolean;

  register: (data: RegisterData) => Promise<boolean>;
  login: (data: LoginData) => Promise<boolean>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIN: false,

  register: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await axios.post<AuthUser>(`${basedURL}/auth/register`, data);
      set({ authUser: res.data });
      toast.success('Account created successfully');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      set({ isRegistering: false });

      // redirect('/dashboard');
    }
  },

  login: async (data) => {
    set({ isLoggingIN: true });
    try {
      const res = await axios.post<AuthUser>(`${basedURL}/auth/login`, data);
      set({ authUser: res.data });
      toast.success('Login successful');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    } finally {
      set({ isLoggingIN: false });
    }
  },
}));
