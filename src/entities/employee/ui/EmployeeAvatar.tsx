import { getInitials } from '../lib/getInitials'

interface EmployeeAvatarProps {
  fullName: string
}

export function EmployeeAvatar({ fullName }: EmployeeAvatarProps) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-container font-medium text-on-primary-container">
      {getInitials(fullName)}
    </span>
  )
}
