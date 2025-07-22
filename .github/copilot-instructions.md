# Copilot Instructions for propertyhub-v1

## Architecture Overview

- **Monorepo structure:**
  - `client/` — Next.js 13+ app (App Router, TypeScript, Tailwind, React)
  - `server/` — Node.js/Express API (controllers, models, routes)
- **Data flow:**
  - Client fetches property data from `process.env.NEXT_PUBLIC_API_URI/api/properties` (see `contexts/PropertyContext.js`)
  - Context API (`PropertyContext`) provides property data to React components
- **Component conventions:**
  - UI components in `client/components/` (e.g., `property-card.tsx`, `admin/Sidebar.tsx`)
  - Pages in `client/app/` (Next.js App Router)
  - Use `use client` directive for client-side components
  - Use `useProperty()` hook to access property data in components

## Developer Workflows

- **Install dependencies:**
  - `cd client && npm install` for frontend
  - `cd server && npm install` for backend
- **Run development servers:**
  - Frontend: `npm run dev` in `client/`
  - Backend: `npm start` in `server/`
- **Environment variables:**
  - Set `NEXT_PUBLIC_API_URI` in `client/.env.local` for API endpoint
- **Styling:**
  - Tailwind CSS configured via `tailwind.config.ts` and `postcss.config.mjs`

## Patterns & Conventions

- **Context API:**
  - Use `PropertyProvider` in `_app.js` to wrap the app
  - Fetches property data once on mount
- **Dynamic rendering:**
  - Render property cards by mapping over `properties` from context
  - Example: see `PropertyList` pattern in instructions
- **TypeScript:**
  - Use explicit interfaces for props (see `PropertyCardProps`)
- **Image handling:**
  - Use Next.js `Image` component for all images
  - Provide fallback images for missing data

## Integration Points

- **API:**
  - All property data comes from the backend API (`/api/properties`)
  - Backend code in `server/controllers/`, `server/models/`, `server/routes/`
- **No custom test or build scripts found** — use standard Next.js/Node.js workflows

## Examples

- See `client/components/property-card.tsx` for property card UI and prop usage
- See `client/contexts/PropertyContext.js` for context API pattern

---

If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.
