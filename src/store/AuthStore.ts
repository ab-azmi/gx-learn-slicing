import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type Props = {
    authenticated: boolean;
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

const AuthStore = create<Props>()(
    persist(
        (set) => ({
            authenticated: false,
            token: null,
            setToken: (token: string) => set({ token, authenticated: true }),
            clearToken: () => set({ token: null, authenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default AuthStore;