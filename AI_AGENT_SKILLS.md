# AI Agent Skills: Nexus Platform

This document is designed to give AI agents (like GitHub Copilot, Cursor, Claude, etc.) immediate context on the **Nexus Platform** monorepo so they can assist you faster and more accurately.

## 🛠️ Instructions for AI Agents

When assisting with the `nexus-platform` project, you MUST adhere to the following rules and understand the context below:

### 1. Workspace Context
- **Architecture**: This is a Turborepo monorepo with `pnpm` workspaces.
- **Apps**: 
  - `apps/api`: NestJS backend.
  - `apps/web`: Next.js (App Router) frontend.
- **Packages**: Shared code lives in `packages/` (e.g., `@repo/types`, `@repo/eslint-config`).
- **Dependencies**: Use `pnpm` to install packages. Run commands from the root using `turbo run <script>`.

### 2. Frontend Constraints (`apps/web`)
- **Tech Stack**: Next.js App Router, Tailwind CSS v4, Shadcn UI, React Query, Redux Toolkit.
- **Design System Enforcement**: 
  - **Read `apps/web/DESIGN.md`** before making any UI changes.
  - The UI uses a strictly defined Starbucks-inspired theme. 
  - **NEVER** invent random colors or arbitrary border radii.
  - **Always use `ds-*` classes** defined in `globals.css` (e.g., `ds-btn-primary-pill`, `ds-surface-card-elevated`) for buttons, cards, and text styling.
  - All buttons are 50px pill-shaped with `scale-95` on active state.
  - The page canvas background is usually a neutral warm cream, not pure white.
- **Data Fetching**: Prefer React Query (`@tanstack/react-query`) for asynchronous data fetching and mutations, while Redux Toolkit is strictly for client-side global state.

### 3. Backend Constraints (`apps/api`)
- **Tech Stack**: NestJS, TypeORM, MSSQL (`mssql`, `msnodesqlv8`).
- **Pattern**: Follow standard NestJS modular architecture. Group logic into cohesive modules inside `src/modules/`.
- **Database**: When creating entities, ensure they map correctly to SQL Server conventions using TypeORM decorators. 
- **Types**: Import shared types from `@repo/types` instead of declaring local interfaces when the data crosses the API boundary.

### 4. Code Generation Rules
- **Be concise**: Only provide the necessary code. Do not remove existing comments unless instructed.
- **Imports**: Ensure imports from workspace packages use the exact name defined in their `package.json` (e.g., `import { UserType } from '@repo/types'`).
- **No Hallucinations**: Do not assume the existence of utility functions or components not present in the codebase. When adding a new component to the web app, check if a Shadcn component exists first.

---
**Agent Prompt Hook:**
*"I am working in the Nexus Platform monorepo. Please ensure my NestJS backend code uses TypeORM, my Next.js frontend code uses the `ds-*` Tailwind classes, and shared types are put in `@repo/types`."*
