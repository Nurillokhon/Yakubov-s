import '@material/web/button/filled-button.js'
import '@material/web/button/text-button.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import '@material/web/textfield/outlined-text-field.js'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  employeeDepartments,
  employeeRoleLabels,
  employeeStatusLabels,
  useEmployeeStore,
} from '@/entities/employee'
import type { Employee, EmployeeDraft, EmployeeRole, EmployeeStatus } from '@/entities/employee'
import { normalizeEmployeeDraft, validateEmployee } from '../model/validateEmployee'

const textFields = {
  fullName: { label: 'Full name', type: 'text', placeholder: '' },
  position: { label: 'Position', type: 'text', placeholder: '' },
  email: { label: 'Email', type: 'email', placeholder: 'name@example.com' },
  phone: { label: 'Phone', type: 'tel', placeholder: '+998 90 123 45 67' },
} as const

type TextFieldName = keyof typeof textFields

// Fields that can be invalid, in the order they appear in the form.
const validatedFields = ['fullName', 'position', 'department', 'email', 'phone'] as const

type ValidatedFieldName = (typeof validatedFields)[number]

const emptyDraft: EmployeeDraft = {
  fullName: '',
  position: '',
  department: '',
  email: '',
  phone: '',
  role: 'teacher',
  status: 'active',
}

interface EmployeeFormProps {
  /** The employee being edited; leave out to add a new one. */
  employee?: Employee
  onDone: () => void
}

export function EmployeeForm({ employee, onDone }: EmployeeFormProps) {
  const employees = useEmployeeStore((state) => state.employees)
  const addEmployee = useEmployeeStore((state) => state.addEmployee)
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee)

  const [values, setValues] = useState<EmployeeDraft>(() =>
    employee
      ? {
          fullName: employee.fullName,
          position: employee.position,
          department: employee.department,
          email: employee.email,
          phone: employee.phone,
          role: employee.role,
          status: employee.status,
        }
      : emptyDraft,
  )
  // A field shows its error once it has been left, or after the first attempt to save.
  const [touched, setTouched] = useState<Partial<Record<ValidatedFieldName, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const takenEmails = employees.filter((other) => other.id !== employee?.id).map((other) => other.email)
  const errors = validateEmployee(values, takenEmails)

  const setValue = <Name extends keyof EmployeeDraft>(name: Name, value: EmployeeDraft[Name]) =>
    setValues((current) => ({ ...current, [name]: value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)

    const firstInvalid = validatedFields.find((name) => errors[name])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus()
      return
    }

    const draft = normalizeEmployeeDraft(values)
    if (employee) updateEmployee(employee.id, draft)
    else addEmployee(draft)
    onDone()
  }

  const visibleError = (name: ValidatedFieldName) =>
    submitted || touched[name] ? errors[name] : undefined
  const markTouched = (name: ValidatedFieldName) =>
    setTouched((current) => ({ ...current, [name]: true }))

  const renderTextField = (name: TextFieldName) => {
    const field = textFields[name]
    const error = visibleError(name)

    return (
      <md-outlined-text-field
        data-field={name}
        label={field.label}
        type={field.type}
        placeholder={field.placeholder}
        value={values[name]}
        error={Boolean(error)}
        errorText={error ?? ''}
        onInput={(event) => setValue(name, event.currentTarget.value)}
        onBlur={() => markTouched(name)}
        // Material's text field does not submit its form on Enter by itself.
        onKeyDown={(event) => {
          if (event.key === 'Enter') formRef.current?.requestSubmit()
        }}
      />
    )
  }

  const departmentError = visibleError('department')

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-6 py-2">
        {renderTextField('fullName')}
        {renderTextField('position')}

        <md-outlined-select
          data-field="department"
          label="Department"
          value={values.department}
          error={Boolean(departmentError)}
          errorText={departmentError ?? ''}
          onChange={(event) => setValue('department', event.currentTarget.value)}
          onBlur={() => markTouched('department')}
        >
          {employeeDepartments.map((department) => (
            <md-select-option key={department} value={department}>
              <div slot="headline">{department}</div>
            </md-select-option>
          ))}
        </md-outlined-select>

        {renderTextField('email')}
        {renderTextField('phone')}

        <div className="grid grid-cols-2 gap-3">
          <md-outlined-select
            className="min-w-0"
            label="Role"
            value={values.role}
            onChange={(event) => setValue('role', event.currentTarget.value as EmployeeRole)}
          >
            {Object.entries(employeeRoleLabels).map(([value, label]) => (
              <md-select-option key={value} value={value}>
                <div slot="headline">{label}</div>
              </md-select-option>
            ))}
          </md-outlined-select>

          <md-outlined-select
            className="min-w-0"
            label="Status"
            value={values.status}
            onChange={(event) => setValue('status', event.currentTarget.value as EmployeeStatus)}
          >
            {Object.entries(employeeStatusLabels).map(([value, label]) => (
              <md-select-option key={value} value={value}>
                <div slot="headline">{label}</div>
              </md-select-option>
            ))}
          </md-outlined-select>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-outline-variant px-6 py-4">
        <md-text-button type="button" onClick={onDone}>
          Cancel
        </md-text-button>
        <md-filled-button type="submit">{employee ? 'Save changes' : 'Add employee'}</md-filled-button>
      </div>
    </form>
  )
}
