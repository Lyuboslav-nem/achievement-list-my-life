"use client"

import { Star, Trophy, Shield } from "lucide-react"
import { achievements } from "@/lib/achievements-data"
import { Progress } from "@/components/ui/progress"

export function AchievementSummary() {
  const unlocked = achievements.filter((a) => a.unlocked)
  const totalPoints = unlocked.reduce((sum, a) => sum + a.points, 0)
  const maxPoints = achievements.reduce((sum, a) => sum + a.points, 0)
  const progressPercent = Math.round((unlocked.length / achievements.length) * 100)

  const legendary = unlocked.filter((a) => a.rarity === "legendary").length
  const epic = unlocked.filter((a) => a.rarity === "epic").length
  const rare = unlocked.filter((a) => a.rarity === "rare").length
  const common = unlocked.filter((a) => a.rarity === "common").length

  return (
    <div className="rounded-sm border border-border bg-card p-5">
      {/* Title row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10">
            <Trophy className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-wide text-foreground">
              Achievement Log
            </h1>
            <p className="text-xs text-muted-foreground">
              {unlocked.length} of {achievements.length} achievements unlocked
            </p>
          </div>
        </div>

        {/* Points badge */}
        <div className="flex items-center gap-2 rounded-sm border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 px-3 py-2">
          <Star className="h-4 w-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
          <span className="font-serif text-lg font-bold text-[hsl(var(--gold))]">
            {totalPoints}
          </span>
          <span className="text-xs text-muted-foreground">/ {maxPoints} pts</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Completion
          </span>
          <span className="text-xs font-bold text-[hsl(var(--gold))]">
            {progressPercent}%
          </span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-muted" />
      </div>

      {/* Rarity breakdown */}
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-[hsl(var(--legendary))]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--legendary))]">
            {legendary} Legendary
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-[hsl(var(--epic))]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--epic))]">
            {epic} Epic
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-[hsl(var(--rare))]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--rare))]">
            {rare} Rare
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {common} Common
          </span>
        </div>
      </div>
    </div>
  )
}
