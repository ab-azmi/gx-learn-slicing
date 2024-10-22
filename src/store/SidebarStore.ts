import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Props = {
    expand: boolean;
    setExpand: (expand: boolean) => void;
}

const sideBarStore = create<Props>()(
    persist(
        (set) => ({
            expand: false,
            setExpand: (expand: boolean) => set({ expand })
        }),
        { name: 'sidebar-store' }
    )
);

export default sideBarStore;