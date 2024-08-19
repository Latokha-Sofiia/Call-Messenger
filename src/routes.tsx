import TodosPage from "@/pages/TodosPage/TodosPage"
import React from "react"
import { Routes, Route } from "react-router-dom"
import ConferencesPage from "./pages/ConferencesPage/ConferencesPage"
import AuthPage from "./pages/AuthPage/AuthPage"
import PersonalDataPage from "@/pages/PersonalDataPage/PersonalDataPage"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"
// import { UserProvider } from "@/core/context/UserContext"

export const useRoutes = (isAuthenticated: boolean | null) => {
  if (isAuthenticated === null) {
    return <div></div>
  }

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<PersonalDataPage />} />

        <Route path="/todos" element={<TodosPage />} />

        <Route path="/conferences" element={<ConferencesPage />} />

        <Route path="/personal_data" element={<PersonalDataPage />} />

        <Route path="*" element={<PersonalDataPage />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  )
}
