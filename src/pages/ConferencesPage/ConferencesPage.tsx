import React, { useState } from "react"
import ChatSidebar from "../../components/sidebar/ChatSidebar/ChatSidebar"
import ConfContentPage from "@/components/confPage/ConfMainContent/ConfContantPage/ConfContentPage"
import * as styles from "./ConferencesPage.module.scss"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"
const ConferencesPage = () => {
  const tabsItems: string[] = ["Активные", "Запланированные", "Прошедшие"]
  const buttonText: string = "Создать конференцию"
  const [selectedConference, setSelectedConference] =
    useState<Conference | null>(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <ChatSidebar
          buttonText={buttonText}
          tabsItems={tabsItems}
          onSelectConference={setSelectedConference}
        ></ChatSidebar>
      </div>
      <div className={styles.content}>
        <ConfContentPage conference={selectedConference}></ConfContentPage>
      </div>
    </div>
  )
}

export default ConferencesPage
