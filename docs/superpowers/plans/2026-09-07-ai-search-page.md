# AI Search Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a minimal full-page AI chat at `/search` that uses the Mavai streaming chat API.

**Architecture:** A pathname switch selects the homepage or search page without a router. A focused `chatApi.js` module owns the authenticated POST request and SSE parsing; `SearchPage.jsx` owns transient chat UI state and renders messages.

**Tech Stack:** React, Vite, Vitest, Testing Library, plain CSS, Fetch API

## Global Constraints

- Keep only a back link, message log, loading status, input, and send button.
- Use the existing Maveo-inspired visual system and public API key.
- Add no router, sidebar, file controls, saved chats, or settings.
- Preserve the existing third-party widget script.

---

### Task 1: Streaming Chat Client

**Files:**
- Create: `src/chatApi.js`
- Create: `src/chatApi.test.js`

**Interfaces:**
- Produces: `sendChat(question, options)` returning `{ answer, conversationId }`.
- `options` supports `conversationId`, `locale`, `onStatus`, and injectable `fetchImpl`.

- [ ] Write failing tests for the authorization header, JSON body, split SSE chunks, status callback, and result parsing.
- [ ] Run `npm test -- --run` and confirm failures are caused by the missing client.
- [ ] Implement the minimal fetch and incremental SSE parser.
- [ ] Run `npm test -- --run` and confirm all client tests pass.

### Task 2: Search Page and Navigation

**Files:**
- Create: `src/SearchPage.jsx`
- Create: `src/SearchPage.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `sendChat(question, options)` from `src/chatApi.js`.
- Produces: `SearchPage` component and `/search` pathname selection.

- [ ] Write failing tests for the homepage “AI Suche” link, empty search state, successful submission, persisted conversation ID, and error bubble.
- [ ] Run `npm test -- --run` and confirm the search-page tests fail.
- [ ] Implement the navigation link, pathname switch, message state, submission flow, loading state, storage, and error handling.
- [ ] Run `npm test -- --run` and confirm all component tests pass.

### Task 3: Responsive Maveo Chat Styling

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: semantic class names from `SearchPage`.
- Produces: full-viewport dark chat layout with responsive message bubbles and composer.

- [ ] Add styles for the search header, centered empty state, scrollable log, user/assistant bubbles, loading status, and bottom composer.
- [ ] Add mobile adjustments and visible keyboard focus states.
- [ ] Run `npm test -- --run && npm run build && git diff --check`.
- [ ] Inspect `/search` at desktop and mobile sizes, submit a live question, and verify there is no horizontal overflow.
