import '@material/web/button/text-button.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/select/filled-select.js'
import '@material/web/select/select-option.js'
import { employeeRoleLabels, employeeStatusLabels } from '@/entities/employee'
import { Icon } from '@/shared/ui/icon'
import { useEmployeeFiltersStore } from '../model/filtersStore'
import type { RoleFilter, StatusFilter } from '../model/filtersStore'
import './EmployeeFilters.css'

const statusOptions = [['all', 'All statuses'], ...Object.entries(employeeStatusLabels)]
const roleOptions = [['all', 'All roles'], ...Object.entries(employeeRoleLabels)]

const selectClassName =
  'employee-filter-select min-w-44 flex-1 rounded-full focus-within:outline-2 focus-within:outline-primary medium:flex-none'

export function EmployeeFilters() {
  const { search, status, role, setSearch, setStatus, setRole, resetFilters } =
    useEmployeeFiltersStore()
  const hasFilters = search !== '' || status !== 'all' || role !== 'all'

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Material 3 search bar */}
      <div className="flex h-14 min-w-60 flex-1 items-center gap-3 rounded-full medium:max-w-sm bg-surface-container-high ps-4 pe-2 text-on-surface-variant focus-within:outline-2 focus-within:outline-primary">
        <Icon name="search" />
        <input
          type="search"
          aria-label="Search employees"
          placeholder="Search by name, position or email"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-full min-w-0 flex-1 bg-transparent text-on-surface outline-none placeholder:text-on-surface-variant [&::-webkit-search-cancel-button]:appearance-none"
        />
        {search && (
          <md-icon-button aria-label="Clear search" onClick={() => setSearch('')}>
            <Icon name="close" />
          </md-icon-button>
        )}
      </div>

      <md-filled-select
        className={selectClassName}
        label="Status"
        value={status}
        onChange={(event) => setStatus(event.currentTarget.value as StatusFilter)}
      >
        {statusOptions.map(([value, label]) => (
          <md-select-option key={value} value={value}>
            <div slot="headline">{label}</div>
          </md-select-option>
        ))}
      </md-filled-select>

      <md-filled-select
        className={selectClassName}
        label="Role"
        value={role}
        onChange={(event) => setRole(event.currentTarget.value as RoleFilter)}
      >
        {roleOptions.map(([value, label]) => (
          <md-select-option key={value} value={value}>
            <div slot="headline">{label}</div>
          </md-select-option>
        ))}
      </md-filled-select>

      {hasFilters && <md-text-button onClick={resetFilters}>Clear filters</md-text-button>}
    </div>
  )
}
