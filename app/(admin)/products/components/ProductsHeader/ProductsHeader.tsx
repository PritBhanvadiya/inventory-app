'use client'

import { useState } from "react";
import AddProductModal from "./AddProductModal";

export default function ProductsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <header className="mb-6 flex justify-between items-center">
      <h1 className="m-0">
        Products
      </h1>
    <button className="btn-primary" onClick={() => setOpen(true)} >Add Product</button>
    </header>
    {open && <AddProductModal onClose={() => setOpen(false)} />}
    </>
  );
}
