import * as styles from "./LogoImg.module.scss"
import React from "react"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"
import { IConference } from "@/core/models"
interface IConferenceProps {
  conference: Conference | null
}

// Поправить значек: выскакивает через Sidebar

const LogoImg: React.FC<IConferenceProps> = ({ conference }) => {
  return (
    <div className={styles.conferenceLogo}>
      <img src={conference.photo_url} className={styles.photoConferenceGroup} />
      {/*<img src={"/icons/active-call.svg"} className={styles.icon} />*/}
      {/*<div className={styles.icon}>*/}
    </div>
  )
}

export default LogoImg
