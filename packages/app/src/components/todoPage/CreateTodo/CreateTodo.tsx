import React, { useState } from "react"
import * as styles from "./CreateTodo.module.scss"
import { todoController } from "@packages/controllers/Todo/TodoControllerImpl"
import TodoModal, { CatType } from "../../notifications/TodoModal/TodoModal"

export default function CreateTodo() {
  const [inputValue, setInputValue] = useState("")
  const [modalActive, setModalActive] = useState(false)

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onClickAddTodo = async () => {
    await todoController.addTodo(inputValue)
    setModalActive(true)
    // TODO добавить setInputValue("")
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
      <TodoModal
        active={modalActive}
        setActive={setModalActive}
        childrenTitle={"Добавлено новое Todo:"}
        childrenContent={inputValue}
        catType={CatType.happy}
      ></TodoModal>
    </div>
  )
}
