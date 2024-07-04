import React from "react"
import * as styles from "./ListOfConferences.module.scss"
import ConfChatsOnLeftPanel from '@/components/ChatsOnLeftPanel/ConfChatsOnLeftPanel';
interface listOfConferencesProps {
    tabsItems: string[];
}
export const listOfConferences: React.FC<listOfConferencesProps> = ({tabsItems}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                {tabsItems.map((tab, index) => (
                    <div key={index} className={styles.oneTab}>{tab}</div>
                ))}
            </div>
            <div className={styles.allChats}>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
                <ConfChatsOnLeftPanel></ConfChatsOnLeftPanel>
            </div>
        </div>
    )}

export default listOfConferences