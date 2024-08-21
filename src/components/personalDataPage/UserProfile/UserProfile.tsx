import React from "react"
import * as styles from "./UserProfile.module.scss"
import UserLogo from "@/components/personalDataPage/userLogo/UserLogo"

interface UserProfileProps {
  photo_url: string
  name: string
  surname: string
  login: string
  password: string
}

const UserProfile: React.FC<UserProfileProps> = ({
  photo_url,
  name,
  surname,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.rainbowFrame}>
          <UserLogo photo_url={photo_url} />
        </div>

        <div className={styles.dataMainContent}>
          {name} {surname}
        </div>
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Имя:</div>
          <div className={styles.dataItem}>{name}</div>
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Фамилия:</div>
          <div className={styles.dataItem}>{surname}</div>
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Фото профиля:</div>
          <div className={styles.dataItem}>{photo_url}</div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
