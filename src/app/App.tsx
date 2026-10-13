import { EmployeesPage } from '@/pages/employees'
import { AppLayout } from './layouts/AppLayout'
import './styles/index.css'

export function App() {
  return (
    <AppLayout>
      <EmployeesPage />
    </AppLayout>
  )
}
