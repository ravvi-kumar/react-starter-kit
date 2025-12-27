import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { User } from "better-auth/types";

// Primitive atoms (base state)
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);
export const authTokenAtom = atomWithStorage<string | null>("authToken", null);

// Derived atoms (computed values)
export const userDisplayNameAtom = atom((get) => {
  const user = get(userAtom);
  return user?.name || user?.email || "Guest";
});

export const userInitialsAtom = atom((get) => {
  const user = get(userAtom);
  if (!user) return "G";

  const name = user.name || user.email;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
