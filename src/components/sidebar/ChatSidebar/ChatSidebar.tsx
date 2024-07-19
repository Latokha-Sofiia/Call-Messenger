import React, { useState } from "react"
import * as styles from "./ChatSidebar.module.scss"
import SearchBar from "../../sidebar/SearchBar/SearchBar"
import ListOfConferences from "../../confPage/ConfContainer/ConfContainer"
import TabsOnChatSidebar, {
  ITabsOnTheLeftPanel,
} from "@/components/confPage/TabsOnChatSidebar/TabsOnChatSidebar"

interface IMessageBoardProps {
  buttonText: string
  tabsItems: string[]
}

export const ChatSidebar: React.FC<IMessageBoardProps> = ({
  buttonText,
  tabsItems,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.wrapper}>
        <div className={styles.fixedPosition}>
          <SearchBar />
          <button className={styles.CreateConferenceButton}>
            <img
              className={styles.imgOnButton}
              src="/icons/phone-for-button-call.svg"
            />
            {buttonText}
          </button>
          <TabsOnChatSidebar
            tabsItems={tabsItems}
            onTabClick={handleTabClick}
          />
        </div>

        <div className={styles.listOfConferences}>
          <ListOfConferences activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar
