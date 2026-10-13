import { EmployeeAvatar, EmployeeDepartmentChip, EmployeeStatusBadge } from '@/entities/employee'
import type { Employee } from '@/entities/employee'
import { EditEmployeeButton } from '@/features/employee-form'

interface EmployeesTableProps {
  employees: Employee[]
}

export function EmployeesTable({ employees }: EmployeesTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
      <table className="w-full text-left text-sm">
        <thead className="text-on-surface-variant">
          <tr>
            <th className="px-4 py-3 font-medium">Employee</th>
            <th className="px-4 py-3 font-medium">Position</th>
            <th className="hidden px-4 py-3 font-medium large:table-cell">Department</th>
            <th className="hidden px-4 py-3 font-medium medium:table-cell">Phone</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th aria-label="Actions" className="w-0 px-2 py-3" />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-t border-outline-variant">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <EmployeeAvatar fullName={employee.fullName} />
                  <div>
                    <div className="font-medium text-on-surface">{employee.fullName}</div>
                    <div className="text-on-surface-variant">{employee.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-on-surface">{employee.position}</td>
              <td className="hidden px-4 py-3 large:table-cell">
                <EmployeeDepartmentChip department={employee.department} />
              </td>
              <td className="hidden px-4 py-3 whitespace-nowrap text-on-surface-variant medium:table-cell">
                {employee.phone}
              </td>
              <td className="px-4 py-3">
                <EmployeeStatusBadge status={employee.status} />
              </td>
              <td className="px-2 py-3">
                <EditEmployeeButton employee={employee} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
