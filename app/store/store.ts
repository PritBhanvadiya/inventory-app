import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productsSlice";
import activityReducer from "./slices/activitySlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            products: productsSlice.reducer,
            activity: activityReducer,
        }
    });
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];