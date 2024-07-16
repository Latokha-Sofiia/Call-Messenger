import { makeAutoObservable } from "mobx"

export enum CatType {
  happy,
  sad,
}

export interface Notification {
  id: string
  setActive: () => void
  message: string
  content: string
  type: CatType
}

export class NotificationStore {
  notifications: Notification[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification)
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id)
  }
}

export const notificationStore = new NotificationStore()
