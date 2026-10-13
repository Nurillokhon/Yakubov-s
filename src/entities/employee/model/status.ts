import type { EmployeeStatus } from './types'

export const employeeStatusLabels: Record<EmployeeStatus, string> = {
  active: 'Active',
  'on-leave': 'On leave',
  inactive: 'Inactive',
}
