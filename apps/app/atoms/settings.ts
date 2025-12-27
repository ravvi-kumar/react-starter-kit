import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface AppSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  privacy: {
    shareAnalytics: boolean;
    showOnlineStatus: boolean;
  };
  locale: string;
  timezone: string;
}

// Default settings
const defaultSettings: AppSettings = {
  notifications: {
    email: true,
    push: true,
    sound: false,
  },
  privacy: {
    shareAnalytics: false,
    showOnlineStatus: true,
  },
  locale: "en-US",
  timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
};

// Primitive atom with localStorage persistence
export const settingsAtom = atomWithStorage<AppSettings>("appSettings", defaultSettings);

// Derived atoms for specific settings
export const notificationsEnabledAtom = atom((get) => {
  const settings = get(settingsAtom);
  return settings.notifications.email || settings.notifications.push;
});

export const localeAtom = atom(
  (get) => get(settingsAtom).locale,
  (get, set, locale: string) => {
    const settings = get(settingsAtom);
    set(settingsAtom, { ...settings, locale });
  },
);
