const CHAT_ENDPOINT = 'https://ai-chat.mavai.de/api/v1/chat'
const PUBLIC_KEY =
  'pk_live_pXPQ1576H7OgGcVj_0y15-8OpjqTKSoMcl0hXkrJwrE'

function readEvent(block) {
  const lines = block.split(/\r?\n/)
  const event = lines
    .find((line) => line.startsWith('event:'))
    ?.slice(6)
    .trim()
  const data = lines
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trimStart())
    .join('\n')

  if (!event || !data) return null

  return { event, data: JSON.parse(data) }
}

export async function sendChat(
  question,
  {
    conversationId,
    locale = 'de',
    onStatus = () => {},
    fetchImpl = fetch,
  } = {},
) {
  const response = await fetchImpl(CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PUBLIC_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      ...(conversationId ? { conversationId } : {}),
      locale,
    }),
  })

  if (!response.ok || !response.body) {
    throw new Error('Die Anfrage ist fehlgeschlagen.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let result

  const processBlock = (block) => {
    if (!block.trim()) return

    const parsed = readEvent(block)
    if (parsed?.event === 'status' && parsed.data.message) {
      onStatus(parsed.data.message)
    }
    if (parsed?.event === 'result') {
      result = {
        answer: parsed.data.answer || 'Keine Antwort.',
        conversationId: parsed.data.conversationId,
      }
    }
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const blocks = buffer.split(/\r?\n\r?\n/)
    buffer = blocks.pop() || ''
    blocks.forEach(processBlock)
  }

  buffer += decoder.decode()
  processBlock(buffer)

  if (!result) {
    throw new Error('Die Anfrage ist fehlgeschlagen.')
  }

  return result
}
