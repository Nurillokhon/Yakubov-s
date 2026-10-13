import { create } from 'zustand'
import { mockEmployees } from './mockEmployees'
import type { Employee, EmployeeDraft } from './types'

interface EmployeeState {
  employees: Employee[]
  addEmployee: (employee: EmployeeDraft) => void
  updateEmployee: (id: string, changes: Partial<EmployeeDraft>) => void
  removeEmployee: (id: string) => void
}

export const useEmployeeStore = create<EmployeeState>()((set) => ({
  employees: mockEmployees,
  // Newest first: a new employee goes to the top of the list.
  addEmployee: (employee) =>
    set((state) => ({
      employees: [{ ...employee, id: crypto.randomUUID() }, ...state.employees],
    })),
  updateEmployee: (id, changes) =>
    set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === id ? { ...employee, ...changes } : employee,
      ),
    })),
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    })),
}))
