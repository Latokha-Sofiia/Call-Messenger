import { observer } from "mobx-react-lite"
import { todosStore } from "@packages/stores/src/todoStore/TodoStore"
import React, { useEffect, useState, useCallback } from "react"
import { todoController } from "@packages/controllers/Todo/TodoControllerImpl"
import * as styles from "./TodoItem.module.scss"
import TodoModal, { CatType } from "../../notifications/TodoModal/TodoModal"

const Todo = observer(() => {
  useEffect(() => {
    todoController.fetchTodos()
  }, [])

  const [modalActive, setModalActive] = useState(false)
  const completedTodos = todosStore.todos.filter((todo) => todo.completed)
  const notCompletedTodos = todosStore.todos.filter((todo) => !todo.completed)

  const handleRemoveTodo = async (id: string) => {
    await todoController.removeTodo(id)
    setModalActive(true)
  }

  const handleCompleteTodo = async (id: string) => {
    await todoController.completeTodo(id)
  }

  const handleScroll = useCallback(
    async (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      if (scrollHeight - scrollTop <= clientHeight + 50) {
        await todoController.loadMoreTodos()
      }
    },
    []
  )

  return (
    <div className={styles.scrollContainer} onScroll={handleScroll}>
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
          childrenTitle={"todoStore нас покинуло..."}
          catType={CatType.sad}
        />
      </div>
    </div>
  )
})

export default Todo
