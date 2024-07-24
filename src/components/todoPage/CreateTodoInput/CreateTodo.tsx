import React, { useState } from "react"
import * as styles from "./CreateTodo.module.scss"
import { todoController } from "@/core/controllers/TodoController/TodoControllerImpl"
import NotificationList from "@/core/constants/TodoNotification/NotificationList"

export default function CreateTodo() {
  const [inputValue, setInputValue] = useState("")

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onClickAddTodo = async () => {
    await todoController.addTodo(inputValue)
    setInputValue("")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          value={inputValue}
          onInput={onInput}
          className={styles.todoInput}
          placeholder="Введите ToDo"
        />
      </div>
      <div onClick={onClickAddTodo} className={styles.addTodo}>
        +
      </div>
      <NotificationList />
    </div>
  )
}
