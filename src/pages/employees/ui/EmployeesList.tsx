import { useState } from 'react'
import { EmployeeCard } from '@/entities/employee'
import type { Employee } from '@/entities/employee'
import { EditEmployeeButton } from '@/features/employee-form'
import { Pagination } from '@/shared/ui/pagination'
import { EmployeesTable } from './EmployeesTable'

const PAGE_SIZE = 6

export type EmployeesView = 'table' | 'cards'

interface EmployeesListProps {
  employees: Employee[]
  view: EmployeesView
}

export function EmployeesList({ employees, view }: EmployeesListProps) {
  const [page, setPage] = useState(1)
  // A new employee lands at the top of the list, so go back to the first page to show it.
  const [knownCount, setKnownCount] = useState(employees.length)
  if (employees.length !== knownCount) {
    setKnownCount(employees.length)
    if (employees.length > knownCount) setPage(1)
  }
  // Stay on a valid page if the list gets shorter, e.g. after an employee is removed.
  const currentPage = Math.min(page, Math.max(1, Math.ceil(employees.length / PAGE_SIZE)))
  const pageEmployees = employees.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="space-y-4">
      {view === 'table' ? (
        <EmployeesTable employees={pageEmployees} />
      ) : (
        <div className="grid gap-4 medium:grid-cols-2 large:grid-cols-3">
          {pageEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              actions={<EditEmployeeButton employee={employee} />}
            />
          ))}
        </div>
      )}

      <Pagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={employees.length}
        onPageChange={setPage}
      />
    </div>
  )
}
