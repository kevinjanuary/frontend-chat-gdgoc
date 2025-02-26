import axios from "axios"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import "./App.css"
import { session } from "./main"
import { useNavigate } from "react-router"

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1NDU2NDBlLTZmMWUtNGY0Ny1hNGIwLWFhYzI1MjZkZTU1MSIsImVtYWlsIjoiIiwiaWF0IjoxNzQwMjk5ODQ1fQ.YINPJ5g_oU7aEPgfhnffq4SHAP0La7X2T8Ti8dFwZu0"

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()

  const sendMessages = async () => {
    const token = session.getToken()
    if (!token) {
      navigate("/login")
      return
    }

    setMessages([
      ...messages,
      {
        input,
        reply: "Loading...",
      },
    ])

    const response = await axios.post(
      "http://localhost:3000/chatbot/send-message",
      {
        userInput: input,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer ${TOKEN}`,
        },
      }
    )

    setMessages([
      ...messages.slice(0, messages.length - 1),
      {
        input: response.data.data.userInput,
        reply: response.data.data.botReply,
      },
    ])

    setInput("")
  }

  useEffect(() => {
    const token = session.getToken()
    if (!token) {
      navigate("/login")
      return
    }

    axios
      .get("http://localhost:3000/chatbot/get-chats", {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        setMessages(
          response.data.data.map((data) => ({
            input: data.userInput,
            reply: data.botReply,
          }))
        )
      })
  }, [navigate])

  return (
    <div className="flex flex-col gap-6 max-w-2xl pb-32">
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col gap-12 text-left">
          <div className="pl-10 flex justify-end">
            <p className="max-w-md bg-white/10 px-6 pt-3 pb-4 rounded-3xl rounded-tr-sm whitespace-pre-wrap">
              {message.input}
            </p>
          </div>

          <div className="pr-10 whitespace-pre-wrap">
            <Markdown>{message.reply}</Markdown>
          </div>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 right-0 bg-[#1B1C1D] py-4">
        <div className="mx-auto max-w-2xl w-full flex items-center gap-4">
          <textarea
            type="text"
            placeholder="Type something..."
            className="border border-white/25 rounded-4xl px-8 pt-3 pb-4 outline-none resize-none flex-1 field-sizing-content max-h-24"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessages}>Kirim</button>
        </div>
      </div>

      <div className="fixed top-0 right-0 bg-[#1B1C1D] py-4 flex gap-4">
        {session.getToken() ? (
          <button
            onClick={() => {
              session.clearToken()
              navigate("/login")
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
