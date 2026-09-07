import { render, screen, within } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

let App

beforeAll(async () => {
  try {
    App = (await import('./App.jsx')).default
  } catch {
    App = undefined
  }
})

describe('homepage structure', () => {
  it('exposes the styled site shell', () => {
    expect(App).toBeTypeOf('function')

    const { container } = render(<App />)

    expect(container.firstElementChild).toHaveClass('site-shell')
  })

  it('renders only the hero and services sections', () => {
    expect(App).toBeTypeOf('function')

    const { container } = render(<App />)
    const sections = container.querySelectorAll(':scope > main > section')

    expect(sections).toHaveLength(2)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'B2B beginnt hier.',
    )
  })

  it('renders a static showreel placeholder instead of a video', () => {
    expect(App).toBeTypeOf('function')

    const { container } = render(<App />)
    const placeholder = screen.getByLabelText('Showreel video placeholder')

    expect(within(placeholder).getByText('Showreel')).toBeInTheDocument()
    expect(container.querySelector('video')).not.toBeInTheDocument()
  })

  it('renders the four core services', () => {
    expect(App).toBeTypeOf('function')

    render(<App />)

    ;[
      'Marke & Strategie',
      'Websites & Landingpages',
      'Video & Animation',
      '3D Produktkommunikation',
    ].forEach((service) => {
      expect(
        screen.getByRole('heading', { level: 3, name: service }),
      ).toBeInTheDocument()
    })
  })
})
