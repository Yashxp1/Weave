import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

type AuthUser = {
  name: string;
  email: string;
  password: string;
  profilePic: string | null;
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

type Author = {
  id: string;
  name: string;
  profilePic: string | null;
};

type Post = {
  id: string;
  content: string;
  image: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  likedByUser: boolean;
  ReposetedByUser: boolean;
  _count: {
    comments: number;
    likes: number;
    reposts: number;
  };
};

type Comment = {
  id: string;
  content: string;
  image: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  likedByUser: boolean;
  _count: {
    comments: number;
    likes: number;
  };
};

type Profile = {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  followerCount: number;
  followingCount: number;
  posts: {
    id: string;
    content: string;
    image?: string | null;
    createdAt: string;
  }[];
};



type AuthStore = {
  authUser: AuthUser | null;
  profile: Profile | null;
  isRegistering: boolean;
  // isAuthorized: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  posts: Post[];

  register: (data: RegisterData) => Promise<boolean>;
  login: (data: LoginData) => Promise<boolean>;

  getPosts: () => Promise<boolean>;
  getSinglePost: (postId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  repostPost: (postId: string) => Promise<void>;
  getComments: (postId: string) => Promise<void>;
  postComments: (postId: string, content: string) => Promise<void>;
  getProfile: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  profile: null,
  isRegistering: false,
  // isAuthorized: false,
  isLoggedIn: false,
  isLoading: false,
  posts: [],

  register: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await axios.post<AuthUser>(`${baseURL}/auth/register`, data);
      set({ authUser: res.data });
      toast.success('Account created successfully');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    // set({ isAuthorized: true });
    try {
      // isAuthorized:true
      const res = await axios.post<AuthUser>(`${baseURL}/auth/login`, data);
      set({ authUser: res.data });
      toast.success('Login successful');
      set({ authUser: res.data, isLoggedIn: true });
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    } finally {
      // set({ isAuthorized: false });
    }
  },

  getPosts: async () => {
    set({ isLoading: true });
    // set({ isAuthorized: true });
    try {
      const res = await axios.get<{ posts: Post[] }>(`${baseURL}/posts`);

      set({ posts: res.data.posts });
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error loading posts');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  getSinglePost: async (postId: string) => {
    // set({ isAuthorized: true });
    try {
      const res = await axios.get(`${baseURL}/posts/${postId}`);
      console.log(res.data);

      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error loading posts');
      return null;
    }
  },

  likePost: async (postId: string) => {
    // set({ isAuthorized: true });
    try {
      const res = await axios.post<{ liked: boolean }>(
        `${baseURL}/posts/${postId}/like`
      );
      const { liked } = res.data;

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedByUser: liked,
                _count: {
                  ...post._count,
                  likes: post._count.likes + (liked ? 1 : -1),
                },
              }
            : post
        ),
      }));
    } catch (error: any) {
      toast.error('Error liking post');
    }
  },

  repostPost: async (postId: string) => {
    // set({ isAuthorized: true });
    try {
      const res = await axios.post<{ reposted: boolean }>(
        `${baseURL}/posts/${postId}/repost`
      );
      const { reposted } = res.data;

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                ReposetedByUser: reposted,
                _count: {
                  ...post._count,
                  reposts: post._count.reposts + (reposted ? 1 : -1),
                },
              }
            : post
        ),
      }));
    } catch (error) {
      toast.error('Error Reposting');
    }
  },

  postComments: async (postId: string, content: string) => {
    // set({ isAuthorized: true });
    set({ isLoading: true });
    try {
      const res = await axios.post(`${baseURL}/posts/${postId}/comments`, {
        content,
      });
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error posting comment');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  getComments: async (postId: string) => {
    // set({ isAuthorized: true });
    set({ isLoading: true });
    try {
      const res = await axios.get(`${baseURL}/posts/${postId}/comments`);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error loading comments');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  getProfile: async () => {
    // set({ isAuthorized: true });
    set({ isLoading: true });
    try {
      const res = await axios.get(`${baseURL}/profile`);
      set({ profile: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Unable to laod profile');
    } finally {
      set({ isLoading: false });
    }
  },
}));
