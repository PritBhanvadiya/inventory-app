import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/types/product";

interface ProductState {
    items: Product[]
}
const now = Date.now();

const initialState: ProductState = {
    items: [
        {
            id: "p1",
            name: "Wireless Mouse",
            price: 799,
            stock: 12,
            category: "Electronics",
            lowStockThreshold: 5,
            createdAt: now,
            updatedAt: now
        },
        {
            id: "p2",
            name: "Keyboard",
            price: 1499,
            stock: 3,
            category: "Electronics",
            lowStockThreshold: 5,
            createdAt: now,
            updatedAt: now
        },
        {
            id: "p3",
            name: "Notebook",
            price: 99,
            stock: 0,
            category: "Stationery",
            lowStockThreshold: 10,
            createdAt: now,
            updatedAt: now
        },
        {
            id: "p4",
            name: "Mouse",
            price: 299,
            stock: 3,
            category: "Electronics",
            lowStockThreshold: 7,
            createdAt: now,
            updatedAt: now
        },
    ],
};


export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.items.push(action.payload)
        },
        increaseStock(
            state,
            action: PayloadAction<{ id: string; amount: number }>
        ) {
            const product = state.items.find(
                (p) => p.id === action.payload.id
            );

            if (product) {
                product.stock += action.payload.amount;
                product.updatedAt = Date.now();
            }
        },

        decreaseStock(
            state,
            action: PayloadAction<{ id: string; amount: number }>
        ) {
            const product = state.items.find(
                (p) => p.id === action.payload.id
            );

            if (product && product.stock > 0) {
                product.stock -= action.payload.amount;
                product.updatedAt = Date.now();
            }
        },
        updateStock(state, action: PayloadAction<Product>) {
            const { id, stock } = action.payload;
            const product = state.items.find(p => p.id === id);

            if (product) {
                product.stock = stock;
                product.updatedAt = Date.now();
            }
        },

        updatePrice(
            state,
            action: PayloadAction<{ id: string; price: number }>
        ) {
            const product = state.items.find(
                (p) => p.id === action.payload.id
            );

            if (product) {
                product.price = action.payload.price;
                product.updatedAt = Date.now();
            }
        },
    },
});

export const { addProduct, increaseStock, decreaseStock, updateStock, updatePrice } = productsSlice.actions;

export default productsSlice.reducer;