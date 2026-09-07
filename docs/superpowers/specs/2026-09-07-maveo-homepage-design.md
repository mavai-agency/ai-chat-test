# Maveo-Inspired Homepage Design

## Scope

Build a lightweight Vite and React homepage inspired by the first two sections of
https://maveo.de/. The result is a visual recreation, not a functional copy of
the original site.

## Section 1: Header and Hero

- Dark near-black background with a compact top navigation.
- Simple text-based MAVEO-style wordmark.
- Navigation links and a yellow rounded consultation button.
- Small yellow eyebrow copy above an oversized headline: “B2B beginnt hier.”
- The word “hier.” uses the yellow accent.
- A large media area represented by a styled static placeholder with a central
  play button and “Showreel” label.
- Mobile layout collapses the navigation and stacks media below the headline.

## Section 2: Introduction and Services

- White background with generous spacing and an editorial layout.
- Heading “Wir machen B2B sichtbar” and supporting German copy.
- “Leistungen & Lösungen” introduction.
- Four responsive service cards for brand strategy, websites, video, and 3D
  product communication.
- Cards use simple geometric accents and subtle hover feedback without external
  image assets.

## Technical Design

- Vite with React and plain CSS.
- Components remain small: `Header`, `Hero`, `VideoPlaceholder`,
  `ServicesSection`, and `ServiceCard`.
- No routing, backend, forms, video playback, or external UI dependencies.
- Semantic HTML, keyboard-visible links/buttons, responsive CSS, and reduced
  motion support.

## Verification

- Run the production build.
- Check desktop and mobile widths.
- Confirm no horizontal overflow and that the two-section limit is preserved.
