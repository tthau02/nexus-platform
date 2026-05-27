# Nexus Platform - Workspace Guidelines & Project Overview

> ⚠️ **CRITICAL INSTRUCTION FOR AI AGENTS (Claude, Cursor, Copilot, etc.)**
> Before writing any code, modifying files, or answering questions, you **MUST** read [AI_AGENT_SKILLS.md](./AI_AGENT_SKILLS.md) and the files in the [skills/](./skills/) directory first. These files contain strict guidelines regarding coding standards, monorepo code structure, and development best practices.

---

This document provides a comprehensive overview of the **Nexus Platform** monorepo, its code layout, the libraries used, and the development rules to follow.

## 1. Monorepo Architecture

The project is structured as a monorepo managed by **npm workspaces** and **Turborepo** (`turbo`). 

### Directory Layout
- `apps/api`: The backend API application.
- `apps/web`: The frontend web application.
- `packages/`: Shared internal libraries and configurations.
  - `eslint-config`: Shared ESLint configurations.
  - `types`: Shared TypeScript interfaces and types.
  - `typescript-config`: Shared `tsconfig.json` bases.

### Commands
- `npm run dev`: Runs `turbo run dev` to start all applications in development mode.
- `npm run build`: Runs `turbo run build` to build all applications.
- `npm run lint`: Runs `turbo run lint`.

---

## 2. Backend: `apps/api` (NestJS)

The backend is built with **NestJS**, following a modular architecture.

### Libraries & Tech Stack
- **Framework**: NestJS (`@nestjs/common`, `@nestjs/core`, etc.)
- **Database**: SQL Server (`mssql`, `msnodesqlv8`) accessed via **TypeORM** (`@nestjs/typeorm`, `typeorm`).
- **Language**: TypeScript.

### Code Layout Rules
- **Modules**: Group features into logical domains inside `src/modules/` (e.g., `users`, `auth`).
- **Core & Common**: Use `src/common/` for shared guards, interceptors, decorators, filters, and query utils (like `query.util.ts`).
- **Types**: Use the shared `@repo/types` package for DTOs or interfaces shared with the frontend.

---

## 3. Frontend: `apps/web` (Next.js)

The frontend is a Next.js application designed with a specific visual system.

### Libraries & Tech Stack
- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`.
- **UI Components**: Radix UI primitives, Base UI, Shadcn UI, Lucide icons.
- **State Management**: Redux Toolkit (for UI/client state).
- **Data Fetching**: React Query (for async server state).

### Design System Rules
The frontend strictly adheres to a **Starbucks-inspired design system** (see `DESIGN.md` for full details).
- **Colors**: Rely on the defined theme tokens in `globals.css` (e.g., Starbucks Green, Neutral Warm canvas).
- **UI Primitives**: Buttons must always be 50px full-pills with `active:scale-95`.
- **Tailwind Shared Classes**: Always use the predefined `ds-*` utility classes for standard elements (e.g., `ds-btn-primary-pill`, `ds-surface-card`) rather than composing long utility strings manually.

---

## 4. General Development Rules

1. **Shared Types**: Any data structure, interface, or DTO that needs to be accessed by both the `api` and `web` apps MUST be defined in the `packages/types` directory.
2. **Consistency**: Follow the existing patterns. Check the [skills/](./skills/) directory for detailed coding and structure rules.
3. **Environment Variables**: Never commit `.env` files. Provide `.env.example` templates.
4. **Linting**: Ensure code passes `npm run lint` and `npx tsc --noEmit` before committing.
