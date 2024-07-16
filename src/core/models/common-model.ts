export type TodoId = string

export interface Todo {
  id: TodoId
  title: string
  description: string
  completed: "open" | "in-progress" | "done"
}

export interface IConference {
  id: string
  title: string
  date: string
  status: string
  organizer: string
  responsible: string
  participants: string[]
  location: string
  description: string
  photo_url: string
}
