import React, { useState } from "react"
import * as styles from "./LeftPanel.module.scss"
import SearchBar from "../../ui/SearchBar/SearchBar"
import ListOfConferences from "../../ordinary/ListOfConferences/ListOfConferences"
import TabsOnTheLeftPanel, { ITabsOnTheLeftPanel } from "@/components/ui/TabsOnTheLeftPanel/TabsOnTheLeftPanel"

interface IMessageBoardProps {
  buttonText: string
  tabsItems: string[]
}

export const LeftPanel: React.FC<IMessageBoardProps> = ({
  buttonText, tabsItems
}) => {

  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  }

  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.wrapper}>
        <div className={styles.fixedPosition}>
          <SearchBar />
          <button className={styles.CreateConferenceButton}>
            <img className={styles.imgOnButton} src="/icons/phone-for-button-call.svg" />
            {buttonText}
          </button>
          <TabsOnTheLeftPanel tabsItems={tabsItems} onTabClick={handleTabClick}/>
        </div>

        <div className={styles.listOfConferences}>
          <ListOfConferences activeTab={activeTab}/>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
