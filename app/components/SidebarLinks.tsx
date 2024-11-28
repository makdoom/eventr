"use client";

import { cn } from "@/lib/utils";
import {
  Calendar,
  House,
  LucideIcon,
  Presentation,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkType = {
  id: number;
  name: string;
  href: string;
  icon: LucideIcon;
};

const links: LinkType[] = [
  { id: 0, name: "Event Types", href: "/dashboard", icon: House },
  { id: 1, name: "Meetings", href: "/dashboard/meetings", icon: Presentation },
  {
    id: 2,
    name: "Availability",
    href: "/dashboard/availability",
    icon: Calendar,
  },
  { id: 3, name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            "flex items-center gap-3 rounded-md p-2 px-3 transition-all",
            link.href == pathname
              ? "text-primary bg-primary/10 font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <link.icon className="size-4" />
          <p className="text-sm">{link.name}</p>
        </Link>
      ))}
    </>
  );
};
export default SidebarLinks;
