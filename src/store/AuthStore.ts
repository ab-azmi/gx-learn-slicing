import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type Props = {
    authenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthStore = create<Props>()(
    persist(
        (set) => ({
            authenticated: false,
            login: () => set({ authenticated: true }),
            logout: () => set({ authenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default AuthStore;