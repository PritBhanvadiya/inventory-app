import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";

const selectProducts = (state: RootState) => state.products.items;

export const selectTotalProducts = createSelector(
    [selectProducts],
    (products) => products.length
);

export const selectLowStockProduct = createSelector(
    [selectProducts],
    (products) =>
        products.filter(
            (p) => p.stock > 0 && p.stock <= p.lowStockThreshold
        ).length
)

export const selectOutOfStock = createSelector(
    [selectProducts],
    (products) =>
        products.filter((p) => p.stock === 0).length
)

export const selectInventoryValue = createSelector(
    [selectProducts],
    (products) => products.reduce((sum, product) => sum + product.price * product.stock, 0)
)