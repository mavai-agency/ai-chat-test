import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App.jsx'
import SearchPage from './SearchPage.jsx'

describe('AI search page', () => {
  it('is linked from the homepage navigation', () => {
    render(<App pathname="/" />)

    expect(screen.getByRole('link', { name: 'AI Suche' })).toHaveAttribute(
      'href',
      '/search',
    )
  })

  it('renders the minimal empty chat interface', () => {
    expect(SearchPage).toBeTypeOf('function')

    render(<SearchPage />)

    expect(
      screen.getByRole('heading', { name: 'Was möchtest du wissen?' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nachricht')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Senden' })).toBeInTheDocument()
  })

  it('submits a message and stores the returned conversation', async () => {
    expect(SearchPage).toBeTypeOf('function')

    const sendMessage = vi.fn().mockResolvedValue({
      answer: 'Wir machen B2B sichtbar.',
      conversationId: 'conv-2',
    })
    render(<SearchPage sendMessage={sendMessage} />)

    fireEvent.change(screen.getByLabelText('Nachricht'), {
      target: { value: 'Was macht MAVEO?' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Senden' }).form)

    expect(screen.getByText('Was macht MAVEO?')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.getByText('Wir machen B2B sichtbar.')).toBeInTheDocument(),
    )
    expect(sendMessage).toHaveBeenCalledWith(
      'Was macht MAVEO?',
      expect.objectContaining({ onStatus: expect.any(Function) }),
    )
    expect(sessionStorage.getItem('maveo-conversation-id')).toBe('conv-2')
  })

  it('shows a retryable error when the request fails', async () => {
    expect(SearchPage).toBeTypeOf('function')

    const sendMessage = vi.fn().mockRejectedValue(new Error('network'))
    render(<SearchPage sendMessage={sendMessage} />)

    fireEvent.change(screen.getByLabelText('Nachricht'), {
      target: { value: 'Hallo' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Senden' }).form)

    await waitFor(() =>
      expect(
        screen.getByText('Die Anfrage ist fehlgeschlagen. Bitte versuche es erneut.'),
      ).toBeInTheDocument(),
    )
    expect(screen.getByRole('button', { name: 'Senden' })).toBeEnabled()
  })
})
