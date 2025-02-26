import axios, { AxiosError } from "axios"
import { useState } from "react"
import { session } from "../main"
import { useNavigate } from "react-router"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      })

      session.setToken(response.data.data.token)
      navigate("/")
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response.data.message)
        return
      }

      setError("Invalid email or password")
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="border border-white/10 rounded p-2 bg-white/5 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-white/10 rounded p-2 bg-white/5 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
