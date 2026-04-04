"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/app/store/slices/productsSlice";
import { addActivity } from "@/app/store/slices/activitySlice";

type Props = {
  onClose: () => void;
};

export default function AddProductModal({ onClose }: Props) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const errors: Record<string, string> = {};

  if (!name.trim()) {
    errors.name = "Product name is required";
  }

  if (!price || Number(price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (stock === "" || Number(stock) < 0) {
    errors.stock = "Stock cannot be negative";
  }

  if (lowStockThreshold !== "" && Number(lowStockThreshold) < 0) {
    errors.lowStockThreshold = "Threshold cannot be negative";
  }

  const isValid = Object.keys(errors).length === 0;

  async function handleSubmit() {
    setSubmitted(true);
    if (!isValid) return;

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          category,
          price: Number(price),
          stock: Number(stock),
          lowStockThreshold: Number(lowStockThreshold || 0)
        })
      })
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create product");
        return;
      }

      dispatch(addProduct(data));

      dispatch(
        addActivity({
          id: crypto.randomUUID(),
          type: "ADD_PRODUCT",
          productName: name,
          delta: Number(stock),
          timestamp: Date.now()
        })
      );

      onClose();

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-radius-md bg-bg-secondary p-6">
        <h3 className="mb-4">Add Product</h3>

        <div className="space-y-3">
          {/* Name */}
          <div>
            <input
              placeholder="Product name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input"
            />
            {submitted && errors.name && (
              <p className="mt-1 text-xs text-error">
                {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <input
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input"
          />

          {/* Price */}
          <div>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="input"
            />
            {submitted && errors.price && (
              <p className="mt-1 text-xs text-error">
                {errors.price}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <input
              type="number"
              placeholder="Initial stock"
              value={stock}
              onChange={e => setStock(e.target.value)}
              className="input"
            />
            {submitted && errors.stock && (
              <p className="mt-1 text-xs text-error">
                {errors.stock}
              </p>
            )}
          </div>

          {/* Threshold */}
          <div>
            <input
              type="number"
              placeholder="Low stock threshold"
              value={lowStockThreshold}
              onChange={e =>
                setLowStockThreshold(e.target.value)
              }
              className="input"
            />
            {submitted && errors.lowStockThreshold && (
              <p className="mt-1 text-xs text-error">
                {errors.lowStockThreshold}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="btn-primary"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
