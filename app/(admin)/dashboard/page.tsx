"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryActivitySection from "./sections/InventoryActivitySection/InventoryActivitySection";
import StatsSection from "./sections/StatsSection/StatsSection";
import { fetchProduct, setProducts } from "@/app/store/slices/productsSlice";
import type { RootState, AppDispatch } from "@/app/store/store";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>()

    const { items: products, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        const stored = localStorage.getItem("products");

        if (stored) {
            // ✅ Use saved data
            dispatch(setProducts(JSON.parse(stored)));
        } else {
            // ✅ First time → fetch from API
            dispatch(fetchProduct());
        }
    }, [dispatch]);

    if (loading) {
        return <p className="p-4 text-sm">Loading products...</p>;
    }

    if (error) {
        return <p className="p-4 text-sm text-red-500">{error}</p>;
    }


    return (
        <>
            <StatsSection />
            <InventoryActivitySection />

            {products.length === 0 && (
                <div className="mt-6 rounded-radius-sm border bg-bg-secondary p-6">
                    <p className="text-sm text-text-muted">
                        No products added yet
                    </p>
                </div>
            )}
        </>
    )
}