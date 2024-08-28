import * as styles from "./NotCompletedTodo.module.scss"
import React, { useState } from "react"
import { ITodo } from "@/core/models"

interface ITodoProps {
  todo: ITodo
  onRemove: (_id: string) => void
  onComplete: (_id: string) => void
  onEdit: (_id: string, newTitle: string) => void
}

const NotCompletedTodo: React.FC<ITodoProps> = ({
  todo,
  onRemove,
  onEdit,
  onComplete,
}) => {
  const [inputValue, setInputValue] = useState("")

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const handleEditTodo = () => {
    setIsEditing(!isEditing)

    if (!isEditing) {
      setInputValue(todo.title)
    }

    if (isEditing) {
      onEdit(todo._id, inputValue)
    }
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div key={todo._id} className={styles.mainContent}>
      <button
        className={styles.buttonRemoveTodo}
        onClick={() => onRemove(todo._id)}
      >
        Delete
      </button>

      <button
        className={styles.buttonEditTodo}
        onClick={() => handleEditTodo()}
      >
        {isEditing ? "Save" : "Edit"}
      </button>

      <button
        className={styles.checkboxComplete}
        onClick={() => onComplete(todo._id)}
      />

      {isEditing ? (
        <input
          className={styles.editTodo}
          value={inputValue}
          onInput={onInput}
        ></input>
      ) : (
        <div className={styles.titleTodo}>{todo.title}</div>
      )}
    </div>
  )
}

export default NotCompletedTodo
