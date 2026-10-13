import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [navOpen, setNavOpen] = useState(false)
  const closeNav = useCallback(() => setNavOpen(false), [])

  return (
    <div className="flex min-h-dvh">
      <Sidebar open={navOpen} onClose={closeNav} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setNavOpen(true)} />
        <main className="flex-1 px-4 pb-6 medium:px-6 expanded:pt-6">{children}</main>
      </div>
    </div>
  )
}
