# AI Search Page Design

## Scope

Add a custom full-page AI chat experience at `/search` and link it from the
homepage header as “AI Suche.” Keep the interface intentionally minimal: chat
messages, one text input, and one send button.

## Interface

- Reuse the near-black Maveo visual language, yellow accent, wordmark, and
  compact header.
- Show a centered welcome state before the first message.
- Render user messages as yellow right-aligned bubbles and assistant messages
  as dark outlined left-aligned bubbles.
- Keep the composer at the bottom of the page with a single-line input and
  yellow send button.
- Include only a back-to-home link, message log, loading status, and composer.
- On mobile, preserve comfortable touch targets and use the full viewport width.

## Chat Behavior

- Submit on the send button or Enter; ignore empty messages.
- Send `POST https://ai-chat.mavai.de/api/v1/chat`.
- Use `Authorization: Bearer pk_live_pXPQ1576H7OgGcVj_0y15-8OpjqTKSoMcl0hXkrJwrE`
  and `Content-Type: application/json`.
- Send `{ question, conversationId, locale: "de" }`.
- Parse server-sent events from the response stream.
- Display `status` event messages while waiting.
- Read the final answer and conversation ID from the `result` event.
- Store the conversation ID in `sessionStorage` under
  `maveo-conversation-id`.
- Disable duplicate submission while a request is active.
- On failure, keep the user message and show a short retryable error bubble.

## Architecture

- Keep the existing Vite/React setup and avoid a routing dependency.
- Select the homepage or search page from `window.location.pathname`.
- Put API/SSE handling in a small `chatApi.js` module so it can be tested
  independently from the React page.
- Preserve the previously added third-party widget script.

## Verification

- Unit-test request headers/body and streamed event parsing.
- Component-test navigation, empty state, message submission, loading, success,
  and failure states.
- Run the production build and visually inspect desktop and mobile layouts.
