# CLAUDE.md — Hardwood

Project guide for Claude Code. This is a personal basketball comeback tracking app for an adult returning to amateur basketball after years of sedentary life.

## Project overview

**Hardwood** is a single-user, mobile-first web app that combines:
- A structured 8-10 week training plan (3 phases: ricondizionamento → reintroduzione basket → game shape)
- Reference content (gym workouts, mobility exercises, slow-running guidance, basketball drills) with curated video tutorials
- Session tracking with type-specific forms and persistent local storage
- Streak and weekly progress visualization for habit reinforcement

The target user: 30-something, 1.83m / 85kg, played until U18, mostly sedentary desk worker, going back to amateur basketball. No coach, no team yet — using the app as a self-directed program.

The app is single-user by design. No accounts, no backend, no cloud sync. All data lives on the user's device.

## Tech stack

- **Vite + React 18** (TypeScript optional; if used, keep types light and pragmatic)
- **Tailwind CSS** for styling. No CSS-in-JS, no styled-components.
- **lucide-react** for icons
- **localStorage** for persistence (see Persistence section)
- **PWA** via `vite-plugin-pwa` so the user can install it on their phone home screen and open it offline
- No router needed: the app is a single-page tabbed interface. If state grows, useReducer is fine — do not introduce Redux/Zustand/etc.
- No backend, no API calls, no analytics, no telemetry.

## Persistence

This is the most important architectural decision. Read carefully.

**Use `localStorage` with a single namespaced JSON blob per concern.** No IndexedDB unless and until the user wants to store binary data (photos, exported PDFs). localStorage is synchronous, supported everywhere, and trivial to back up via export.

Keys to use:
- `hardwood:sessions` — JSON array of session objects (see schema below)
- `hardwood:currentPhase` — string, one of `"p1" | "p2" | "p3"`
- `hardwood:settings` — JSON object for future preferences (theme, units, etc.)

Wrap localStorage access in a small `src/lib/storage.ts` module with `get`, `set`, `remove` that handle JSON serialization and try/catch silently (quota errors, private mode, etc.). Never let a storage failure crash a render.

**Provide an export/import flow.** Settings tab should expose:
- "Esporta dati" → downloads `hardwood-export-YYYY-MM-DD.json` containing all keys
- "Importa dati" → file picker that merges or replaces (ask user)

This is the user's only backup mechanism. Take it seriously.

