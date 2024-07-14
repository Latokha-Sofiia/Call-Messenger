import React, { useCallback, useEffect, useState } from 'react';
import * as styles from "./ListOfConferences.module.scss"
import ConfChatsOnLeftPanel from "../../simple/ChatsOnLeftPanel/ConfChatsOnLeftPanel";
import { observer } from 'mobx-react-lite';
import { conferencesController } from "../../../core/controllers/ConferencesController/ConferencesControllerImpl";
import { conferencesStore } from "../../../core/store/ConferencesStore/ConferencesStore";
import { todoController } from "../../../core/controllers/TodoController/TodoControllerImpl";

const listOfConferences = observer(() => {
    useEffect(() => {
        conferencesController.fetchConferences()
        // DELETE LOG
        console.log(conferencesStore.conferences)

    }, [])

    const [modalActive, setModalActive] = useState(false)
    const activeConf = conferencesStore.conferences.filter((conf) => conf.status === "active")
    const plannedConf = conferencesStore.conferences.filter((conf) => conf.status === "planned")
    const pastConf = conferencesStore.conferences.filter((conf) => conf.status === "past")
    // const tabsItems = ["active", "planned", "past"]

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

    // DELETE LOG
    console.log(activeConf)

    return (
        <div className={styles.wrapper}>
            <div className={styles.scrollContainer} onScroll={handleScroll}>
              <div className={styles.allChats}>
                {activeConf.map((conf) => (
                  <div key={conf.id}>
                    <div className={styles.oneChat}>
                      <ConfChatsOnLeftPanel title={conf.title} date={conf.date} photo_url={conf.photo_url}></ConfChatsOnLeftPanel>
                    </div>
                  </div>
                ))}
              </div>
            </div>

        </div>
    )})

export default listOfConferences