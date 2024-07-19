import { observer } from "mobx-react-lite"
import { todosStore } from "@/core/store/TodoStore/TodoStore"
import React, { useEffect, useState, useCallback, useRef } from "react"
import { todoController } from "@/core/controllers/TodoController/TodoControllerImpl"
import * as styles from "./TodosPanel.module.scss"
import NotificationList from "@/core/constants/TodoNotification/NotificationList"
import NotCompletedTodos from "@/components/todoPage/TodosList/NotCompletedTodos"
import CompletedTodos from "@/components/todoPage/TodosList/CompletedTodos"
// import { debounce } from "lodash"

const TodosPanel = observer(() => {
  useEffect(() => {
    todoController.fetchTodos()
  }, [])

  // const [modalActive, setModalActive] = useState(false)
  const completedTodos = todosStore.todos.filter((todo) => todo.completed)
  const notCompletedTodos = todosStore.todos.filter((todo) => !todo.completed)
  const handleRemoveTodo = async (id: string) => {
    await todoController.removeTodo(id)
    // setModalActive(true)
  }

  const handleCompleteTodo = async (id: string) => {
    await todoController.completeTodo(id)
  }

  const handleScroll = useCallback(
    // debounce(
    (event: React.UIEvent<HTMLDivElement>) => {
      console.log(event)
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      // console.log(scrollTop)
      if (scrollHeight - scrollTop - clientHeight >= 0) {
        todoController.loadMoreTodos()
      }
    },
    // 300),
    []
  )

  // const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
  //   const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
  //   console.log(event.currentTarget)
  //   if (scrollHeight - scrollTop - clientHeight >= 0) {
  //     todoController.loadMoreTodos()
  //   }
  // }

  return (
    <div className={styles.scrollContainer} onScroll={handleScroll}>
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
