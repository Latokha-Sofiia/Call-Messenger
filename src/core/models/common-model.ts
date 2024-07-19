export type TodoId = string

export interface ITodo {
  id: TodoId
  title: string
  description: string
  completed: boolean
}

export interface IOneChatOnSidebar {
  title: string
  date: string
  photo_url: string
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
