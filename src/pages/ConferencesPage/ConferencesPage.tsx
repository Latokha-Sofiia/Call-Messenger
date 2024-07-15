import React from "react"
import LeftPanel from "../../components/smart/LeftPanel/LeftPanel"

const ConferencesPage = () => {
  const tabsItems: string[] = ["Активные", "Запланированные", "Прошедшие"]
  const buttonText: string = "Создать конференцию"

  return (
    <div>
      <LeftPanel
        buttonText={buttonText} tabsItems={tabsItems}
      ></LeftPanel>
    </div>
  )
}

export default ConferencesPage
