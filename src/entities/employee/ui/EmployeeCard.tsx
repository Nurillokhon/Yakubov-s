import type { ReactNode } from 'react'
import { Icon } from '@/shared/ui/icon'
import { getInitials } from '../lib/getInitials'
import type { Employee } from '../model/types'
import { EmployeeDepartmentChip } from './EmployeeDepartmentChip'
import { EmployeeStatusBadge } from './EmployeeStatusBadge'

const contactLinkClassName =
  '-mx-2 flex items-center gap-3 rounded-full px-2 py-1.5 text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface focus-visible:outline-2 focus-visible:outline-primary'

interface EmployeeCardProps {
  employee: Employee
  /** Buttons shown next to the name, e.g. edit. */
  actions?: ReactNode
}

export function EmployeeCard({ employee, actions }: EmployeeCardProps) {
  return (
    <article className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-2">
      <div className="flex h-36 flex-col justify-between rounded-2xl bg-primary-container p-4 text-on-primary-container">
        <div className="flex items-center justify-between gap-3">
          <EmployeeDepartmentChip department={employee.department} />
          <span className="shrink-0">
            <EmployeeStatusBadge status={employee.status} />
          </span>
        </div>
        <span aria-hidden="true" className="text-6xl leading-none font-bold tracking-tighter">
          {getInitials(employee.fullName)}
        </span>
      </div>

      <div className="px-3 pt-4 pb-2">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold text-on-surface">{employee.fullName}</h2>
            <p className="truncate text-sm text-on-surface-variant">{employee.position}</p>
          </div>
          {actions}
        </div>

        <div className="mt-3 [--md-icon-size:1.25rem]">
          <a href={`mailto:${employee.email}`} className={contactLinkClassName}>
            <Icon name="mail" />
            <span className="truncate">{employee.email}</span>
          </a>
          <a href={`tel:${employee.phone.replaceAll(' ', '')}`} className={contactLinkClassName}>
            <Icon name="phone" />
            {employee.phone}
          </a>
        </div>
      </div>
    </article>
  )
}
