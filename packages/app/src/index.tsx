import { createRoot } from "react-dom/client"
import React from "react"
import { App } from "./components/App/App"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import ConferencesPage from "./pages/conferences/ConferencesPage"
import CallsPage from "./pages/calls/CallsPage"
import TodosPage from "../src/pages/TodosPage/TodosPage"
import "./index.module.scss"

const root = document.getElementById("root")

if (!root) {
  throw new Error("root not found")
}

const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/todos" replace={true} />,
      },
      {
        path: "conferences",
        element: <ConferencesPage />,
      },
      {
        path: "calls",
        element: <CallsPage />,
      },
      {
        path: "todos",
        element: <TodosPage />,
      },
    ],
  },
])

container.render(<RouterProvider router={router} />)
