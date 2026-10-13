export type EmployeeStatus = 'active' | 'on-leave' | 'inactive'

export type EmployeeRole = 'teacher' | 'administrator' | 'staff'

export interface Employee {
  id: string
  fullName: string
  position: string
  department: string
  email: string
  phone: string
  role: EmployeeRole
  status: EmployeeStatus
}

export type EmployeeDraft = Omit<Employee, 'id'>
