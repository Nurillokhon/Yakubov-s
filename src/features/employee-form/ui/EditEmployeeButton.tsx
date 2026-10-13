import '@material/web/iconbutton/icon-button.js'
import type { Employee } from '@/entities/employee'
import { Icon } from '@/shared/ui/icon'
import { useEmployeeFormStore } from '../model/formStore'

interface EditEmployeeButtonProps {
  employee: Employee
}

export function EditEmployeeButton({ employee }: EditEmployeeButtonProps) {
  const openEdit = useEmployeeFormStore((state) => state.openEdit)

  return (
    <md-icon-button aria-label={`Edit ${employee.fullName}`} onClick={() => openEdit(employee.id)}>
      <Icon name="edit" />
    </md-icon-button>
  )
}
