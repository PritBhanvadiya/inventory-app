"use client";

import { useSelector } from "react-redux";
import {
  selectTopValuedProducts,
  selectCriticalStockProducts,
  selectRecentlyUpdatedProducts
} from "@/app/(admin)/analytics/selectors/analyticsSelectors";
import { InsightList } from "./InsightList";

export default function ProductInsightsSection() {
  const topValue = useSelector(selectTopValuedProducts);
  const lowStock = useSelector(selectCriticalStockProducts);
  const recent = useSelector(selectRecentlyUpdatedProducts);

  return (
    <section className="grid gap-4 md:grid-cols-3 py-14">
      {/* High Value Products */}
      <InsightList
        title="High Value Products"
        items={topValue.map(p => ({
          id: p.id,
          label: p.name,
          meta: `₹${(p.price * p.stock).toLocaleString()}`
        }))}
      />

      {/* Critical Stock Products */}
      <InsightList
        title="Critical Stock"
        items={lowStock.map(p => ({
          id: p.id,
          label: p.name,
          meta: `${p.stock} left`
        }))}
      />

      {/* Recently Updated Products */}
      <InsightList
        title="Recently Updated"
        items={recent.map(p => ({
          id: p.id,
          label: p.name,
          meta: "Updated recently"
        }))}
      />
    </section>
  );
}
