export interface TodoController {
  fetchTodos(): Promise<void>
  addTodo(title: string): Promise<void>
  removeTodo(id: string): Promise<void>
  completeTodo(id: string): Promise<void>
  updateTodo(id: string, newTitle: string, name: string): Promise<void>
}
