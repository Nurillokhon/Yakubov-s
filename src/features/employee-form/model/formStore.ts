import { create } from 'zustand'

interface EmployeeFormState {
  isOpen: boolean
  /** null while adding a new employee. */
  employeeId: string | null
  /** Goes up on every open, so the form always starts from fresh values. */
  session: number
  openAdd: () => void
  openEdit: (employeeId: string) => void
  close: () => void
}

export const useEmployeeFormStore = create<EmployeeFormState>()((set) => ({
  isOpen: false,
  employeeId: null,
  session: 0,
  openAdd: () => set((state) => ({ isOpen: true, employeeId: null, session: state.session + 1 })),
  openEdit: (employeeId) =>
    set((state) => ({ isOpen: true, employeeId, session: state.session + 1 })),
  close: () => set({ isOpen: false }),
}))
