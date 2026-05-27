# AI Agent Skills: Nexus Platform

> ⚠️ **CRITICAL INSTRUCTION FOR AI AGENTS (Claude, Cursor, Copilot, etc.)**
> Before performing any action, writing code, or answering questions in this workspace, you **MUST** read the guidelines in the [skills/](./skills/) directory first:
> - [Coding Rules & Clean Code](./skills/coding-rules.md)
> - [Code Organization & Structure](./skills/code-structure.md)
> - [Best Practices & Developer Guidelines](./skills/best-practices.md)
> - [Monorepo & Shared Packages Guidelines](./skills/monorepo-guidelines.md)
>
> Strict adherence to the rules defined in these files is required. Do not write messy, redundant, or unvalidated code.

---

This document gives AI agents immediate context on the **Nexus Platform** monorepo so they can assist faster and more accurately.

## 🛠️ Context Overview for AI Agents

### 1. Workspace Context
- **Architecture**: This is a Turborepo monorepo with `pnpm` workspaces (or npm workspaces).
- **Apps**: 
  - `apps/api`: NestJS backend.
  - `apps/web`: Next.js (App Router) frontend.
- **Packages**: Shared code lives in `packages/` (e.g., `@repo/types`, `@repo/eslint-config`).
- **Commands**: Run scripts from the root using `turbo run <script>`.

### 2. Frontend Constraints (`apps/web`)
- **Tech Stack**: Next.js App Router, Tailwind CSS v4, Shadcn UI, React Query, Redux Toolkit.
- **Design System Enforcement**: 
  - **Read `apps/web/DESIGN.md`** before making any UI changes.
  - The UI uses a strictly defined Starbucks-inspired theme.
  - **Always use `ds-*` classes** defined in `globals.css` (e.g., `ds-btn-primary-pill`, `ds-surface-card`) for buttons, cards, and text styling.
  - All standard buttons are 50px pill-shaped with `scale-95` on active state.

### 3. Backend Constraints (`apps/api`)
- **Tech Stack**: NestJS, TypeORM, MSSQL (`mssql`, `msnodesqlv8`).
- **Pattern**: Follow standard NestJS modular architecture. Group logic into cohesive modules inside `src/modules/`.
- **Database**: Ensure entities map correctly to SQL Server conventions (use snake_case for DB tables/columns).
- **Types**: Import shared types from `@repo/types` instead of declaring local interfaces when the data crosses the API boundary.

### 4. Code Generation Rules
- **No Hallucinations**: Do not assume the existence of utility functions or components not present in the codebase.
- **Strict TypeScript**: Avoid `any`. Use correct type assertions and shared typings.
- **Conciseness**: Only provide the necessary code. Do not remove existing comments unless instructed.

---
**Agent Prompt Hook:**
*"I am working in the Nexus Platform monorepo. Please ensure my NestJS backend code uses TypeORM, my Next.js frontend code uses the `ds-*` Tailwind classes, and shared types are put in `@repo/types`."*
