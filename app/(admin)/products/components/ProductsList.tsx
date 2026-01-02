"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { ProductRow } from "./ProductRow";

export default function ProductsList() {
  const products = useSelector(
    (state: RootState) => state.products.items
  );

  if (products.length === 0) {
    return (
      <div className="rounded-radius-sm border bg-bg-secondary p-6">
        <p className="text-sm text-text-muted">
          No products added yet
        </p>
      </div>
    );
  }

  return (
    <section className="border border-border rounded-sm overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 border-b border-border bg-bg-muted px-4 py-3 text-xs font-medium text-text-muted">
        <span>Product</span>
        <span>Category</span>
        <span>Price</span>
        <span>Stock</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      <div>
        {products.map(product => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
