import React, { useCallback, useEffect, useState } from "react"
import * as styles from "./ListOfConferences.module.scss"
import ConfChatsOnLeftPanel from "../../simple/ChatsOnLeftPanel/ConfChatsOnLeftPanel"
import { observer } from "mobx-react-lite"
import { conferencesController } from "@/core/controllers/ConferencesController/ConferencesControllerImpl"
import { conferencesStore } from "@/core/store/ConferencesStore/ConferencesStore"

interface IListOfConferences {
  activeTab: number
}

const listOfConferences: React.FC<IListOfConferences> = observer(
  ({ activeTab }) => {
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

    const handleScroll = useCallback(
      async (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
        if (scrollHeight - scrollTop - clientHeight >= 0) {
          await conferencesController.loadMoreConferences()
        }
      },
      []
    )

    const getConferences = () => {
      if (activeTab === 0) return activeConf
      if (activeTab === 1) return plannedConf
      return pastConf
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.scrollContainer} onScroll={handleScroll}>
          <div className={styles.allChats}>
            {getConferences().map((conf) => (
              <div key={conf.id}>
                <div className={styles.oneChat}>
                  <ConfChatsOnLeftPanel
                    title={conf.title}
                    date={conf.date}
                    photo_url={conf.photo_url}
                  ></ConfChatsOnLeftPanel>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

export default listOfConferences
