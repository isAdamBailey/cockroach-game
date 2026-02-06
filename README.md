# Cockroach Hiss!

A fun, simple browser game where you tap a Madagascar hissing cockroach to make it hiss and guide it across the screen to a toilet. When it arrives, it lets out a glorious fart cloud and you win!

## How to Play

1. Tap **Play** on the start screen
2. Tap the cockroach's **head** (the right side) to make it hiss
3. Each hiss moves the cockroach a little closer to the toilet
4. Rapid taps earn **combo bonuses**
5. When the cockroach reaches the toilet — it farts and you win!

## Scoring

- Each hiss: **10 points**
- Combo bonus (rapid taps): **+5 extra per combo hit**
- Star rating at the end based on efficiency (fewer taps = more stars)

## Tech Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- Web Audio API for sound effects
- Google Analytics 4 for usage tracking
- No backend required

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy as a static site.

## Google Analytics

Replace the placeholder measurement ID in `src/main.js` with your GA4 ID:

```js
app.use(createGtag({
  tagId: 'G-XXXXXXXXXX',  // <-- replace with your ID
}))
```
