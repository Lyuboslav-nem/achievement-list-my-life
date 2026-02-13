"use client"

import { useState } from "react"
import { Lock, Star, Loader } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Achievement } from "@/lib/achievements-data"
import { RarityBadge, getRarityConfig } from "@/components/achievement-badge"

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = achievement.icon
  const rarity = getRarityConfig(achievement.rarity)

  if (!achievement.unlocked) {
    return (
      <div className="group relative flex items-center gap-4 rounded-sm border border-border/50 bg-muted/30 px-4 py-4 opacity-50">
        {/* Locked icon container */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-border bg-muted">
          <Lock className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {achievement.title}
            </span>
            <RarityBadge rarity={achievement.rarity} />
          </div>
          <p className="text-xs text-muted-foreground/70">
            {achievement.description}
          </p>
        </div>

        {/* Points */}
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground/50">
          <Star className="h-3.5 w-3.5" />
          <span className="text-xs font-bold">{achievement.points}</span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group relative w-full text-left rounded-sm border px-4 py-4 transition-all",
        "border-border/60 bg-card hover:border-[hsl(var(--gold))]/30",
        isExpanded && "border-[hsl(var(--gold))]/40",
        rarity.glow && isExpanded ? rarity.glow : ""
      )}
    >
      <div className="flex items-center gap-4">
        {/* Achievement icon */}
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border-2 transition-colors",
            `border-[${rarity.border.replace("border-", "")}]`,
            achievement.rarity === "legendary"
              ? "border-[hsl(var(--legendary))] bg-[hsl(var(--legendary))]/10 text-[hsl(var(--legendary))]"
              : achievement.rarity === "epic"
              ? "border-[hsl(var(--epic))] bg-[hsl(var(--epic))]/10 text-[hsl(var(--epic))]"
              : achievement.rarity === "rare"
              ? "border-[hsl(var(--rare))] bg-[hsl(var(--rare))]/10 text-[hsl(var(--rare))]"
              : "border-border bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-serif text-sm font-semibold text-foreground">
              {achievement.title}
            </span>
            <RarityBadge rarity={achievement.rarity} />
          </div>
          <p className="truncate text-xs text-secondary-foreground">
            {achievement.description}
          </p>
        </div>

        {/* Date + Points */}
        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-[hsl(var(--gold))]">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-bold">{achievement.points}</span>
          </div>
          <div className="flex items-center gap-1">
            {achievement.inProgress && (
              <Loader className="h-3 w-3 animate-spin text-[hsl(var(--gold))]/70" />
            )}
            <span className={cn(
              "text-[11px]",
              achievement.inProgress ? "text-[hsl(var(--gold))]/70 font-medium" : "text-muted-foreground"
            )}>
              {achievement.date}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded flavor text */}
      {isExpanded && (
        <div className="mt-3 border-t border-border/50 pt-3">
          <p className="text-xs italic leading-relaxed text-secondary-foreground/80">
            {achievement.flavor}
          </p>
        </div>
      )}

      {/* Rarity accent line at left edge */}
      <div
        className={cn(
          "absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-opacity",
          achievement.rarity === "legendary"
            ? "bg-[hsl(var(--legendary))]"
            : achievement.rarity === "epic"
            ? "bg-[hsl(var(--epic))]"
            : achievement.rarity === "rare"
            ? "bg-[hsl(var(--rare))]"
            : "bg-muted-foreground",
          isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        )}
      />
    </button>
  )
}
