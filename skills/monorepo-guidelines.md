# Monorepo & Shared Packages Guidelines

> ⚠️ **MANDATORY RULES FOR ALL DEVELOPERS AND AI AGENTS**
> This repository is structured as a Monorepo orchestrated by **Turborepo** (`turbo`) and managed via **workspaces**. You must strictly adhere to the guidelines below for importing, sharing code, and running workspace commands.

---

## 1. Monorepo Overview & Architecture

A monorepo holds multiple applications (`apps/`) and libraries (`packages/`) in a single repository.
*   **No Cross-App Imports:** `apps/web` must **NEVER** import anything from `apps/api` directly (and vice versa). They must behave as completely isolated applications.
*   **Shared Packages as Bridges:** Any code, config, or type definition that needs to be shared between `apps/api` and `apps/web` must reside inside the `packages/` directory and be imported as a dependency.

---

## 2. Using `@repo/types` (Shared Types Package)

The `@repo/types` package (`packages/types`) is the single source of truth for all data structures that cross the network boundary between Backend and Frontend.

*   **When to add types to `@repo/types`:**
    *   API Request bodies (e.g., `CreateUserRequest`, `UpdateUserRequest`).
    *   API Query parameters (e.g., `UserSearchParams`).
    *   API Response payloads / Model representations (e.g., `IUser`, `IRole`).
*   **How to add/update types:**
    1.  Create or modify the file in `packages/types/src/` (e.g., `packages/types/src/users.ts`).
    2.  Ensure it is exported in the main index file: `packages/types/src/index.ts`.
    3.  Save the changes.
*   **How to consume types:**
    *   **Backend (`apps/api`):** Import standard DTO properties or request shapes to implement controllers and service payloads.
    *   **Frontend (`apps/web`):** Import interface definitions and search query types to feed to React Query hooks, services, and forms.
    *   *Example import:*
        ```typescript
        import type { IUser, CreateUserRequest } from "@repo/types";
        ```

---

## 3. Workspace Dependency Management

Since the project uses workspace dependencies, you must install packages correctly so they are mapped to the correct folder rather than the root node_modules incorrectly.

*   **Installing a dependency to a specific App:**
    *   *To add to API:* `npm install <package-name> -w apps/api` (or using pnpm/yarn equivalents if configured).
    *   *To add to Web:* `npm install <package-name> -w apps/web`
*   **Installing a devDependency to a specific App:**
    *   `npm install -D <package-name> -w apps/api`
*   **Workspace Package Dependency:**
    *   Both `apps/api` and `apps/web` depend on `@repo/types` by declaring `"@repo/types": "*"` in their respective `package.json` files. If you add a new package in `packages/`, you must register it as a workspace dependency before importing it.

---

## 4. Turborepo Tasks & Execution

Turborepo orchestrates commands across workspaces in parallel, utilizing caching to skip unchanged tasks.

*   **Run Development Servers (all apps):**
    ```bash
    npm run dev
    ```
    This starts NestJS watch mode and Next.js dev server concurrently.
*   **Run Development Server for one App only:**
    ```bash
    npm run dev --filter api
    # or
    npm run dev --filter web
    ```
*   **Build the entire Monorepo:**
    ```bash
    npm run build
    ```
*   **Linting the workspaces:**
    ```bash
    npm run lint
    ```
