import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CardSize = "large" | "small";

interface ViewSettingsStore {
  cardSize: CardSize;
  setCardSize: (cardSize: CardSize) => void;
}

export const useViewSettingsStore = create<ViewSettingsStore>()(
  persist(
    (set) => ({
      cardSize: "large",
      setCardSize: (cardSize) => set({ cardSize }),
    }),
    {
      name: "umcine-view-settings",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cardSize: state.cardSize }),
    },
  ),
);
