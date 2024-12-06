import {create } from 'zustand';
import { User } from 'firebase/auth';

interface IAuth {
  user: User | null;
  loading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void,
  setInitialized: (isInitialized: boolean) => void,
};

const useAuthStore = create<IAuth>((set) => ({
  user: null,
  loading: false,
  isInitialized: false,
  setUser: (user) => set({user}),
  setLoading: (loading) => set({loading}),
  setInitialized: (isInitialized) => set({isInitialized}),
}));

export default useAuthStore;