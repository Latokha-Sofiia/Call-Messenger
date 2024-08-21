import React from "react"
import * as styles from "./UserActions.module.scss"

interface UserActionsProps {
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void
  onEdit: () => void
}

const UserActions: React.FC<UserActionsProps> = ({ onLogout, onEdit }) => {
  return (
    <div className={styles.buttons}>
      <button className={styles.buttonLogout} onClick={onLogout}>
        Выйти из аккаунта
      </button>

      <button className={styles.buttonEditData} onClick={onEdit}>
        Редактировать данные
      </button>
    </div>
  )
}

export default UserActions
