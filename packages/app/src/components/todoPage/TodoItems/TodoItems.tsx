import { observer } from "mobx-react-lite"
import { todosStore } from "@packages/stores/src/TodoStore"
import React, { useEffect, useState } from "react"
import { todoController } from "@packages/controllers/Todo/TodoControllerImpl"
import * as styles from "./TodoItem.module.scss"
import TodoModal, { CatType } from "../../notifications/TodoModal/TodoModal"

const Todo = observer(() => {
  useEffect(() => {
    todoController.fetchTodos()
  }, [])

  const completedTodos = todosStore.todos.filter((todo) => todo.completed)
  const notCompletedTodos = todosStore.todos.filter((todo) => !todo.completed)
  const [modalActive, setModalActive] = useState(false)

  const handleRemoveTodo = async (id: string) => {
    await todoController.removeTodo(id)
    setModalActive(true)
  }

  const handleCompleteTodo = async (id: string) => {
    await todoController.completeTodo(id)
  }

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
      <TodoModal
        active={modalActive}
        setActive={setModalActive}
        childrenContent={""}
        childrenTitle={"Todo нас покинуло..."}
        catType={CatType.sad}
      />
    </div>
  )
})

export default Todo
