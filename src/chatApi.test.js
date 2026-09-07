import { describe, expect, it, vi } from 'vitest'
import { sendChat } from './chatApi.js'

const encoder = new TextEncoder()

function streamResponse(chunks, ok = true) {
  let index = 0

  return {
    ok,
    body: {
      getReader() {
        return {
          async read() {
            if (index === chunks.length) return { done: true }
            return { done: false, value: encoder.encode(chunks[index++]) }
          },
        }
      },
    },
  }
}

describe('sendChat', () => {
  it('posts the authenticated question and parses split SSE events', async () => {
    expect(sendChat).toBeTypeOf('function')

    const onStatus = vi.fn()
    const fetchImpl = vi.fn().mockResolvedValue(
      streamResponse([
        'event: status\ndata: {"message":"Suche läuft',
        '…"}\n\nevent: result\ndata: {"answer":"Hallo!","conversationId":"conv-1"}\n\n',
      ]),
    )

    const result = await sendChat('Was macht MAVEO?', {
      conversationId: 'conv-old',
      locale: 'de',
      onStatus,
      fetchImpl,
    })

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://ai-chat.mavai.de/api/v1/chat',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization:
            'Bearer pk_live_pXPQ1576H7OgGcVj_0y15-8OpjqTKSoMcl0hXkrJwrE',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: 'Was macht MAVEO?',
          conversationId: 'conv-old',
          locale: 'de',
        }),
      }),
    )
    expect(onStatus).toHaveBeenCalledWith('Suche läuft…')
    expect(result).toEqual({ answer: 'Hallo!', conversationId: 'conv-1' })
  })

  it('throws when the endpoint rejects the request', async () => {
    expect(sendChat).toBeTypeOf('function')

    await expect(
      sendChat('Hallo', {
        fetchImpl: vi.fn().mockResolvedValue(streamResponse([], false)),
      }),
    ).rejects.toThrow('Die Anfrage ist fehlgeschlagen.')
  })
})
