import { Todo, TodosStore, TodosStoreImpl } from "./TodoStore"

function createTodos(): Todo[] {
  return [
    { id: "1", title: "Todo 1", completed: true },
    { id: "2", title: "Todo 2", completed: false },
  ]
}

describe("TodoStore", () => {
  let todosStore: TodosStore

  beforeEach(() => {
    todosStore = new TodosStoreImpl()
  })

  it("setTodos method should set the todos", () => {
    const todos = createTodos()
    todosStore.setTodos(todos)
    expect(todosStore.todos).toEqual(createTodos())
  })

  describe("removeTodo method", () => {
    beforeEach(() => {
      todosStore.setTodos(createTodos())
    })

    it("should remove todo with the given id", () => {
      todosStore.removeTodo("1")
      expect(todosStore.todos).toEqual(
        createTodos().filter((todo) => todo.id !== "1")
      )
    })

    it("shouldn't remove todo if the given id doesn't exist", () => {
      todosStore.removeTodo("3")
      expect(todosStore.todos).toEqual(createTodos())
    })
  })

  describe("completeTodo method", () => {
    beforeEach(() => {
      todosStore.setTodos(createTodos())
    })

    it("should toggle the completed status of the todo with the given id back to false", () => {
      let todos = createTodos()
      let tempTodosStatusFalse = todos.map((todo) => ({
        ...todo,
        completed: false,
      }))
      todosStore.completeTodo("1")
      expect(todosStore.todos).toEqual(tempTodosStatusFalse)
    })

    it("should toggle the completed status of the todo with the given id back to true", () => {
      let todos = createTodos()
      let tempTodosStatusTrue = todos.map((todo) => ({
        ...todo,
        completed: true,
      }))
      todosStore.completeTodo("2")
      expect(todosStore.todos).toEqual(tempTodosStatusTrue)
    })

    it("shouldn't toggle the completed status of the todo with not existent id", () => {
      let todos = createTodos()
      todosStore.completeTodo("3")
      expect(todosStore.todos).toEqual(todos)
    })
  })
})
