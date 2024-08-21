import * as styles from "./UserLogo.module.scss"
import React from "react"
import { IUserData } from "@/core/models"

interface IUserLogoProps {
  photo_url: string
}
const UserLogo: React.FC<IUserLogoProps> = ({ photo_url }) => {
  return (
    <div className={styles.conferenceLogo}>
      <img src={photo_url} className={styles.photoConferenceGroup} />
    </div>
  )
}

export default UserLogo
