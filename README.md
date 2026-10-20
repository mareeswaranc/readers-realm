# Arcane Story Atlas

Build a visually stunning, animation-rich personal website called The Arcane Archive to showcase my books, manga, manhwa, anime, and other things I have read or watched.

The website should feel like entering a mysterious fantasy world: an ancient magical library combined with the dark fantasy atmosphere of Solo Leveling, glowing magical portals, floating particles, cinematic backgrounds, and premium dark UI design.

Store collection information in a simple, editable TypeScript/JSON data file with demo entries so I can easily add, edit, or remove titles.

Visual identity:
- Midnight black: #080B12
- Deep navy: #10172A
- Magical purple: #8B5CF6
- Arcane blue: #38BDF8
- Antique gold: #D4AF70
- Soft white: #F5F3FF
- Typography: Cinzel / fantasy serif for headings, Inter / Manrope for text. Elegant fantasy style, glowing borders, subtle gradients.

Key sections:
1. Cinematic full-screen hero ("Welcome to My World of Stories", "Every story leaves a mark. Every world becomes a part of me.") with floating particles, ambient nebula/rune glow, cursor parallax, and quick action buttons ("Explore My Collection", "Enter the Archive").
2. "Explore the Realms" 5 category portals: The Written Realms (books/novels), The Inked Realms (manga/manhwa), The Animated Realms (anime), The Realms of Wisdom (self-improvement/philosophy), The Endless Scroll (light/web novels). Clicking smoothly scrolls and filters the collection.
3. Collection catalog: interactive cards with covers, type, personal ratings, status (Completed, Reading, Watching, Plan to Read). On hover: 3D tilt, lift, glowing border illumination. On click: rich detail modal with synopsis, personal rating, status, and personal notes. Instant search and filter tabs (type and status).
4. "Stories That Stayed With Me": personal highlights section with horizontal showcase cards and personal quotes/notes.
5. Reading and watching statistics: live counters computed directly from the collection data (total read, completed, watching, favorite genre).
6. Ambient mode toggle: Arcane Mode (rich particles and glows) vs Quiet Mode (minimal ambient effects).
7. Atmospheric starry footer with smooth fade into darkness ("The archive never ends. There is always another world to discover.") and scroll-to-top rune.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
