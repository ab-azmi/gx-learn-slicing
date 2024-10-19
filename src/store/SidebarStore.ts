import {create} from 'zustand';

type Props = {
    expand: boolean;
    setExpand: (expand: boolean) => void;
}

const sideBarStore = create<Props>((set) => ({
    expand: false,
    setExpand: (expand: boolean) => set({expand})
}));

export default sideBarStore;