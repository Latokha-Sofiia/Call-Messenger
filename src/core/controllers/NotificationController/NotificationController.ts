import { notificationStore } from "../../store/NotificationStore/NotificationStore"
import { v4 as uuidv4 } from "uuid"
import { INotificationType } from "@/core/constants/Notifications/NotificationsTypes"

export class NotificationController {
  showNotification(
    message: string,
    type: INotificationType,
    content: string,
    setActive: () => void
  ) {
    const id = uuidv4()
    notificationStore.addNotification({ id, message, setActive, content, type })
    setTimeout(() => {
      notificationStore.removeNotification(id)
    }, 2000)
  }
}

export const notificationController = new NotificationController()