**Do not** use:
- `window.storage` (that's a Claude.ai Artifacts-only API, not real web)
- Cookies
- sessionStorage (data lost on close)
- Any third-party sync service

## Data model

```ts
type SessionType = 'gym' | 'cardio' | 'court' | 'mobility' | 'rest';

type Session = {
  id: number;            // Date.now() at creation
  type: SessionType;
  date: string;          // YYYY-MM-DD
  timestamp: number;     // Date.now() at creation (for sort stability)
  notes?: string;

  // gym-specific
  gymWorkout?: 'A' | 'B';
  gymExercises?: Record<string, string>;  // { "Squat con bilanciere": "60kg × 3×8", ... }

  // cardio-specific
  cardioDuration?: string;        // minutes, as string for input flexibility
  cardioAvgHR?: string;           // bpm
  cardioPerceivedEffort?: number; // 1-10

  // court-specific
  courtDuration?: string;
  courtFocus?: string[];          // ["Ball handling", "Tiro libero", ...]

  // mobility-specific
  mobilityCompleted?: string[];   // exercise names from the catalog
};

type Phase = 'p1' | 'p2' | 'p3';
```

When extending: add new optional fields, never break old ones. Sessions persisted today must still parse in 6 months.

## Information architecture (tabs)

7 tabs in this exact order, all reachable from a sticky top tab bar (horizontally scrollable on narrow screens):

1. **Oggi** — current phase card with phase switcher (P1/P2/P3 pills), streak + weekly count stats, primary CTA "Registra sessione di oggi", weekly template for current phase, last 3 sessions.
2. **Piano** — the 3 phases expandable, the "3 mistakes to avoid" card.
3. **Palestra** — Workout A (Spinta) and Workout B (Tirata) with exercises, sets/reps, technique notes, and a video link per exercise. Highlighted call-out for Romanian Deadlift since it's the one exercise the user doesn't know.
4. **Mobilità** — 7 mobility exercises with duration, technique notes, video link each.
5. **Corsa** — Zone 2 explainer with the 5-step "how to" list, the conversation test, and 2 deep-read links.
6. **Basket** — 5 fundamentals ranked by priority, plus video resources grouped by ball handling / shooting / conditioning.
7. **Storico** — full session list with type-specific detail rendering, swipe-to-delete or X button.

The "Registra sessione" modal opens from the Today tab and contains **type-specific form fields**:

- **Palestra**: workout A/B toggle, then a per-exercise text input for "peso × reps" notation
- **Cardio**: duration (min), avg HR (bpm), perceived effort 1-10 slider
- **Campetto**: duration, multi-select chips for what was worked on (Ball handling, Tiro libero, Tiro in corsa, Conditioning, Difesa, 1vs1 / 3vs3)
- **Mobilità**: checkbox list of the 7 mobility exercises
- **Riposo**: just notes

All types include a free-text notes field with type-specific placeholder hints.

## Content (do not change without user input)

The training plan, workouts, mobility exercises, basketball drills, and curated video links are **the product**. They were assembled from research and tuned to this specific user (returning ex-U18, 30s, desk-bound). Store them as exported constants in `src/data/` — one file per domain:

- `src/data/phases.ts` — the 3 phases with weekly templates
- `src/data/workouts.ts` — Workout A and B
- `src/data/mobility.ts` — the 7 mobility exercises
- `src/data/cardio.ts` — Zone 2 content
- `src/data/basketball.ts` — priority fundamentals + curated drill links

If the user asks for content edits, edit these files. Do not invent new exercises or links on your own; if the user wants more, do the research with them and add intentionally.

The full content reference (Italian copy, links, ordering) is in the existing prototype at `/reference/prototype.jsx` — treat that as the source of truth for v1 content. Port it faithfully.

## Design system

The aesthetic is **"sport journal"** — analog, considered, not flashy. Reject the typical fitness-app neon-and-gradient look.

### Color palette

```css
--bg-page: #f4ede1;        /* warm cream */
--bg-card: #faf6ec;        /* lighter cream */
--bg-card-accent: #f0e4cc; /* tan call-outs */
--border: #d9cdb8;         /* warm beige border */
--border-soft: #ece1c9;    /* inner divider */

--ink: #3a2e22;            /* primary text, deep brown */
--ink-body: #4a3e2f;       /* body copy */
--ink-muted: #6b5d48;
--ink-faint: #8a7a5e;      /* labels, captions */

--accent-rust: #c4654d;    /* Phase 1, primary accent, streak number */
--accent-tan: #a8895f;     /* Phase 2 */
--accent-moss: #5d7a5a;    /* Phase 3, "ready" state */
--link: #8a4a2a;           /* underlined inline links */
```

Phase color appears as a 4px left border on phase-related cards. The rust accent (#c4654d) is the primary CTA / streak / active-state color.

### Typography

Two-family pairing, both from Google Fonts:

- **Fraunces** (display): for headings, numerals (streak count), exercise names, tab labels when active. Use weights 600 and 800. Optical size matters — let `opsz` go larger for big headings.
- **Inter** (body / UI): for labels, body copy, buttons, captions. Weights 400, 500, 600.

Default system font fallback chain for display: `"Fraunces", "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif`.

Body fallback: `"Inter", system-ui, -apple-system, sans-serif`.

**Critical**: Do **not** swap to Inter-everywhere or Space Grotesk or other generic AI defaults. The journal feel comes from the serif/sans pairing.

### Tone of UI copy

- All UI copy is in **Italian** (informal, second person singular, "tu").
- Labels are SHORT and uppercase with letter-spacing (`0.12em–0.18em`), like a magazine.
- Stat captions: "giorni streak", "sessioni", "sessioni registrate".
- Encouragement is understated. No "Great job!" emoji confetti. The closing footer quote is `"La progressione conta più della velocità."` — keep that tone.

### Spacing & shape

- Max content width: 720px, centered, with 20px horizontal padding.
- Cards: 1px border, 4px border-radius (slightly squared, not pillowy). No drop shadows by default. Hover/active states change background, not elevation.
- Generous vertical rhythm. 24-32px between major sections.
- Buttons: 4px border-radius. Primary button is dark brown (`#3a2e22`) with cream text. Secondary is transparent with beige border.

### Mobile-first

The app must feel native on a phone. Specifically:
- Top tab bar is sticky and horizontally scrollable when needed.
- The "Nuova sessione" modal slides up from the bottom (iOS sheet style), respects `env(safe-area-inset-bottom)`.
- Hit targets are at minimum 40px tall.
- Pull-to-refresh is **not** wired up — pulling should not reload state.

## PWA configuration

Use `vite-plugin-pwa` with `registerType: 'autoUpdate'`. Manifest:

```ts
{
  name: 'Hardwood — Ritorno al basket',
  short_name: 'Hardwood',
  description: 'Diario di allenamento per tornare a giocare a basket',
  theme_color: '#3a2e22',
  background_color: '#f4ede1',
  display: 'standalone',
  orientation: 'portrait',
  start_url: '/',
  lang: 'it',
}
```

Provide 192px and 512px maskable icons. The icon should be simple — a stylized "H" or basketball line-art in the rust tone on cream — not a photo, not a gradient blob.

Service worker should cache the app shell aggressively (it's offline-first by nature: there's no data fetching). Do not precache external video links; let those fall through to the network.

## Things to avoid

- Don't add a social/sharing feature. Single user, by design.
- Don't add gamification beyond the streak and weekly count. No badges, no points, no "level up". The user is an adult.
- Don't auto-suggest workouts based on calendar gaps. The plan tells the user what to do; the user chooses.
- Don't add a coach AI / chat / generative content inside the app at runtime. The content is curated, intentional, and finite.
- Don't switch to a date library (date-fns, dayjs). Native `Date` + `toISOString().split('T')[0]` is enough.
- Don't add a build of icons larger than what lucide-react gives you. If you need an icon lucide doesn't have, inline an SVG.

## When extending features

Ask the user first if it's a structural change. Quick wins that don't need asking:
- Better empty states
- Accessibility improvements (ARIA, focus management in modal)
- Performance (memoizing session list rendering once it grows)
- Loading skeleton on initial mount

Things that require user confirmation:
- New session types
- Editing the training plan content
- Adding charts/visualizations of progress over time
- Anything that touches the data schema

When adding a feature that introduces new persisted state, write a migration helper in `src/lib/storage.ts` that reads old shape and produces new shape. Keep migrations idempotent.

## File layout (suggested)

```
src/
  main.tsx
  App.tsx
  components/
    TabBar.tsx
    PhaseCard.tsx
    StatsRow.tsx
    SessionModal.tsx
    SessionList.tsx
    VideoLink.tsx
  tabs/
    TodayTab.tsx
    PlanTab.tsx
    GymTab.tsx
    MobilityTab.tsx
    CardioTab.tsx
    BasketTab.tsx
    HistoryTab.tsx
  data/
    phases.ts
    workouts.ts
    mobility.ts
    cardio.ts
    basketball.ts
  lib/
    storage.ts
    streak.ts
    types.ts
public/
  icons/
    icon-192.png
    icon-512.png
    icon-maskable.png
```

## Acceptance for v1

The app is "done v1" when the user can:
1. Open the installed PWA on their phone offline
2. See today's recommended activity for their current phase
3. Register a workout with type-specific fields in under 30 seconds
4. See their streak update immediately
5. Open any tutorial video by tapping a link
6. Export their data as JSON

Anything past that is v2.
