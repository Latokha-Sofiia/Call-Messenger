import React from "react"
import MessageBoard from "@/components/MessageBoard/MessageBoard"

const ConferencesPage = () => {
  const tabs = ["Активные", "Запланированные", "Прошедшие"]

  return (
    <div>
      <MessageBoard
        buttonText="Создать конференцию"
        tabsItems={tabs}
      ></MessageBoard>
    </div>
  )
}

export default ConferencesPage
