import React, { useState, useEffect } from "react"
import * as styles from "./Sidebar.module.scss"
import SearchBar from "../../sidebar/SearchBar/SearchBar"
import ListOfConferences from "../../conferencePage/ConferencesContainer/ConferencesContainer"
import TabsContainer from "@/components/shared/TabsContainer/TabsContainer"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"
import ConferenceForm from "@/core/constants/ConferenceForm/ConferenceForm"
import { conferencesController } from "@/core/controllers/ConferencesController/ConferencesControllerImpl"
import { notificationController } from "@/core/controllers/NotificationController/NotificationController"
import { INotificationType } from "@/core/constants/Notifications/NotificationsTypes"

interface ISidebarProps {
  buttonText: string
  tabsItems: string[]
  onSelectConference: (conference: Conference) => void
}

export const Sidebar: React.FC<ISidebarProps> = ({
  buttonText,
  tabsItems,
  onSelectConference,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [conferences, setConferences] = useState<Conference[]>([])

  useEffect(() => {
    const fetchConferences = async () => {
      await conferencesController.fetchConferences()
      setConferences(conferencesController.getConferences())
    }
    fetchConferences()
  }, [])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const handleAddConferenceClick = () => {
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    notificationController.showNotification(
      "Ну ты и нерешительный...",
      INotificationType.NotCompleted,
      "",
      () => {}
    )
  }

  const handleFormSubmit = async (data: {
    title: string
    date: string
    organizer: string
    responsible: string
    participants: string[]
    location: string
    description: string
    photo_url: string
  }) => {
    await conferencesController.addConferences(
      data.title,
      data.date,
      data.organizer,
      data.responsible,
      data.participants,
      data.location,
      data.description,
      data.photo_url
    )
    setConferences(conferencesController.getConferences())
    setIsFormOpen(false)
  }

  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.wrapper}>
        <div className={styles.fixedPosition}>
          <SearchBar />
          <button
            className={styles.CreateConferenceButton}
            onClick={handleAddConferenceClick}
          >
            <img
              className={styles.imgOnButton}
              src="/icons/phone-for-button-call.svg"
            />
            {buttonText}
          </button>
          <TabsContainer tabsItems={tabsItems} onTabClick={handleTabClick} />
        </div>
        <div className={styles.listOfConferences}>
          <ListOfConferences
            activeTab={activeTab}
            onSelectConference={onSelectConference}
            conferences={conferences}
          />
        </div>
      </div>
      {isFormOpen && (
        <ConferenceForm onClose={handleFormClose} onSubmit={handleFormSubmit} />
      )}
    </div>
  )
}

export default Sidebar
