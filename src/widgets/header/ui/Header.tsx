import '@material/web/iconbutton/icon-button.js'
import { Icon } from '@/shared/ui/icon'

interface HeaderProps {
  onMenuClick: () => void
}

// Material 3 top app bar. Only needed below the expanded breakpoint, where the sidebar is hidden.
export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-1 bg-surface px-1 expanded:hidden">
      <md-icon-button aria-label="Open navigation" onClick={onMenuClick}>
        <Icon name="menu" />
      </md-icon-button>
      <span className="text-[22px] leading-7 text-on-surface">Yakubov's School</span>
    </header>
  )
}
