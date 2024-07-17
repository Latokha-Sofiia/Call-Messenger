import React, { useState } from "react"
import TodoItems from "../../components/todoPage/TodoItems/TodoItems"
import CreateTodo from "../../components/todoPage/CreateTodoInput/CreateTodo"
import * as styles from "./TodoPage.module.scss"

export default function TodosPage() {
  return (
    <div className={styles.wrapper}>
      <CreateTodo />
      <TodoItems />
    </div>
  )
}
