import React, { useState } from "react"
import * as styles from "./TabsOnChatSidebar.module.scss"

export interface ITabsOnTheLeftPanel {
  tabsItems: string[]
  onTabClick: (index: number) => void
}

export const TabsOnChatSidebar: React.FC<ITabsOnTheLeftPanel> = ({
  tabsItems,
  onTabClick,
}) => {
  const [indexActiveTab, setIndexActiveTab] = useState<number>(0)

  const changeActiveTab = (index: number) => {
    setIndexActiveTab(index)
    onTabClick(index)
  }

  return (
    <div className={styles.tabs}>
      {tabsItems?.map((tab, index) => (
        <div
          key={index}
          className={`${styles.oneTab} ${index === indexActiveTab ? styles.active : ""}`}
          onClick={() => changeActiveTab(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

export default TabsOnChatSidebar
