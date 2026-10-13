import '@material/web/iconbutton/filled-icon-button.js'
import { Icon } from '@/shared/ui/icon'
import { useEmployeeFormStore } from '../model/formStore'

export function AddEmployeeButton() {
  const openAdd = useEmployeeFormStore((state) => state.openAdd)

  return (
    <md-filled-icon-button title="Add employee" aria-label="Add employee" onClick={openAdd}>
      <Icon name="add" />
    </md-filled-icon-button>
  )
}
