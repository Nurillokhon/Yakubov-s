import '@material/web/button/text-button.js'
import { useThemeStore } from '../model/themeStore'

export function ThemeToggle() {
  const mode = useThemeStore((state) => state.mode)
  const toggleMode = useThemeStore((state) => state.toggleMode)

  return (
    <md-text-button onClick={toggleMode}>
      {mode === 'dark' ? 'Light mode' : 'Dark mode'}
    </md-text-button>
  )
}
