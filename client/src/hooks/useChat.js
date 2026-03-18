import { useState, useCallback } from 'react'

const INITIAL = [
  {
    id: 1,
    sender: 'bot',
    text: "👋 Hi! Welcome to Thompson Plumbing & HVAC. I'm your AI assistant — I can schedule appointments, answer questions, and get you the help you need 24/7. What can I help you with today?",
  },
]

export function useChat() {
  const [messages, setMessages]   = useState(INITIAL)
  const [loading, setLoading]     = useState(false)
  const [sessionId]               = useState(() => crypto.randomUUID())

  const addMessage = (text, sender) =>
    setMessages(prev => [...prev, { id: Date.now(), sender, text }])

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return
    addMessage(text, 'user')
    setLoading(true)

    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: text, sessionId }),
      })
      const data = await res.json()
      addMessage(data.reply, 'bot')
    } catch {
      addMessage("Sorry, I'm having trouble connecting. Please call us directly at (904) 555-0100.", 'bot')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  return { messages, loading, sendMessage }
}
