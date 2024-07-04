import { Todo, todosStore } from "./TodoStore"

let todosMock: Todo[] = [
  { id: "1", title: "Mock Todo 1", completed: true },
  { id: "2", title: "Mock Todo 2", completed: false },
]

describe("TodoStore", () => {
  beforeEach(() => {
    todosStore.setTodos([...todosMock])
  })

  describe("setTodos method", () => {
    it("should set the todos ", () => {
      const tempTodo: Todo = { id: "3", title: "added todo", completed: true }
      const expectedTodoSet = [...todosMock, tempTodo]
      todosStore.setTodos(expectedTodoSet)
      expect(todosStore.todos).toEqual(expectedTodoSet)
    })
  })

  describe("removeTodo method", () => {
    it("should remove todo with the given id", () => {
      let expectedTodoSet = [
        { id: "2", title: "Mock Todo 2", completed: false },
      ]
      todosStore.removeTodo("1")
      expect(todosStore.todos).toEqual(expectedTodoSet)
    })

    it("shouldn't remove todo if the given id doesn't exist", () => {
      todosStore.removeTodo("3")
      expect(todosStore.todos).toEqual([...todosMock])
    })
  })

  describe("completeTodo method", () => {
    it("should toggle the completed status of the todo with the given id back to false", () => {
      let tempTodosStatusFalse = todosMock.map((todo) => ({
        ...todo,
        completed: false,
      }))
      todosStore.completeTodo("1")
      expect(todosStore.todos).toEqual(tempTodosStatusFalse)
    })

    it("should toggle the completed status of the todo with the given id back to true", () => {
      let tempTodosStatusTrue = todosMock.map((todo) => ({
        ...todo,
        completed: true,
      }))
      todosStore.completeTodo("2")
      expect(todosStore.todos).toEqual(tempTodosStatusTrue)
    })

    it("shouldn't toggle the completed status of the todo with not existent id", () => {
      todosStore.completeTodo("3")
      expect(todosStore.todos).toEqual([...todosMock])
    })
  })
})
