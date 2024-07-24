import React, { useCallback, useEffect, useState } from "react"
import * as styles from "./ConferencesContainer.module.scss"
import { observer } from "mobx-react-lite"
import { conferencesController } from "@/core/controllers/ConferencesController/ConferencesControllerImpl"
import {
  Conference,
  conferencesStore,
} from "@/core/store/ConferencesStore/ConferencesStore"
import Chat from "@/components/shared/Chat/Chat"
import useScrollBottomOffset from "@/core/hooks/useScrollBottomOffset"

enum Tab {
  Active = 0,
  Planned = 1,
  Past = 2,
}

interface IListOfConferences {
  activeTab: number
  onSelectConference: (conference: Conference) => void
  conferences: Conference[]
}

const ConferencesContainer: React.FC<IListOfConferences> = observer(
  ({ activeTab, onSelectConference, conferences }) => {
    useEffect(() => {
      conferencesController.fetchConferences()
    }, [])

    const [modalActive, setModalActive] = useState(false)

    const activeConf = conferencesStore.conferences.filter(
      (conf) => conf.status === "active"
    )
    const plannedConf = conferencesStore.conferences.filter(
      (conf) => conf.status === "planned"
    )
    const pastConf = conferencesStore.conferences.filter(
      (conf) => conf.status === "completed"
    )

    const handleRemoveConf = async (id: string) => {
      await conferencesController.removeConferences(id)
      setModalActive(true)
    }

    const loadMoreConferences = useCallback(() => {
      conferencesController.loadMoreConferences()
    }, [])

    const scrollRef = useScrollBottomOffset(loadMoreConferences, 300) // 300 мс debounce

    const getConferences = () => {
      switch (activeTab) {
        case Tab.Active:
          return activeConf
        case Tab.Planned:
          return plannedConf
        case Tab.Past:
          return pastConf
        default:
          return []
      }
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.allChats} ref={scrollRef}>
          {getConferences().map((conf) => (
            <Chat
              key={conf.id}
              title={conf.title}
              date={conf.date}
              photo_url={conf.photo_url}
              onClick={() => onSelectConference(conf)}
            />
          ))}
        </div>
      </div>
    )
  }
)

export default ConferencesContainer
