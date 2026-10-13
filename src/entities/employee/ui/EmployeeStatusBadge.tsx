import { employeeStatusLabels } from '../model/status'
import type { EmployeeStatus } from '../model/types'

const statusStyles: Record<EmployeeStatus, string> = {
  active: 'bg-status-active text-on-status-active',
  'on-leave': 'bg-status-leave text-on-status-leave',
  inactive: 'bg-status-inactive text-on-status-inactive',
}

interface EmployeeStatusBadgeProps {
  status: EmployeeStatus
}

export function EmployeeStatusBadge({ status }: EmployeeStatusBadgeProps) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap ${statusStyles[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {employeeStatusLabels[status]}
    </span>
  )
}
