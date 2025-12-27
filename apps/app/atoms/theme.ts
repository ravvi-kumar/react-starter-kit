import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Theme = "light" | "dark" | "system";
type ColorScheme = "blue" | "green" | "purple" | "orange";

// Primitive atoms with localStorage persistence
export const themeAtom = atomWithStorage<Theme>("theme", "system");
export const colorSchemeAtom = atomWithStorage<ColorScheme>("colorScheme", "blue");
export const sidebarCollapsedAtom = atomWithStorage<boolean>("sidebarCollapsed", false);

// Derived atoms
export const resolvedThemeAtom = atom((get) => {
  const theme = get(themeAtom);
  if (theme !== "system") return theme;

  // Check system preference
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "light"; // Default fallback
});

export const themeClassAtom = atom((get) => {
  const theme = get(resolvedThemeAtom);
  const color = get(colorSchemeAtom);
  return `theme-${theme} color-${color}`;
});
