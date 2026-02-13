"use client"

import { cn } from "@/lib/utils"
import type { AchievementCategory } from "@/lib/achievements-data"
import { achievements } from "@/lib/achievements-data"

interface CategorySidebarProps {
  categories: AchievementCategory[]
  activeCategory: string
  onCategoryChange: (id: string) => void
}

export function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  return (
    <nav
      className="flex flex-col gap-1"
      role="tablist"
      aria-label="Achievement categories"
    >
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = activeCategory === cat.id
        const count =
          cat.id === "all"
            ? achievements.filter((a) => a.unlocked).length
            : achievements.filter(
                (a) => a.category === cat.id && a.unlocked
              ).length
        const total =
          cat.id === "all"
            ? achievements.length
            : achievements.filter((a) => a.category === cat.id).length

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "group flex items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all",
              "border border-transparent",
              isActive
                ? "border-[hsl(var(--gold))]/40 bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border transition-colors",
                isActive
                  ? "border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
                  : "border-border bg-muted text-muted-foreground group-hover:border-[hsl(var(--gold))]/30 group-hover:text-secondary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
              <span
                className={cn(
                  "truncate text-sm font-medium leading-none",
                  isActive && "text-[hsl(var(--gold))]"
                )}
              >
                {cat.label}
              </span>
              <span className="text-[11px] leading-none text-muted-foreground">
                {count}/{total}
              </span>
            </div>
          </button>
        )
      })}
    </nav>
  )
}
