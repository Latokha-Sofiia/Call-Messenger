import * as React from "react"
import * as styles from "./App.module.scss"
import { Outlet, Route } from "react-router-dom"
import NavigationPanel from "./components/NavigationPanel/NavigationPanel"
import { useRoutes } from "./routes"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthContext } from "@/core/context/AuthContext"
import { useEffect, useState } from "react"
import { authController } from "@/core/controllers/AuthController/AuthController"
import { UserContext } from "@/core/context/UserContext"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      const response = await authController.checkAuth()
      console.log("checkAuth", response)
      console.log("response.data.isValid", response.data.isValid)
      setIsAuthenticated(response.data.isValid)
    }

    checkAuth()
  }, [])

  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <Router>
        <UserContext.Provider
          value={{
            userName,
            setUserName,
          }}
        >
          <div className={styles.wrapper}>
            <NavigationPanel></NavigationPanel>
            <div className={styles.main_content}>
              <Outlet />
              {routes}
            </div>
          </div>
        </UserContext.Provider>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
