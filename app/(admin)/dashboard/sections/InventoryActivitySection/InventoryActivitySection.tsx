'use client'

import ActivityList from "./ActivityList";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks/hooks";
import { updateStock } from "@/app/store/slices/productsSlice";
import { addActivity } from "@/app/store/slices/activitySlice";
import { useEffect } from "react";

export default function InventoryActivitySection() {
  const dispatch = useAppDispatch();

  const products = useAppSelector(state => state.products.items);
  const activities = useAppSelector(state => state.activity.list);

  // Optional: for simulating stock changes if needed
  const handleUpdateStock = (productId: string, newStock: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const delta = newStock - product.stock;

    dispatch(updateStock({ ...product, stock: newStock }));

    dispatch(
      addActivity({
        id: crypto.randomUUID(),
        type:
          newStock === 0
            ? "OUT_OF_STOCK"
            : delta > 0
              ? "STOCK_INCREASE"
              : "STOCK_DECREASE",
        productName: product.name,
        delta,
        timestamp: Date.now(),
      })
    );
  };

  // --- Simulation: automatically decrease stock of first product by 1 ---
  // useEffect(() => {
  //   if (products.length > 0) {
  //     const firstProduct = products[0];
  //     handleUpdateStock(firstProduct.id, firstProduct.stock - 1);
  //   }
  // }, []); 

  return (
    <div className="border border-border rounded-sm bg-white max-w-3/5 gap-6">
      <div className="border-b border-border px-6 py-4">
        <h2 className="mb-3">Inventory Activity</h2>
        <h6>
          <em>Recent inventory changes</em>
        </h6>
      </div>

      {/* Activity List */}
      <div>
        <ActivityList activities={activities} />
      </div>
    </div>
  );
}
