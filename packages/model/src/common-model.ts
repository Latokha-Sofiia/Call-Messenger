export type TodoId = string

export interface Todo {
  id: TodoId
  title: string
  description: string
  completed: "open" | "in-progress" | "done"
}
