import React, { useState } from "react"
import * as styles from "./TodosList.module.scss"
import { ITodo } from "@/core/models"
import NotCompletedTodo from "@/components/todoPage/NotCompletedTodo/NotCompletedTodo"
import { websocketController } from "@/core/controllers/WebsocketController/WebsocketController"
import any = jasmine.any

interface ITodoListProps {
  todos: ITodo[]
  onRemove: (_id: string) => void
  onComplete: (_id: string) => void
  onEdit: (_id: string, newTitle: string) => void
}

const NotCompletedTodos: React.FC<ITodoListProps> = ({
  todos,
  onRemove,
  onEdit,
  onComplete,
}) => {
  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.oneTodoList}>
        <div className={styles.listTitle}>Не завершенные задачи</div>

        {todos.map((todo) => (
          <NotCompletedTodo
            todo={todo}
            onRemove={onRemove}
            onComplete={onComplete}
            onEdit={onEdit}
          ></NotCompletedTodo>
        ))}
      </div>
    </div>
  )
}

export default NotCompletedTodos
