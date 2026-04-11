# GRM Dashboard
## Ground Resources Management — Alert Dashboard

**Emmanuel Olayemi** | Front-End Developer Take-Home Challenge for Rocket Communications, Inc
Built with **Angular 17** + **Astro UXDS** component library

---

## Overview

A Ground Resources Management (GRM) operator dashboard that
displays satellite contact alerts in a clear, prioritized,
and interactive interface. Built using Angular 17 standalone
components and the Astro UXDS design system used across
space operations applications.

---

## Features

- **Alert Table** — all alerts sorted by errorTime, most recent first
- **Severity Filter** — filter by Critical, Serious, Caution, or Normal
- **Show Details** — opens rux-dialog showing contactSatellite and contactDetail
- **Acknowledge Alerts** — permanently marks alerts as acknowledged
  with visual distinction — faded opacity, strikethrough text, grey badge
- **Summary Cards** — live counts of unacknowledged alerts by severity
- **Global Status Bar** — Astro rux-global-status-bar with live clock

---

## Tech Stack

- **Angular 17** — standalone components architecture
- **@astrouxds/astro-web-components** — Astro UXDS web components
- **@astrouxds/angular** — Angular wrappers for Astro components
- **TypeScript** — type-safe models and services
- **SCSS** — component styles using Astro CSS custom properties
- **RxJS BehaviorSubject** — reactive state management
- **HttpClient** — loads data.json from assets

---

## Prerequisites

- Node.js v18+
- npm v9+
- Angular CLI v17

```bash
npm install -g @angular/cli@17
```

---

## Setup & Run

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Open browser
# Navigate to http://localhost:4200
```

---

## Project Structure
src/
├── app/
│   ├── components/
│   │   └── alert-table/        # Main alert table + dialog
│   ├── models/
│   │   └── contact.model.ts    # Alert and Contact interfaces
│   ├── services/
│   │   └── alert.service.ts    # Data loading + alert state
│   ├── app.component.*         # Root with global status bar
│   └── app.config.ts           # HttpClient provider
├── assets/
│   └── data.json               # GRM contact and alert data
├── styles.scss                 # Global Astro UXDS CSS
└── main.ts                     # Astro custom element registration

---

## Key Design Decisions

**Standalone Components** — Angular 17 standalone architecture
avoids NgModules for cleaner, more modern code structure.

**Reactive State with BehaviorSubject** — AlertService uses a
BehaviorSubject so components react instantly to state changes
like acknowledgements without manual change detection.

**Immutability in acknowledgeAlert** — Instead of mutating
the existing alert object directly, a new array is created
with the updated alert. This ensures Angular's change
detection picks up the update reliably.

**Astro UXDS Design System** — All components follow the
Astro space operations design language with correct severity
color coding: Critical #ff3838, Serious #ffb302,
Caution #fce83a, Normal #56f000.

---

## Note on Framework

Built in **Angular** per the special instructions provided,
ignoring React references in the original repository.