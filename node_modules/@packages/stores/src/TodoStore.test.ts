import { Todo, todosStore } from "./TodoStore"

function createTodos(): Todo[] {
  return [
    { id: "1", title: "Todo 1", completed: true },
    { id: "2", title: "Todo 2", completed: false },
  ]
}
todosStore.todos = createTodos()

describe("TodoStore", () => {
  afterAll(() => {
    todosStore.todos = createTodos()
  })

  describe("setTodos method", () => {
    it("should set the todos ", () => {
      todosStore.todos = []
      const todos: Todo[] = createTodos()
      todosStore.setTodos(todos)
      expect(todosStore.todos).toEqual(todos)
    })
  })

  describe("removeTodo method", () => {
    it("should remove todo with the given id", () => {
      let expectedTodoSet: Todo[] = createTodos()
      todosStore.removeTodo("1")
      expect(todosStore.todos).toEqual(
        expectedTodoSet.filter((todo) => todo.id !== "1")
      )
    })

    it("shouldn't remove todo if the given id doesn't exist", () => {
      let expectedTodoSet: Todo[] = createTodos()
      todosStore.removeTodo("3")
      expect(todosStore.todos).toEqual(expectedTodoSet)
    })
  })

  describe("completeTodo method", () => {
    it("should toggle the completed status of the todo with the given id back to false", () => {
      let TODOS: Todo[] = createTodos()
      let tempTodosStatusFalse = TODOS.map((todo) => ({
        ...todo,
        completed: false,
      }))
      todosStore.completeTodo("1")
      expect(todosStore.todos).toEqual(tempTodosStatusFalse)
    })

    it("should toggle the completed status of the todo with the given id back to true", () => {
      let TODOS: Todo[] = createTodos()
      let tempTodosStatusTrue = TODOS.map((todo) => ({
        ...todo,
        completed: true,
      }))
      todosStore.completeTodo("2")
      expect(todosStore.todos).toEqual(tempTodosStatusTrue)
    })

    it("shouldn't toggle the completed status of the todo with not existent id", () => {
      let TODOS: Todo[] = createTodos()
      todosStore.completeTodo("3")
      expect(todosStore.todos).toEqual(TODOS)
    })
  })

})
