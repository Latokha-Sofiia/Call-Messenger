export type TodoId = string

export interface ITodo {
  _id: string
  title: string
  completed: boolean
}

export interface ITodoWithName extends ITodo {
  name: string
}

export interface IAuthResponseLogin {
  isSuccess: boolean
}

export interface IUserData {
  name: string
  surname: string
  login: string
  password: string
  photo_url: string
}

export interface IUserDataProps {
  onClose: () => void
  onSubmit: (data: {
    name: string
    surname: string
    login: string
    password: string
    photo_url: string
  }) => void
}

export interface ICheckAuthResponse {
  isValid: boolean
}

export interface IGetPersonalDataResponse {
  name: string
  login: string
  password: string
  surname: string
  photo_url: string
}

export interface IAuthResponseRegister {
  token: string
  userId: string
  name: string
}

export interface IOneChatOnSidebar {
  title: string
  date: string
  photo_url: string
}

export interface IConferenceFormProps {
  onClose: () => void
  onSubmit: (data: {
    title: string
    date: string
    organizer: string
    responsible: string
    participants: string[]
    location: string
    description: string
    photo_url: string
  }) => void
}
export interface IConference {
  id: string
  title: string
  date: string
  status: "planned" | "active" | "completed"
  organizer: string
  responsible: string
  participants: string[]
  location: string
  description: string
  photo_url: string
  icon?: string
}
