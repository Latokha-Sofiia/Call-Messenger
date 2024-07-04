import React from "react"
import Todo from "../../components/TodoItems/TodoItems"
import CreateTodo from "@/components/CreateTodo/CreateTodo"
import * as styles from "./TodoPage.module.scss"
export default function TodosPage() {
  return (
    <div className={styles.wrapper}>
      <CreateTodo />
      <Todo />
    </div>
  )
}
