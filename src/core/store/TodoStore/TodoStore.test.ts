import { TodosStore, TodosStoreImpl } from "./TodoStore"
import { ITodo } from "@/core/models"

function createTodos(): ITodo[] {
  return [
    { _id: "1", title: "TodoStore 1", completed: true },
    { _id: "2", title: "TodoStore 2", completed: false },
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

  it("loadMoreTodos method should add new todos to the existing list", () => {
    todosStore.loadMoreTodos(createTodos())
    expect(todosStore.todos).toEqual(createTodos())
  })

  describe("updateTodos method", () => {
    beforeEach(() => {
      todosStore.addTodos(createTodos())
    })

    it("should update the existing todo", () => {
      const updatedTodo: ITodo = {
        _id: "1",
        title: "updateTodo",
        completed: false,
      }
      todosStore.updateTodo(updatedTodo)
      expect(todosStore.todos).toEqual(
        createTodos().map((todo) => (todo._id === "1" ? updatedTodo : todo))
      )
    })

    it("should add a new todo if the given id doesn't exist", () => {
      const updatedTodo: ITodo = {
        _id: "3",
        title: "updateTodo",
        completed: false,
      }
      todosStore.updateTodo(updatedTodo)
      expect(todosStore.todos).toEqual([...createTodos(), updatedTodo])
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
        createTodos().filter((todo) => todo._id !== "1")
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
