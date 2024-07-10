import * as styles from "./TodoModal.module.scss"
import React from "react"

export interface TodoModalProps {
  active: boolean
  setActive: (active: boolean) => void
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
      return "/cat-happy.png"
      break
    case CatType.sad:
      return "/cat-sad.png"
      break
  }
}
const TodoModal: React.FC<TodoModalProps> = ({
  active,
  setActive,
  childrenContent,
  childrenTitle,
  catType,
}) => {
  return (
    <div
      className={`${styles.modal} ${active ? styles.active : ""}`}
      onClick={() => setActive(false)}
    >
      <img className={styles.img} src={getPathFromCatType(catType)} />

      <div className={styles.rainbowBorder}>
        <div
          className={`${styles.modal_content} ${active ? styles.active : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.title}>{childrenTitle}</div>
          <div className={styles.textContent}>{childrenContent}</div>
        </div>
      </div>
    </div>
  )
}

export default TodoModal
