import React, { Fragment, useCallback, useEffect, useState } from "react"
import * as styles from "./ConfContainer.module.scss"
import { observer } from "mobx-react-lite"
import { conferencesController } from "@/core/controllers/ConferencesController/ConferencesControllerImpl"
import {
  Conference,
  conferencesStore,
} from "@/core/store/ConferencesStore/ConferencesStore"
import ConfChat from "@/components/confPage/ConfOnSidebar/ConfChat/ConfChat"
// import { debounce } from "lodash"

enum Tab {
  Active = 0,
  Planned = 1,
  Past = 2,
}

interface IListOfConferences {
  activeTab: number
  onSelectConference: (conference: Conference) => void
}

const confContainer: React.FC<IListOfConferences> = observer(
  ({ activeTab, onSelectConference }) => {
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
      // debounce(
      (event: React.UIEvent<HTMLDivElement>) => {
        console.log("handleScroll Conf")
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
        if (scrollHeight - scrollTop - clientHeight <= 0) {
          conferencesController.loadMoreConferences()
        }
      },
      // 300),
      []
    )

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
        <div className={styles.scrollContainer} onScroll={handleScroll}>
          <div className={styles.allChats}>
            {getConferences().map((conf) => (
              <Fragment key={conf.id}>
                <ConfChat
                  title={conf.title}
                  date={conf.date}
                  photo_url={conf.photo_url}
                  onClick={() => onSelectConference(conf)}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

export default confContainer
