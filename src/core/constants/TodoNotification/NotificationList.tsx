import React from "react"
import { observer } from "mobx-react-lite"
import { notificationStore } from "@/core/store/NotificationStore/NotificationStore"
import TodoNotification from "@/core/constants/TodoNotification/TodoNotification"

const NotificationList = observer(() => {
  return (
    <>
      {notificationStore.notifications.map((notification) => (
        <TodoNotification
          id={notification.id}
          setActive={() =>
            notificationStore.removeNotification(notification.id)
          }
          childrenContent={notification.content}
          childrenTitle={notification.message}
          catType={notification.type}
        />
      ))}
    </>
  )
})

export default NotificationList
