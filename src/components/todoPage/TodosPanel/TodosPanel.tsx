import React, { useEffect, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { todosStore } from "@/core/store/TodoStore/TodoStore"
import { todoController } from "@/core/controllers/TodoController/TodoControllerImpl"
import NotificationList from "@/core/constants/TodoNotification/NotificationList"
import NotCompletedTodos from "@/components/todoPage/TodosList/NotCompletedTodos"
import CompletedTodos from "@/components/todoPage/TodosList/CompletedTodos"
import useScrollBottomOffset from "@/core/hooks/useScrollBottomOffset"
import * as styles from "./TodosPanel.module.scss"

const TodosPanel = observer(() => {
  useEffect(() => {
    todoController.fetchTodos()
  }, [])

  const completedTodos = todosStore.todos.filter((todo) => todo.completed)
  const notCompletedTodos = todosStore.todos.filter((todo) => !todo.completed)

  const handleRemoveTodo = async (id: string) => {
    await todoController.removeTodo(id)
  }

  const handleCompleteTodo = async (id: string) => {
    await todoController.completeTodo(id)
  }

  const loadMoreTodos = useCallback(() => {
    todoController.loadMoreTodos()
  }, [])

  const scrollRef = useScrollBottomOffset(loadMoreTodos)

  return (
    <div className={styles.scrollContainer} ref={scrollRef}>
      <div className={styles.allTodos}>
        <NotCompletedTodos
          todos={notCompletedTodos}
          onRemove={handleRemoveTodo}
          onComplete={handleCompleteTodo}
        />

        <CompletedTodos
          todos={completedTodos}
          onRemove={handleRemoveTodo}
          onComplete={handleCompleteTodo}
        />
      </div>
      <NotificationList />
    </div>
  )
})

export default TodosPanel
