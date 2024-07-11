import React, { useCallback, useEffect, useState } from 'react';
import * as styles from "./ListOfConferences.module.scss"
import ConfChatsOnLeftPanel from '../../../components/shared/ChatsOnLeftPanel/ConfChatsOnLeftPanel';
import { observer } from 'mobx-react-lite';
import { conferencesController } from '@packages/controllers/Conferences/ConferencesControllerImpl';
import { conferencesStore } from '@packages/stores/src/conferencesStore/ConferencesStore';
import { todoController } from '@packages/controllers/Todo/TodoControllerImpl';

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
    const tabsItems = ["Активные", "Запланированные", "Прошедшие"]
    // const tabsItems = ["active", "planned", "past"]

    const handleRemoveConf = async (id: string) => {
        await conferencesController.removeConferences(id)
        setModalActive(true)
    }

    const handleScroll = useCallback(
        async (event: React.UIEvent<HTMLDivElement>) => {
            const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
            if (scrollHeight - scrollTop <= clientHeight + 50) {
                await conferencesController.loadMoreConferences()
            }
        },
        []
    )

    // DELETE LOG
    console.log(activeConf)

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                {tabsItems.map((tab, index) => (
                    <div key={index} className={styles.oneTab}>{tab}</div>
                ))}
            </div>



            <div className={styles.allChats}>
                {activeConf.map((conf) => (
                    <div key={conf.id}>
                        <div>
                            <ConfChatsOnLeftPanel title={conf.title} date={conf.date} photo_url={conf.photo_url}></ConfChatsOnLeftPanel>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )})

export default listOfConferences