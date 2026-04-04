'use client'

import { AppDispatch, RootState } from "@/app/store/store";
import AnalyticsHeader from "./components/AnalyticsHeader";
import ProductInsightsSection from "./components/InsightsSection/ProductInsightsSection";
import TrendsSection from "./components/TrendsSection/TrendsSection";
import { fetchProduct } from "@/app/store/slices/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>()
    const { items: products, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProduct());
        }
    }, [dispatch, products.length]);

    if (loading) {
        return <p className="p-4 text-sm">Loading products...</p>;
    }

    if (error) {
        return <p className="p-4 text-sm text-red-500">{error}</p>;
    }

    return (
        <>
            <AnalyticsHeader />
            <TrendsSection />
            <ProductInsightsSection />
        </>
    )
}