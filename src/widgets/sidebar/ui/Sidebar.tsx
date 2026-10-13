/** @format */

import "@material/web/focus/md-focus-ring.js";
import "@material/web/ripple/ripple.js";
import { useEffect } from "react";
import { ThemeToggle } from "@/features/toggle-theme";
import { Icon } from "@/shared/ui/icon";
import type { IconName } from "@/shared/ui/icon";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const navItems: NavItem[] = [{ label: "Employees", href: "/", icon: "group" }];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Material 3 navigation drawer: always visible from the expanded breakpoint, a modal drawer below it.
export function Sidebar({ open, onClose }: SidebarProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-20 bg-scrim/32 transition-opacity duration-200 expanded:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 inset-s-0 z-30 flex w-70 shrink-0 flex-col rounded-e-2xl border-e border-outline-variant bg-surface-container-lowest p-3 transition-[translate,visibility] duration-200 expanded:visible expanded:sticky expanded:top-0 expanded:h-dvh expanded:translate-x-0 expanded:rounded-none ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex min-h-14 items-center px-4 py-3 font-bold text-primary">
          Yakubov's International School
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={
                window.location.pathname === item.href ? "page" : undefined
              }
              className="relative flex h-14 items-center gap-3 rounded-full px-4 text-sm font-medium text-on-surface-variant outline-none [--md-focus-ring-shape:28px] aria-[current=page]:bg-secondary-container aria-[current=page]:text-on-secondary-container"
            >
              <md-ripple />
              <md-focus-ring />
              <Icon name={item.icon} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-1">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
