# Maveo-Inspired Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive two-section Vite/React homepage inspired by Maveo, with a static hero video placeholder.

**Architecture:** A single React page composes focused header, hero, video-placeholder, services, and service-card components. Plain CSS owns all responsive layout and visual styling; a small Vitest/Testing Library suite verifies the page structure and scope.

**Tech Stack:** Vite, React, Vitest, Testing Library, plain CSS

## Global Constraints

- Include only the header/hero and introduction/services sections.
- Use a styled static placeholder instead of playable hero video.
- Use no routing, backend, forms, or external UI libraries.
- Support desktop and mobile layouts, keyboard focus, and reduced motion.

---

### Task 1: Scaffold and Page Structure

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/App.test.jsx`
- Create: `src/test/setup.js`
- Create: `vite.config.js`

**Interfaces:**
- Produces: default `App` React component and rendered page sections with `data-testid="hero"` and `data-testid="services"`.

- [ ] **Step 1: Create the package and test configuration**

Define scripts for `dev`, `build`, and `test`, install React/Vite and Vitest/Testing Library dependencies, and configure the `jsdom` environment with `src/test/setup.js`.

- [ ] **Step 2: Write the failing page-structure test**

Test that the app renders the “B2B beginnt hier.” heading, exactly two top-level `main > section` elements, four service headings, and an accessible non-video Showreel placeholder.

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- --run`

Expected: FAIL because `src/App.jsx` does not yet implement the required page.

- [ ] **Step 4: Implement the minimal React structure**

Create `Header`, `Hero`, `VideoPlaceholder`, `ServicesSection`, and `ServiceCard` components in `src/App.jsx`, render them from `src/main.jsx`, and include exactly two direct sections under `main`.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- --run`

Expected: all tests PASS.

### Task 2: Responsive Visual Styling

**Files:**
- Create: `src/styles.css`
- Modify: `src/main.jsx`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: class names and semantic structure from `src/App.jsx`.
- Produces: responsive desktop/mobile presentation with near-black, white, and yellow visual system.

- [ ] **Step 1: Add a failing stylesheet integration assertion**

Assert that `src/main.jsx` imports `./styles.css` by testing the rendered app for the root `site-shell` class before adding the stylesheet and class.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run`

Expected: FAIL because the styled shell is not present.

- [ ] **Step 3: Add the responsive stylesheet**

Implement typography, near-black hero, yellow accents, rounded video placeholder, white services layout, four responsive cards, hover/focus states, a mobile breakpoint, and `prefers-reduced-motion`.

- [ ] **Step 4: Run complete verification**

Run: `npm test -- --run && npm run build`

Expected: tests PASS and Vite production build exits successfully.

- [ ] **Step 5: Review the rendered page**

Run the Vite development server and inspect desktop and mobile screenshots for section count, overflow, hierarchy, and responsive stacking.
