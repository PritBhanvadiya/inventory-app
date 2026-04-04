"use client";

import { useDispatch } from "react-redux";
import type { Product } from "@/app/types/product";
import { addActivity } from "@/app/store/slices/activitySlice";
import { updateStock } from "@/app/store/slices/productsSlice";
import { Trash } from "lucide-react";

type Props = {
  product: Product;
};

async function increaseStockAPI(id: number) {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ delta: 1 })
  })

  if (!res.ok) throw new Error("Failed to update");

  return res.json();
}

async function deleteProductAPI(id: number) {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

async function decreaseStockAPI(id: number) {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ delta: -1 })
  })

  if (!res.ok) throw new Error("Failed to update");

  return res.json();
}

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

  async function handleIncrease() {
    try {
      const productId = Number(product.id);
      if (isNaN(productId)) {
        console.error("Invalid product id:", product.id);
        return;
      }
      const updatedProduct = await increaseStockAPI(Number(product.id));

      dispatch(updateStock(updatedProduct));

      dispatch(
        addActivity({
          id: crypto.randomUUID(),
          type: "STOCK_INCREASE",
          productName: product.name,
          delta: 1,
          timestamp: Date.now()
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDecrease() {
    if (product.stock === 0) return;

    try {
      const productId = Number(product.id);
      if (isNaN(productId)) {
        console.error("Invalid product id:", product.id);
        return;
      }
      const updatedProduct = await decreaseStockAPI(Number(product.id));

      dispatch(updateStock(updatedProduct));

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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return;

    try {
      const productId = Number(product.id);
      if (isNaN(productId)) return;
      await deleteProductAPI(productId);

      dispatch({
        type: "products/removeProduct",
        payload: product.id
      });

      dispatch(
        addActivity({
          id: crypto.randomUUID(),
          type: "DELETE_PRODUCT",
          productName: product.name,
          delta: -product.stock,
          timestamp: Date.now()
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid grid-cols-6 gap-4 border-b border-border px-4 py-3 text-sm hover:bg-bg-muted transition-colors last:border-b-0 relative items-center group">
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

      <div className="btn-secondary w-6.5 h-6.5 p-0 text-xs absolute right-6 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={handleDelete} ><Trash size={10} color="red" /></div>

    </div>
  );
}
