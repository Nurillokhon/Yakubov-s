import { create } from 'zustand'
import type { EmployeeRole, EmployeeStatus } from '@/entities/employee'

export type StatusFilter = EmployeeStatus | 'all'
export type RoleFilter = EmployeeRole | 'all'

interface EmployeeFiltersState {
  search: string
  status: StatusFilter
  role: RoleFilter
  setSearch: (search: string) => void
  setStatus: (status: StatusFilter) => void
  setRole: (role: RoleFilter) => void
  resetFilters: () => void
}

export const useEmployeeFiltersStore = create<EmployeeFiltersState>()((set) => ({
  search: '',
  status: 'all',
  role: 'all',
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setRole: (role) => set({ role }),
  resetFilters: () => set({ search: '', status: 'all', role: 'all' }),
}))
