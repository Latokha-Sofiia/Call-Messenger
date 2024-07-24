import React, { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar/Sidebar"
import ConfContentPage from "@/components/conferencePage/ConferenceInfoPanel/ConfContentPage"
import * as styles from "./ConferencesPage.module.scss"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"
import NotificationList from "@/core/constants/TodoNotification/NotificationList"

const ConferencesPage = () => {
  const tabsItems: string[] = ["Активные", "Запланированные", "Прошедшие"]
  const buttonText: string = "Создать конференцию"
  const [selectedConference, setSelectedConference] =
    useState<Conference | null>(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Sidebar
          buttonText={buttonText}
          tabsItems={tabsItems}
          onSelectConference={setSelectedConference}
        />
      </div>
      <div className={styles.content}>
        <ConfContentPage conference={selectedConference} />
      </div>
      <NotificationList />
    </div>
  )
}

export default ConferencesPage
