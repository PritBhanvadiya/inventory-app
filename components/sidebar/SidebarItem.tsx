'use client'

import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

interface SidebarItemProps {
    href: string,
    label: string,
    icon: LucideIcon,
}

export default function SidebarItem({
    href,
    label,
    icon: Icon,
}: SidebarItemProps) {
    const pathname = usePathname()
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-radius-sm text-sm transition  ${isActive ? "bg-brand-soft text-brand" : "text-text-secondary hover:bg-muted"} `}
        >
            <Icon size={18} />
            <span>{label}</span>
        </Link>
    )
}