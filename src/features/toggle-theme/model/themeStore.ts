import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  toggleMode: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'theme' },
  ),
)

const applyMode = (mode: ThemeMode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark')
}

applyMode(useThemeStore.getState().mode)
useThemeStore.subscribe((state) => applyMode(state.mode))
