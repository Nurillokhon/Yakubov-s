import type { EmployeeDraft } from '@/entities/employee'

export type EmployeeFormErrors = Partial<Record<keyof EmployeeDraft, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[\d\s()-]+$/

export function normalizeEmployeeDraft(values: EmployeeDraft): EmployeeDraft {
  return {
    ...values,
    fullName: values.fullName.trim().replace(/\s+/g, ' '),
    position: values.position.trim(),
    department: values.department.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
  }
}

/** Returns one message per invalid field; an empty object means the form is valid. */
export function validateEmployee(values: EmployeeDraft, takenEmails: string[]): EmployeeFormErrors {
  const { fullName, position, department, email, phone } = normalizeEmployeeDraft(values)
  const errors: EmployeeFormErrors = {}

  if (!fullName) errors.fullName = 'Enter the full name.'
  else if (!fullName.includes(' ')) errors.fullName = 'Enter both first and last name.'

  if (!position) errors.position = 'Enter the position.'
  if (!department) errors.department = 'Choose the department.'

  if (!email) errors.email = 'Enter the email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter an email like name@example.com.'
  else if (takenEmails.some((taken) => taken.toLowerCase() === email))
    errors.email = 'Another employee already uses this email.'

  const digitCount = phone.replace(/\D/g, '').length
  if (!phone) errors.phone = 'Enter the phone number.'
  else if (!PHONE_PATTERN.test(phone) || digitCount < 9 || digitCount > 15)
    errors.phone = 'Enter a phone number like +998 90 123 45 67.'

  return errors
}
