import '@material/web/button/text-button.js'
import { useState } from 'react'
import { useEmployeeStore } from '@/entities/employee'
import { AddEmployeeButton, EmployeeFormDrawer } from '@/features/employee-form'
import {
  EmployeeFilters,
  useEmployeeFiltersStore,
  useFilteredEmployees,
} from '@/features/filter-employees'
import { IconSwitch } from '@/shared/ui/icon-switch'
import type { IconSwitchOption } from '@/shared/ui/icon-switch'
import { EmployeesList } from './EmployeesList'
import type { EmployeesView } from './EmployeesList'

const viewOptions: IconSwitchOption<EmployeesView>[] = [
  { value: 'table', icon: 'table', label: 'Table view' },
  { value: 'cards', icon: 'grid', label: 'Card view' },
]

export function EmployeesPage() {
  const total = useEmployeeStore((state) => state.employees.length)
  const employees = useFilteredEmployees()
  const resetFilters = useEmployeeFiltersStore((state) => state.resetFilters)
  // Changing any filter remounts the list, which sends it back to page 1.
  const filtersKey = useEmployeeFiltersStore(
    (state) => `${state.search}|${state.status}|${state.role}`,
  )
  const [view, setView] = useState<EmployeesView>('table')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-9 text-on-surface">Employees</h1>
          <p className="text-sm text-on-surface-variant">
            {employees.length === total ? `${total} people` : `${employees.length} of ${total} people`}
          </p>
        </div>
        <IconSwitch label="View" options={viewOptions} value={view} onChange={setView} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-60 flex-1">
          <EmployeeFilters />
        </div>
        <AddEmployeeButton />
      </div>

      {employees.length === 0 ? (
        <div className="rounded-xl border border-dashed border-outline-variant px-4 py-12 text-center">
          <p className="text-on-surface">No employees match these filters.</p>
          <md-text-button onClick={resetFilters}>Clear filters</md-text-button>
        </div>
      ) : (
        <EmployeesList key={filtersKey} employees={employees} view={view} />
      )}

      <EmployeeFormDrawer />
    </div>
  )
}
