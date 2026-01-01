
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";
import { selectActivityLog } from "./activitySelectors";

const DAYS = 7;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

const selectProducts = (state: RootState) => state.products.items;

export const selectInventoryValueTrend = createSelector(
    [selectProducts],
    (products) => {
        const now = Date.now();
        const cutoff = now - DAYS * MS_IN_DAY;

        const currentValue = products.reduce(
            (sum, product) => sum + product.price * product.stock,
            0
        );

        const pastValue = products
            .filter(product => product.updatedAt <= cutoff)
            .reduce(
                (sum, product) => sum + product.price * product.stock,
                0
            );

        const difference = currentValue - pastValue;

        let direction: "up" | "down" | "stable" = "stable";

        if (difference > 0) direction = "up";
        if (difference < 0) direction = "down";

        const percentage =
            pastValue === 0 ? 0 : Math.round((difference / pastValue) * 100);

        return {
            currentValue,
            pastValue,
            direction,
            percentage
        };
    }
);

export const selectLowStockTrend = createSelector(
    [selectProducts],
    (products) => {
        const now = Date.now();
        const cutoff = now - 7 * 24 * 60 * 60 * 1000;

        const currentLowStock = products.filter(
            p => p.stock <= p.lowStockThreshold
        ).length;

        const pastLowStock = products.filter(
            p =>
                p.stock <= p.lowStockThreshold &&
                p.updatedAt <= cutoff
        ).length;

        let direction: "up" | "down" | "stable" = "stable";

        if (currentLowStock > pastLowStock) direction = "up";
        if (currentLowStock < pastLowStock) direction = "down";

        return {
            current: currentLowStock,
            past: pastLowStock,
            direction,
            change: currentLowStock - pastLowStock
        };
    }
);

export const selectActivityTrend = createSelector(
    [selectActivityLog],
    (activities) => {
        const now = Date.now();
        const last7 = now - 7 * 24 * 60 * 60 * 1000;
        const prev7 = now - 14 * 24 * 60 * 60 * 1000;

        const recentCount = activities.filter(
            a => a.timestamp >= last7
        ).length;

        const previousCount = activities.filter(
            a =>
                a.timestamp < last7 &&
                a.timestamp >= prev7
        ).length;

        if (recentCount === 0) {
            return { status: "inactive" };
        }

        let status: "increasing" | "decreasing" | "stable" = "stable";

        if (recentCount > previousCount) status = "increasing";
        if (recentCount < previousCount) status = "decreasing";

        return {
            status,
            recentCount,
            previousCount
        };
    }
);

export const selectTopValuedProducts = createSelector(
    [selectProducts],
    (products) =>
        [...products]
            .map(p => ({
                ...p,
                value: p.price * p.stock
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5)
);

export const selectCriticalStockProducts = createSelector(
    [selectProducts],
    (products) =>
        [...products]
            .filter(p => p.stock <= p.lowStockThreshold)
            .sort((a, b) => a.stock - b.stock)
            .slice(0, 5)
);

export const selectRecentlyUpdatedProducts = createSelector(
    [selectProducts],
    (products) =>
        [...products]
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .slice(0, 5)
);
