import { CartItem } from "@/shared/types";
import { create } from "zustand";

type CartStore = {
    items: CartItem[];
    addItem: (item:CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
    total: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if(existingItem){
            set({
                items: get().items.map((i) =>
                    i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i
            ),
            });
        } else {
            set({items: [...get().items, item]});
        }
    },

    removeItem: (id) => {
        set({items: get().items.filter((item) => item.id !== id)});
    },
    clearCart: () => set({items: []}),

    updateQuantity: (id, quantity) => {
        set({
            items: get().items.map((item) => 
                item.id === id ? {...item, quantity} : item
            ),
        });
    },
    total: () =>
        get().items.reduce((acc, item) => {
            if (item.product === "Partition Walls") {
            return acc + item.price * item.quantity;
            } else {
            return acc + (item.costSummary?.finalTotal || 0);
            }
        }, 0),
}))