import * as styles from "./TodoNotification.module.scss"
import React from "react"

export interface TodoNotificationProps {
  id: string
  setActive: () => void
  childrenContent: React.ReactNode | undefined
  childrenTitle: React.ReactNode
  catType: CatType
}

export enum CatType {
  happy,
  sad,
}

function getPathFromCatType(catType: CatType): string {
  switch (catType) {
    case CatType.happy:
      return "/images/cat-happy.png"
      break
    case CatType.sad:
      return "/images/cat-sad.png"
      break
  }
}
const TodoNotification: React.FC<TodoNotificationProps> = ({
  childrenContent,
  childrenTitle,
  catType,
}) => {
  return (
    <div className={styles.modal}>
      <img className={styles.img} src={getPathFromCatType(catType)} />

      <div className={styles.rainbowBorder}>
        <div className={styles.modal_content}>
          <div className={styles.title}>{childrenTitle}</div>
          <div className={styles.textContent}>{childrenContent}</div>
        </div>
      </div>
    </div>
  )
}

export default TodoNotification
