import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type MaterialElementProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T> &
  Partial<Omit<T, keyof HTMLElement>>

// Every <md-*> element whose module is imported somewhere in the app becomes valid, typed JSX.
type MaterialElements = {
  [Tag in keyof HTMLElementTagNameMap as Tag extends `md-${string}`
    ? Tag
    : never]: MaterialElementProps<HTMLElementTagNameMap[Tag]>
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends MaterialElements {}
  }
}
