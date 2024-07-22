import React from "react"
import * as styles from "./ConfContentPage.module.scss"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"

interface ConfContentPageProps {
  conference: Conference | null
}

const ConfContentPage: React.FC<ConfContentPageProps> = ({ conference }) => {
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
        <div className={styles.conferenceLogo}>
          <img
            src={conference.photo_url}
            className={styles.photoConferenceGroup}
          />
        </div>
        <div className={styles.dataTextOnMainContent}>
          <div className={styles.titleOnMainContent}>{conference.title}</div>
          <div className={styles.text}>{conference.date}</div>
        </div>
      </div>

      {/*<h1>{conference.title}</h1>*/}
      {/*<p>ID: {conference.id}</p>*/}
      {/*<p>Дата: {conference.date}</p>*/}
      {/*<p>Организатор: {conference.organizer}</p>*/}
      {/*<p>Ответственный: {conference.responsible}</p>*/}
      {/*<p>Участники: {conference.participants.join(", ")}</p>*/}
      {/*<p>Место проведения: {conference.location}</p>*/}
      {/*<p>Описание: {conference.description}</p>*/}
      {/*<img src={conference.photo_url} alt={conference.title} />*/}
    </div>
  )
}

export default ConfContentPage
