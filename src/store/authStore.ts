import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { redirect } from 'next/navigation';

const basedURL = 'http://localhost:3000/api';

type AuthUser = {
  name: string;
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: String;
  password: string;
};

type AuthStore = {
  authUser: AuthUser | null;
  isRegistering: boolean;

  register: (data: RegisterData) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isRegistering: false,

  register: async (data: RegisterData) => {
    set({ isRegistering: true });
    try {
      const res = await axios.post<AuthUser>(`${basedURL}/auth/register`, data);
      set({ authUser: res.data });
      toast.success('Account created successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      redirect('/dashboard')
      set({ isRegistering: false });
    }
  },
}));
