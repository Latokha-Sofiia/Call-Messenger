import React from "react"
import Todo from "../../components/todoPage/TodoItems/TodoItems"
import CreateTodo from "../../components/todoPage/CreateTodo/CreateTodo"
import * as styles from "./TodoPage.module.scss"
export default function TodosPage() {
  return (
    <div className={styles.wrapper}>
      <CreateTodo />
      <Todo />
    </div>
  )
}
