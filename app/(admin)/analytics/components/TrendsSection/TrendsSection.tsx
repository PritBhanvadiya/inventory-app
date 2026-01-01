"use client";

import { useSelector } from "react-redux";
import {
  selectInventoryValueTrend,
  selectLowStockTrend,
  selectActivityTrend
} from "@/app/(admin)/analytics/selectors/analyticsSelectors";
import { TrendCard } from "./TrendCard";

export default function TrendsSection() {
  const inventory = useSelector(selectInventoryValueTrend);
  const lowStock = useSelector(selectLowStockTrend);
  const activity = useSelector(selectActivityTrend);

  const activityLabel =
    activity.status === "inactive"
      ? "No Recent Activity"
      : activity.status === "increasing"
      ? "Activity Increasing"
      : activity.status === "decreasing"
      ? "Activity Decreasing"
      : "Activity Stable";

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {/* Inventory Value Trend */}
      <TrendCard
        title="Inventory Value"
        status={
          inventory.direction === "up"
            ? "Increased"
            : inventory.direction === "down"
            ? "Decreased"
            : "Stable"
        }
        description={
          inventory.direction === "stable"
            ? "No significant change compared to last 7 days"
            : `${Math.abs(inventory.percentage)}% ${
                inventory.direction === "up" ? "increase" : "decrease"
              } compared to last 7 days`
        }
      />

      {/* Low Stock Risk Trend */}
      <TrendCard
        title="Low Stock Risk"
        status={
          lowStock.direction === "up"
            ? "Increasing"
            : lowStock.direction === "down"
            ? "Decreasing"
            : "Stable"
        }
        description={
          lowStock.change === 0
            ? "No change compared to last period"
            : `${Math.abs(lowStock.change)} product ${
                lowStock.change > 0 ? "increase" : "decrease"
              } in risk`
        }
      />

      {/* Activity Trend */}
      <TrendCard
        title="Activity Level"
        status={activityLabel}
        description="Compared to previous 7 days"
      />
    </section>
  );
}
