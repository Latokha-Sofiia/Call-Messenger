import React, { useState } from "react"
import TodoItems from "../../components/ordinary/TodoItems/TodoItems"
import CreateTodo from "../../components/ui/CreateTodoInput/CreateTodo"
import * as styles from "./TodoPage.module.scss"

export default function TodosPage() {
  return (
    <div className={styles.wrapper}>
      <CreateTodo />
      <TodoItems />
    </div>
  )
}
