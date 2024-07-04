import { observer } from "mobx-react-lite"
import { todosStore } from "@packages/stores/src/TodoStore"
import React, { useEffect } from "react"
import { todoController } from "@packages/controllers/Todo/TodoControllerImpl"
import * as styles from "./TodoItem.module.scss"

const Todo = observer(() => {
  useEffect(() => {
    todoController.fetchTodos()
  }, [])

  const handleRemoveTodo = async (id: string) => {
    await todoController.removeTodo(id)
  }

  const handleCompleteTodo = async (id: string) => {
    await todoController.completeTodo(id)
  }

  const completedTodos = todosStore.todos.filter((todo) => todo.completed)
  const notCompletedTodos = todosStore.todos.filter((todo) => !todo.completed)

  return (
    <div className={styles.allTodos}>
      <div className={styles.rainbowFrame}>
        <div className={styles.oneTodoList}>
          <div className={styles.listTitle}>Не завершенные задачи</div>

          {notCompletedTodos.map((todo) => (
            <div key={todo.id} className={styles.mainContent}>
              <button
                className={styles.buttonRemoveTodo}
                onClick={() => handleRemoveTodo(todo.id)}
              >
                Delete
              </button>
              <input
                className={styles.checkboxComplete}
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompleteTodo(todo.id)}
              />
              <div className={styles.titleTodo}>{todo.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rainbowFrame}>
        <div className={styles.oneTodoList}>
          <div className={styles.listTitle}>Завершенные задачи</div>

          {completedTodos.map((todo) => (
            <div key={todo.id} className={styles.mainContent}>
              <button
                className={styles.buttonRemoveTodo}
                onClick={() => handleRemoveTodo(todo.id)}
              >
                Delete
              </button>
              <input
                className={styles.checkboxComplete}
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompleteTodo(todo.id)}
              />
              <div className={styles.titleTodo}>{todo.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default Todo
