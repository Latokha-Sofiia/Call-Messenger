import React from "react"
import * as styles from "./ConfContentPage.module.scss"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock"
import LogoImg from "@/components/shared/LogoImg/LogoImg"
import NotificationList from "@/core/constants/TodoNotification/NotificationList"

interface IConfContentPageProps {
  conference: Conference | null
}

const ConfContentPage: React.FC<IConfContentPageProps> = ({ conference }) => {
  if (!conference) {
    return (
      <div className={styles.wrapperForNotSelected}>
        <div className={styles.conferenceNotSelected}>Выбери конференцию</div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <LogoImg conference={conference} />
        <div className={styles.dataTextOnMainContent}>
          <div className={styles.titleOnMainContent}>{conference.title}</div>
          <div className={styles.date}>{conference.date}</div>
        </div>
        <div className={styles.buttonJoin}>Присоединиться</div>
      </div>

      <InfoBlock conference={conference}></InfoBlock>
    </div>
  )
}

export default ConfContentPage
