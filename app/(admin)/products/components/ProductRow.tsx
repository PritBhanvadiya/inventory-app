"use client";

import { useDispatch } from "react-redux";
import type { Product } from "@/app/types/product";
import {
  increaseStock,
  decreaseStock
} from "@/app/store/slices/productsSlice";
import { addActivity } from "@/app/store/slices/activitySlice";

type Props = {
  product: Product;
};

export function ProductRow({ product }: Props) {
  const dispatch = useDispatch();

  const isOutOfStock = product.stock === 0;
  const isLowStock =
    product.stock > 0 &&
    product.stock <= product.lowStockThreshold;

  const stockStatus = isOutOfStock
    ? "Out of Stock"
    : isLowStock
    ? "Low Stock"
    : "In Stock";

  const statusColor = isOutOfStock
    ? "text-error"
    : isLowStock
    ? "text-warning"
    : "text-success";

  function handleIncrease() {
    dispatch(increaseStock({ id: product.id, amount: 1 }));
    dispatch(
      addActivity({
        id: crypto.randomUUID(),
        type: "STOCK_INCREASE",
        productName: product.name,
        delta: 1,
        timestamp: Date.now()
      })
    );
  }

  function handleDecrease() {
    if (product.stock === 0) return;

    dispatch(decreaseStock({ id: product.id, amount: 1 }));
    dispatch(
      addActivity({
        id: crypto.randomUUID(),
        type:
          product.stock === 1
            ? "OUT_OF_STOCK"
            : "STOCK_DECREASE",
        productName: product.name,
        delta: -1,
        timestamp: Date.now()
      })
    );
  }

  return (
    <div className="grid grid-cols-6 gap-4 border-b border-border px-4 py-3 text-sm hover:bg-bg-muted transition-colors last:border-b-0">
      <span className="font-medium text-text-primary">
        {product.name}
      </span>

      <span className="text-text-secondary">
        {product.category}
      </span>

      <span>₹{product.price}</span>

      <span>{product.stock}</span>

      <span className={`font-medium ${statusColor}`}>
        {stockStatus}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          disabled={product.stock === 0}
          className="btn-secondary px-2 py-1 text-xs disabled:opacity-50"
        >
          −
        </button>

        <button
          onClick={handleIncrease}
          className="btn-secondary px-2 py-1 text-xs"
        >
          +
        </button>
      </div>
    </div>
  );
}
