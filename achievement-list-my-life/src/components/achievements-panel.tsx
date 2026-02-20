"use client"

import { useState, useMemo } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { categories, achievements } from "@/lib/achievements-data"
import { CategorySidebar } from "@/components/category-sidebar"
import { AchievementCard } from "@/components/achievement-card"
import { AchievementSummary } from "@/components/achievement-summary"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function AchievementsPanel() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filtered = useMemo(() => {
    if (activeCategory === "all") return achievements
    return achievements.filter((a) => a.category === activeCategory)
  }, [activeCategory])

  const activeCategoryData = categories.find((c) => c.id === activeCategory)

  // Sort function: by rarity (mythic > legendary > epic > rare > common), then alphabetically
  // Special case: Loremaster category - Christ is King always first
  const sortAchievements = (achievements: typeof filtered) => {
    const rarityOrder: Record<string, number> = {
      mythic: 0,
      legendary: 1,
      epic: 2,
      rare: 3,
      common: 4,
    }

    return [...achievements].sort((a, b) => {
      // Special handling for Loremaster: Christ is King always first
      if (a.category === "knowledge" && a.id === "christ-is-king") return -1
      if (b.category === "knowledge" && b.id === "christ-is-king") return 1

      // Sort by rarity first
      const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity]
      if (rarityDiff !== 0) return rarityDiff

      // Then sort alphabetically by title
      return a.title.localeCompare(b.title)
    })
  }

  // Split into unlocked and locked, then sort each
  const unlocked = sortAchievements(filtered.filter((a) => a.unlocked))
  const locked = sortAchievements(filtered.filter((a) => !a.unlocked))

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* ---- Mobile category selector ---- */}
      <div className="border-b border-border bg-card lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-2">
            {mobileMenuOpen ? (
              <X className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Menu className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="font-serif text-sm font-semibold text-[hsl(var(--gold))]">
              {activeCategoryData?.label}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              mobileMenuOpen && "rotate-180"
            )}
          />
        </button>
        {mobileMenuOpen && (
          <div className="max-h-[60vh] overflow-y-auto border-t border-border px-3 pb-3 pt-2">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(id) => {
                setActiveCategory(id)
                setMobileMenuOpen(false)
              }}
            />
          </div>
        )}
      </div>

      {/* ---- Desktop sidebar ---- */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="sticky top-0">
          {/* Sidebar header */}
          <div className="border-b border-border px-4 py-4">
            <h2 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold))]">
              Categories
            </h2>
          </div>
          <ScrollArea className="h-[calc(100vh-57px)]">
            <div className="p-3">
              <CategorySidebar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* ---- Main content ---- */}
      <main className="flex-1">
        <ScrollArea className="h-screen">
          <div className="mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
            {/* Summary */}
            <AchievementSummary />

            {/* Category description */}
            {activeCategoryData && (
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="font-serif text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {activeCategoryData.label}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            )}

            {/* Unlocked achievements */}
            <div className="mt-4 flex flex-col gap-2">
              {unlocked.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>

            {/* Locked achievements section */}
            {locked.length > 0 && (
              <>
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                    Locked
                  </span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {locked.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Bottom ornament */}
            <div className="mt-8 flex justify-center pb-8">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-[hsl(var(--gold))]/20" />
                <div className="h-1.5 w-1.5 rotate-45 border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10" />
                <div className="h-px w-8 bg-[hsl(var(--gold))]/20" />
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
