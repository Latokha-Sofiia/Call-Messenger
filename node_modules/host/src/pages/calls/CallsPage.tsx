import React from "react"
import MessageBoard from "@/components/MessageBoard/MessageBoard"

const CallsPage = () => {
  const tabs = ["Все звонки", "Пропущенные"]

  return (
    <div>
      <MessageBoard buttonText="Создать звонок" tabsItems={tabs}></MessageBoard>
    </div>
  )
}

export default CallsPage
