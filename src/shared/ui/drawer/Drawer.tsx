import '@material/web/iconbutton/icon-button.js'
import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../icon'

interface DrawerProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

// Material 3 modal side sheet. The native <dialog> gives the focus trap and Escape-to-close.
export function Drawer({ open, title, onClose, children }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pressStartedOnBackdrop = useRef(false)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click only counts as "outside" if it both starts and ends on the backdrop,
      // so dragging a text selection out of a field does not close the drawer.
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && pressStartedOnBackdrop.current) onClose()
      }}
      className="m-0 ms-auto h-dvh max-h-none w-full max-w-md translate-x-full rounded-s-2xl bg-surface-container-lowest text-on-surface transition-[translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-scrim/0 backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete backdrop:duration-300 open:translate-x-0 open:backdrop:bg-scrim/32 motion-reduce:transition-none starting:open:translate-x-full starting:open:backdrop:bg-scrim/0"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-2 py-4 ps-6 pe-3">
          <h2 id={titleId} className="text-[22px] leading-7">
            {title}
          </h2>
          <md-icon-button aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </md-icon-button>
        </header>
        {children}
      </div>
    </dialog>
  )
}
