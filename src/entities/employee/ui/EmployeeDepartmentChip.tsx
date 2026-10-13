// Departments the palette gives their own color; every other department uses the neutral chip.
const departmentStyles: Record<string, string> = {
  Administration: 'bg-dept-admin text-on-dept-admin',
  Mathematics: 'bg-dept-math text-on-dept-math',
  Sciences: 'bg-dept-science text-on-dept-science',
  Languages: 'bg-dept-lang text-on-dept-lang',
  IT: 'bg-dept-it text-on-dept-it',
}

interface EmployeeDepartmentChipProps {
  department: string
}

export function EmployeeDepartmentChip({ department }: EmployeeDepartmentChipProps) {
  const className = departmentStyles[department] ?? 'bg-dept-other text-on-dept-other'

  return (
    <span
      className={`inline-flex h-6 max-w-full items-center rounded-full px-2.5 text-xs font-medium ${className}`}
    >
      <span className="truncate">{department}</span>
    </span>
  )
}
