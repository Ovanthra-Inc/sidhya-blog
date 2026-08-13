export interface CardTheme {
  id: string;
  bg: string;
  badgeBg: string;
  accentText: string;
}

export const CARD_THEMES: CardTheme[] = [
  {
    id: "crimson",
    bg: "bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white",
    badgeBg: "bg-black/30 text-white",
    accentText: "text-white",
  },
  {
    id: "sapphire",
    bg: "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white",
    badgeBg: "bg-black/30 text-white",
    accentText: "text-white",
  },
  {
    id: "emerald",
    bg: "bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white",
    badgeBg: "bg-black/30 text-white",
    accentText: "text-white",
  },
  {
    id: "violet",
    bg: "bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 text-white",
    badgeBg: "bg-black/30 text-white",
    accentText: "text-white",
  },
  {
    id: "amber",
    bg: "bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white",
    badgeBg: "bg-black/30 text-white",
    accentText: "text-white",
  },
  {
    id: "graphite",
    bg: "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-white",
    badgeBg: "bg-white/20 text-white",
    accentText: "text-white",
  },
  {
    id: "rose",
    bg: "bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white",
    badgeBg: "bg-black/30 text-white",
    accentText: "text-white",
  },
  {
    id: "indigo",
    bg: "bg-gradient-to-br from-cyan-700 via-blue-700 to-indigo-800 text-white",
    badgeBg: "bg-black/30 text-white",
    accentText: "text-white",
  },
];

/**
 * Returns a theme deterministically based on index so that
 * no two horizontally or vertically adjacent cards in a 3-column grid share the same color.
 */
export function getCardTheme(index: number = 0): CardTheme {
  const row = Math.floor(index / 3);
  const col = index % 3;
  // Formula ensures distinct pattern across rows and columns
  const themeIndex = (row * 3 + col * 2 + (row % 2)) % CARD_THEMES.length;
  return CARD_THEMES[themeIndex];
}
