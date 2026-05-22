# Hardwood — Ritorno al basket

Diario di allenamento single-user, mobile-first, per tornare a giocare a basket amatoriale dopo anni alla scrivania.

Piano in 3 fasi (ricondizionamento → reintroduzione basket → game shape) con contenuti curati: workout palestra, mobilità, corsa Zona 2, fondamentali basket. Tracking sessioni con form per tipo, streak e progresso settimanale. Tutto in locale (`localStorage`), zero backend, installabile come PWA.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (palette "sport journal" personalizzata)
- Lucide icons
- `vite-plugin-pwa` per installazione e cache offline
- `localStorage` per la persistenza

## Sviluppo

```bash
pnpm install
pnpm dev
```

Build:

```bash
pnpm build
pnpm preview
```

Rigenerazione icone PWA (solo se cambi il logo):

```bash
node scripts/generate-icons.mjs
```

## Note

- Nessun account, nessun cloud, nessun tracking esterno. I dati vivono solo sul dispositivo.
- Backup via export/import JSON dalla tab Storico.
- L’app è pensata per un utente specifico. Vedi `CLAUDE.md` per il dettaglio sulle decisioni di design.
