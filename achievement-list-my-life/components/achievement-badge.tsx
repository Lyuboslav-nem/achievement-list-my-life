"use client"

import type { AchievementRarity } from "@/lib/achievements-data"

const rarityConfig: Record<
  AchievementRarity,
  { bg: string; border: string; text: string; glow: string; label: string }
> = {
  legendary: {
    bg: "bg-[hsl(35,100%,55%)]",
    border: "border-[hsl(35,100%,55%)]",
    text: "text-[hsl(220,20%,8%)]",
    glow: "shadow-[0_0_15px_hsl(35,100%,55%,0.4)]",
    label: "Legendary",
  },
  epic: {
    bg: "bg-[hsl(280,60%,55%)]",
    border: "border-[hsl(280,60%,55%)]",
    text: "text-[hsl(0,0%,98%)]",
    glow: "shadow-[0_0_15px_hsl(280,60%,55%,0.4)]",
    label: "Epic",
  },
  rare: {
    bg: "bg-[hsl(210,80%,55%)]",
    border: "border-[hsl(210,80%,55%)]",
    text: "text-[hsl(0,0%,98%)]",
    glow: "shadow-[0_0_15px_hsl(210,80%,55%,0.3)]",
    label: "Rare",
  },
  common: {
    bg: "bg-muted",
    border: "border-muted-foreground",
    text: "text-foreground",
    glow: "",
    label: "Common",
  },
}

export function RarityBadge({ rarity }: { rarity: AchievementRarity }) {
  const config = rarityConfig[rarity]
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  )
}

export function getRarityConfig(rarity: AchievementRarity) {
  return rarityConfig[rarity]
}
