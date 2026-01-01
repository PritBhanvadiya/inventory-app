"use client";

import { useSelector } from "react-redux";
import StatsGrid from "./StatsGrid";
import { selectInventoryValue , selectOutOfStock , selectLowStockProduct, selectTotalProducts } from "../../selectors/dashboardSelectors";
import { getCountStatus } from "../../utils/statusUtils";

export default function StatsSection() {
    const totleProducts = useSelector(selectTotalProducts)
    const lowStockProduct = useSelector(selectLowStockProduct)
    const inventoryValue = useSelector(selectInventoryValue)
    const outOfStock = useSelector(selectOutOfStock)
    
    const cards = [
        {
            label: "Total Products",
            value: totleProducts,
            status: "On Track",
        },
        {
            label: "Low Stock Products",
            value: lowStockProduct,
            status: getCountStatus(lowStockProduct, 1, 4),
        },
        {
            label: "Total Inventory Value",
            value: `₹${inventoryValue}`,
            status: "On Track",
        },
        {
            label: "Out of Stock",
            value: outOfStock,
            status: getCountStatus(outOfStock, 1, 4),
        },
    ];
    return (
        <div className="py-8">
            <StatsGrid cards={cards}  />
        </div>
    )
}