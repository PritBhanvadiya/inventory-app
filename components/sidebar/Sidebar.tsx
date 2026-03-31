"use client";

import {
  LayoutGrid,
  Box,
  BarChart3,
  Settings,
  Info,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-64 h-auto min-h-screen shrink-0 bg-bg-secondary border-r border-border p-4">
      {/* Logo / App Name */}
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-semibold text-text-primary mb-0.5">
          Inventory App
        </h1>
        <p className="text-xs text-text-muted">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        <SidebarItem
          href="/dashboard"
          label="Dashboard"
          icon={LayoutGrid}
        />
        <SidebarItem
          href="/products"
          label="Products"
          icon={Box}
        />
        <SidebarItem
          href="/analytics"
          label="Analytics"
          icon={BarChart3}
        />
        {/* <SidebarItem
          href="/settings"
          label="Settings"
          icon={Settings}
        /> */}
        <SidebarItem
          href="/about"
          label="About Project"
          icon={Info}
        />
      </nav>
    </aside>
  );
}
