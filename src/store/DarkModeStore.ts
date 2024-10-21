import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Props = {
    darkMode: string;
    setDarkMode: (darkMode: string) => void;
}

const darkModeStore = create<Props>()(
    persist(
        (set) => ({
            darkMode: "light",
            setDarkMode: (darkMode: string) => set({ darkMode })
        }),
        {name: 'dark-mode-store'}
    )
);

export default darkModeStore;