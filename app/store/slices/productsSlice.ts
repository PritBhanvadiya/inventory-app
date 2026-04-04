import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/app/types/product";

interface ProductState {
    items: Product[],
    loading: boolean;
    error: string | null;
}

export const fetchProduct  = createAsyncThunk<Product[]>(
    'products',
    async () => {
        const res = await fetch('/api/products');
        return res.json();
    }
)

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
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

                localStorage.setItem("products", JSON.stringify(state.items));
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

                localStorage.setItem("products", JSON.stringify(state.items));
            }
        },
        updateStock(state, action: PayloadAction<Product>) {
            const { id, stock } = action.payload;
            const product = state.items.find(p => p.id === id);

            if (product) {
                product.stock = stock;
                product.updatedAt = Date.now();

                localStorage.setItem("products", JSON.stringify(state.items));
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

                localStorage.setItem("products", JSON.stringify(state.items));
            }
        },

            setProducts(state, action: PayloadAction<Product[]>) {
                state.items = action.payload;
            }
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;

            localStorage.setItem("products", JSON.stringify(state.items));
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch";
        });
}
});

export const { addProduct, increaseStock, decreaseStock, updateStock, updatePrice, setProducts } = productsSlice.actions;

export default productsSlice.reducer;