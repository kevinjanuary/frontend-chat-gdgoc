import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          name,
          email,
          password,
        }
      )

      setMessage(
        `User ${response.data.data.name} registered successfully, redirecting to login page...`
      )
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (e) {
      console.log("ERROR", e)
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
        type="text"
        placeholder="Name"
        className="border border-white/10 rounded p-2 bg-white/5 outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
