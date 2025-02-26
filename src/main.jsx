import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import App from "./App.jsx"
import "./index.css"
import Login from "./pages/login.jsx"
import Register from "./pages/Register.jsx"

export const session = {
  getToken: () => {
    return localStorage.getItem("token")
  },
  setToken: (token) => {
    localStorage.setItem("token", token)
    session.token = token
  },
  clearToken: () => {
    localStorage.removeItem("token")
    session.token = null
  },
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
