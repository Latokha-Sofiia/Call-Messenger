import React, { useState } from "react"
import TodosPanel from "../../components/todoPage/TodosPanel/TodosPanel"
import CreateTodo from "../../components/todoPage/CreateTodoInput/CreateTodo"
import * as styles from "./TodoPage.module.scss"

export default function TodosPage() {
  return (
    <div className={styles.wrapper}>
      <CreateTodo />
      <TodosPanel />
    </div>
  )
}
