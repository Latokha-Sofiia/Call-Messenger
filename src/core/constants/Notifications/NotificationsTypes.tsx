export enum INotificationType {
  Removed = "removed",
  Added = "added",
  NotCompleted = "notCompleted",
  Completed = "completed",
  Edited = "edited",
}

const iconMapping = {
  [INotificationType.Removed]: "/images/cat-sad.png",
  [INotificationType.Added]: "/images/cat-happy.png",
  [INotificationType.Completed]: "/images/cat-completed.png",
  [INotificationType.NotCompleted]: "/images/cat-not-completed.png",
  [INotificationType.Edited]: "/images/cat-happy.png",
}

export const getIconForNotificationType = (type: INotificationType): string => {
  return iconMapping[type]
}
