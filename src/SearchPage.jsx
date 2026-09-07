import { useEffect, useRef, useState } from 'react'
import { sendChat } from './chatApi.js'

const STORAGE_KEY = 'maveo-conversation-id'

export default function SearchPage({ sendMessage = sendChat }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const logRef = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    const hideWidget = () => {
      document
        .querySelector('maveo-assistant')
        ?.style.setProperty('display', 'none', 'important')
    }
    const widgetObserver = new MutationObserver(hideWidget)

    document.body.classList.add('search-route')
    document.title = 'AI Suche — MAVEO'
    hideWidget()
    widgetObserver.observe(document.body, { childList: true })

    return () => {
      widgetObserver.disconnect()
      document
        .querySelector('maveo-assistant')
        ?.style.removeProperty('display')
      document.body.classList.remove('search-route')
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo?.({
      top: logRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, status])

  async function handleSubmit(event) {
    event.preventDefault()
    const question = input.trim()
    if (!question || isLoading) return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: question },
    ])
    setInput('')
    setStatus('Suche in den Inhalten…')
    setIsLoading(true)

    try {
      const conversationId = sessionStorage.getItem(STORAGE_KEY) || undefined
      const result = await sendMessage(question, {
        conversationId,
        locale: 'de',
        onStatus: setStatus,
      })

      if (result.conversationId) {
        sessionStorage.setItem(STORAGE_KEY, result.conversationId)
      }
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: result.answer.replaceAll('**', ''),
        },
      ])
    } catch {
      setInput(question)
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'Die Anfrage ist fehlgeschlagen. Bitte versuche es erneut.',
          isError: true,
        },
      ])
    } finally {
      setStatus('')
      setIsLoading(false)
    }
  }

  return (
    <main className="search-page">
      <header className="search-header">
        <a className="logo" href="/" aria-label="Maveo Startseite">
          MAVEO
        </a>
        <span>AI Suche</span>
        <a className="search-back" href="/">
          Zurück <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div
        className={`chat-log ${messages.length ? 'has-messages' : ''}`}
        ref={logRef}
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="chat-welcome">
            <p className="eyebrow">MAVEO AI</p>
            <h1>
              Was möchtest du <span>wissen?</span>
            </h1>
            <p>Stelle eine Frage zu unseren Leistungen, Projekten oder Ideen.</p>
          </div>
        ) : (
          <div className="message-list">
            {messages.map((message) => (
              <div
                className={`message-row ${message.role}`}
                key={message.id}
              >
                <p
                  className={`message-bubble ${message.isError ? 'error' : ''}`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {status && <p className="chat-status">{status}</p>}
          </div>
        )}
      </div>

      <div className="composer-wrap">
        <form className="chat-composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="chat-input">
            Nachricht
          </label>
          <input
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Frage in eigenen Worten stellen…"
            autoComplete="off"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            <span>Senden</span>
            <span aria-hidden="true">↑</span>
          </button>
        </form>
        <p>Antworten kommen von einer KI und können Fehler enthalten.</p>
      </div>
    </main>
  )
}
