import { createContext } from "react"

export const UserContext = createContext({
  userName: "Incognito",
  setUserName: (userName: string) => {},
})
