import * as styles from "./TodosList.module.scss"
import React from "react"
import { ITodo } from "@/core/models"

interface ITodoListProps {
  todos: ITodo[]
  onRemove: (id: string) => void
  onComplete: (id: string) => void
}

const CompletedTodos: React.FC<ITodoListProps> = ({
  todos,
  onRemove,
  onComplete,
}) => {
  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.oneTodoList}>
        <div className={styles.listTitle}>Завершенные задачи</div>

        {todos.map((todo) => (
          <div key={todo.id} className={styles.mainContent}>
            <button
              className={styles.buttonRemoveTodo}
              onClick={() => onRemove(todo.id)}
            >
              Delete
            </button>

            <button
              className={styles.checkboxComplete}
              onClick={() => onComplete(todo.id)}
            >
              ✓
            </button>
            <div className={styles.titleTodo}>{todo.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompletedTodos
