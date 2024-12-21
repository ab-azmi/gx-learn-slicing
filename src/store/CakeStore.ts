import { Cake } from "@/types/cake.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Props = {
    cakes: Cake[];
    setCakes: (cakes: Cake[]) => void;
}

const CakeStore = create<Props>()(
    persist(
        (set) => ({
            cakes: [],
            setCakes: (cakes: Cake[]) => set({ cakes })
        }),
        { name: 'cake-store' }
    )
)

export default CakeStore;