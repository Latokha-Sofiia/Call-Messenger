import React from "react"
import * as styles from "./TodosList.module.scss"
import { ITodo } from "@/core/models"

interface ITodoListProps {
  todos: ITodo[]
  onRemove: (id: string) => void
  onComplete: (id: string) => void
}

const NotCompletedTodos: React.FC<ITodoListProps> = ({
  todos,
  onRemove,
  onComplete,
}) => (
  <div className={styles.rainbowFrame}>
    <div className={styles.oneTodoList}>
      <div className={styles.listTitle}>Не завершенные задачи</div>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.mainContent}>
          <button
            className={styles.buttonRemoveTodo}
            onClick={() => onRemove(todo.id)}
          >
            Delete
          </button>

          <input
            className={styles.checkboxComplete}
            type="checkbox"
            checked={todo.completed}
            onChange={() => onComplete(todo.id)}
          />

          <div className={styles.titleTodo}>{todo.title}</div>
        </div>
      ))}
    </div>
  </div>
)

export default NotCompletedTodos
