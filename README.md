pnpm dev

pnpm dev --filter api

pnpm dev --filter web

# Nexus Platform - Workspace Guidelines & Project Overview

This document provides a comprehensive overview of the **Nexus Platform** monorepo, its code layout, the libraries used, and the development rules to follow.

## 1. Monorepo Architecture

The project is structured as a monorepo managed by **pnpm workspaces** and **Turborepo** (`turbo`). 

### Directory Layout
- `apps/api`: The backend API application.
- `apps/web`: The frontend web application.
- `packages/`: Shared internal libraries and configurations.
  - `eslint-config`: Shared ESLint configurations.
  - `types`: Shared TypeScript interfaces and types.
  - `typescript-config`: Shared `tsconfig.json` bases.

### Commands
- `pnpm dev`: Runs `turbo run dev` to start all applications in development mode.
- `pnpm build`: Runs `turbo run build` to build all applications.
- `pnpm lint`: Runs `turbo run lint`.

---

## 2. Backend: `apps/api` (NestJS)

The backend is built with **NestJS**, following a modular architecture.

### Libraries & Tech Stack
- **Framework**: NestJS (`@nestjs/common`, `@nestjs/core`, etc.)
- **Database**: SQL Server (`mssql`, `msnodesqlv8`) accessed via **TypeORM** (`@nestjs/typeorm`, `typeorm`).
- **Language**: TypeScript.

### Code Layout Rules
- **Modules**: Group features into logical domains inside `src/modules/` (e.g., `users`, `auth`).
- **Core & Common**: Use `src/core/` for core application logic and `src/common/` for shared guards, interceptors, decorators, and filters.
- **Config & Database**: Store configurations and database connections in `src/config/` and `src/database/`.
- **Types**: Use the shared `@repo/types` package for DTOs or interfaces shared with the frontend.

---

## 3. Frontend: `apps/web` (Next.js)

The frontend is a robust Next.js application designed with a specific visual system.

### Libraries & Tech Stack
- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`.
- **UI Components**: 
  - Radix UI primitives (`@radix-ui/react-*`).
  - Base UI (`@base-ui/react`).
  - Shadcn UI components.
  - Icons via `lucide-react`.
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`).
- **Data Fetching**: React Query (`@tanstack/react-query`).

### Code Layout Rules
- **Routing**: Follow Next.js App Router conventions inside the `app/` directory.
- **Components**: Place shared components in `components/`. Use Shadcn UI generated components here.
- **State & Hooks**: Global state logic goes in `store/`, and custom React hooks in `hooks/`.
- **Services**: API interaction logic and React Query hooks go in `services/`.
- **Types & Constants**: Local typings in `types/` and static constants in `constants/`.

### Design System Rules
The frontend strictly adheres to a **Starbucks-inspired design system** (see `DESIGN.md` for full details).
- **Colors**: Do not use arbitrary hex codes. Rely on the defined theme tokens in `globals.css` (e.g., Starbucks Green, Green Accent, House Green, Neutral Warm canvas).
- **Typography**: Uses `SoDoSans` with strict `-0.01em` letter spacing.
- **UI Primitives**: Buttons must always be 50px full-pills. Apply `transform: scale(0.95)` for active states.
- **Tailwind Shared Classes**: Always use the predefined `ds-*` utility classes for standard elements (e.g., `ds-btn-primary-pill`, `ds-text-body`, `ds-auth-input`) rather than composing long utility strings manually.

---

## 4. General Development Rules

1. **Shared Types**: Any data structure, interface, or DTO that needs to be accessed by both the `api` and `web` apps MUST be defined in the `packages/types` directory to ensure type safety across the monorepo.
2. **Consistency**: Follow the existing patterns. If a feature uses React Query in the frontend, do not introduce a different fetching mechanism.
3. **Environment Variables**: Never commit `.env` files. Provide `.env.example` templates.
4. **Linting**: Ensure code passes the shared ESLint configurations before committing.
