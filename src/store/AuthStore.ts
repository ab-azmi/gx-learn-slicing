import { User } from '@/types/transaction.type';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type Props = {
    authenticated: boolean;
    token: string | null;
    user: User | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    clearToken: () => void;
}

const AuthStore = create<Props>()(
    persist(
        (set) => ({
            authenticated: false,
            token: null,
            user: null,
            setUser: (user: User) => set({ user }),
            setToken: (token: string) => set({ token, authenticated: true }),
            clearToken: () => set({ token: null, authenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default AuthStore;