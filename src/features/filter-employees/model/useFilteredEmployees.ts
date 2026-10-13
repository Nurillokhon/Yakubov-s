import { useMemo } from 'react'
import { useEmployeeStore } from '@/entities/employee'
import { useEmployeeFiltersStore } from './filtersStore'

export function useFilteredEmployees() {
  const employees = useEmployeeStore((state) => state.employees)
  const search = useEmployeeFiltersStore((state) => state.search)
  const status = useEmployeeFiltersStore((state) => state.status)
  const role = useEmployeeFiltersStore((state) => state.role)

  return useMemo(() => {
    const query = search.trim().toLowerCase()

    return employees.filter(
      (employee) =>
        (status === 'all' || employee.status === status) &&
        (role === 'all' || employee.role === role) &&
        [employee.fullName, employee.position, employee.email].some((field) =>
          field.toLowerCase().includes(query),
        ),
    )
  }, [employees, search, status, role])
}
