import { useEmployeeStore } from '@/entities/employee'
import { Drawer } from '@/shared/ui/drawer'
import { useEmployeeFormStore } from '../model/formStore'
import { EmployeeForm } from './EmployeeForm'

// Render once per page; AddEmployeeButton and EditEmployeeButton open it.
export function EmployeeFormDrawer() {
  const { isOpen, employeeId, session, close } = useEmployeeFormStore()
  const employee = useEmployeeStore((state) =>
    state.employees.find((item) => item.id === employeeId),
  )

  return (
    <Drawer open={isOpen} title={employeeId ? 'Edit employee' : 'Add employee'} onClose={close}>
      <EmployeeForm key={session} employee={employee} onDone={close} />
    </Drawer>
  )
}
