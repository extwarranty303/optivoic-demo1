import { useRef, useEffect } from 'react'
import { useChat } from '../hooks/useChat'

const QUICK = [
  'I have a leaky faucet',
  'Water heater emergency — need ASAP',
  'Schedule HVAC maintenance for Tuesday',
  'How much does a repair cost?',
]

export default function AIDemo() {
  const { messages, loading, sendMessage } = useChat()
  const inputRef  = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const submit = () => {
    const val = inputRef.current?.value?.trim()
    if (val) { sendMessage(val); inputRef.current.value = '' }
  }

  return (
    <section id="demo" className="section section--alt">
      <div className="container">
        <h2 className="section__title">AI Assistant Demo</h2>
        <p className="section__sub">
          This simulates how your site handles customer enquiries 24 / 7.
          Try one of the quick messages below.
        </p>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="chat-wrap">
            <div className="chat-msgs">
              {messages.map(m => (
                <div key={m.id} className={`msg msg--${m.sender}`}>
                  <div className="msg__bubble" style={{ whiteSpace:'pre-line' }}>{m.text}</div>
                </div>
              ))}
              {loading && (
                <div className="msg msg--bot">
                  <div className="msg__bubble" style={{ opacity:.7 }}>✦ typing…</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="chat-input">
              <input ref={inputRef} placeholder="Type a message…"
                onKeyDown={e => e.key === 'Enter' && submit()} />
              <button onClick={submit} disabled={loading}>Send</button>
            </div>

            <div className="chat-quick">
              <p>💡 Try a quick message</p>
              {QUICK.map(q => (
                <button key={q} className="quick-btn"
                  onClick={() => { sendMessage(q) }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
