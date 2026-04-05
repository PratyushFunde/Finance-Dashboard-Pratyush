import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: "light",

    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";

            document.documentElement.classList.toggle("dark", newTheme === "dark");

            localStorage.setItem("theme", newTheme);

            return { theme: newTheme };
        }),


    initTheme: () => {
        const saved = localStorage.getItem("theme");

        if (saved) {
            document.documentElement.classList.toggle("dark", saved === "dark");
            set({ theme: saved as Theme });
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", prefersDark);
            set({ theme: prefersDark ? "dark" : "light" });
        }
    },
}));