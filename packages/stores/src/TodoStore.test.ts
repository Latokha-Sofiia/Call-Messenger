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

  it("addTodo method should add new todos to the existing list", () => {
    todosStore.addTodos(createTodos())
    expect(todosStore.todos).toEqual(createTodos())
  })

  describe("updateTodos method", () => {
    beforeEach(() => {
      todosStore.addTodos(createTodos())
    })

    it("should update the existing todo", () => {
      const updatedTodo: Todo = {
        id: "1",
        title: "updateTodo",
        completed: false,
      }
      todosStore.updateTodo(updatedTodo)
      expect(todosStore.todos).toEqual(
        createTodos().map((todo) => (todo.id === "1" ? updatedTodo : todo))
      )
    })

    it("shouldn't update any todo if the given id doesn't exist", () => {
      const updatedTodo: Todo = {
        id: "3",
        title: "updateTodo",
        completed: false,
      }
      todosStore.updateTodo(updatedTodo)
      expect(todosStore.todos).toEqual(createTodos())
    })
  })

  // it("setTodos method should set the todos", () => {
  //   const todos = createTodos()
  //   todosStore.setTodos(todos)
  //   expect(todosStore.todos).toEqual(createTodos())
  // })

  describe("removeTodo method", () => {
    beforeEach(() => {
      todosStore.addTodos(createTodos())
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
      todosStore.addTodos(createTodos())
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

  describe("cleanTodos method", () => {
    beforeEach(() => {
      todosStore.addTodos(createTodos())
    })

    it("should clear all todos", () => {
      todosStore.cleanTodos()
      expect(todosStore.todos).toEqual([])
    })
  })
})
