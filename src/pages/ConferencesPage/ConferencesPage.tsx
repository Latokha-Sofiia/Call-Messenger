import React from "react"
import ChatSidebar from "../../components/sidebar/ChatSidebar/ChatSidebar"

const ConferencesPage = () => {
  const tabsItems: string[] = ["Активные", "Запланированные", "Прошедшие"]
  const buttonText: string = "Создать конференцию"

  return (
    <div>
      <ChatSidebar buttonText={buttonText} tabsItems={tabsItems}></ChatSidebar>
    </div>
  )
}

export default ConferencesPage
