# Best Practices & Developer Guidelines

> **MANDATORY RULES FOR ALL DEVELOPERS AND AI AGENTS**
> Standardized guidelines and industry best practices followed in this workspace to ensure performance, security, and project stability.

---

## 1. Backend Best Practices (NestJS & TypeORM)

*   **Database Query Optimization:**
    *   *No In-Memory Filtering:* Always run filters inside SQL queries (using `where`, `Like`, or `Raw` query options) instead of loading the entire dataset into memory and using JavaScript arrays' `.filter()` method.
    *   *Vietnamese Accent-Insensitive Search:* Use the `accentInsensitiveLike` helper to apply `COLLATE SQL_Latin1_General_CP1_CI_AI` at the database level.
    *   *Index Utilization:* Avoid queries that trigger full table scans. Ensure frequently queried columns (such as `user_name`, `email`) and foreign keys have appropriate database indexes.
*   **Secure Password Handling:**
    *   Always hash passwords using a secure one-way hashing algorithm (e.g., `bcrypt` with a salt factor) before saving them to the database.
    *   Never return `passwordHash` in API responses. Utilize `class-transformer` or manually remove the field (`delete user.passwordHash`) before returning data.
*   **Query Parameters and DTOs:**
    *   Since HTTP query parameters are parsed as strings, use `@Type(() => Number)` or `@Transform` to safely cast numeric and boolean types before applying class-validator checks.

---

## 2. Frontend Best Practices (Next.js & React Query)

*   **State Management & Data Fetching:**
    *   Use **React Query** (`@tanstack/react-query`) for all API communications, data caching, query mutations, and server-side state synchronization.
    *   Use **Redux Toolkit** strictly for global client-side UI states (e.g., toggling sidebars, language, or themes). Do not store API responses or data cache in Redux.
    *   *Query Keys:* Manage and centralize cache keys in a dedicated `query-keys.ts` file to avoid duplicates and ensure precise cache invalidation.
*   **Design System Compliance:**
    *   The frontend strictly adheres to a **Starbucks-inspired design system**. Theme tokens for colors, spacing, and typography are defined in `globals.css`.
    *   **Do not write arbitrary hex codes** (e.g., `bg-[#006241]`) or introduce random border radii.
    *   Use the predefined utility classes starting with `ds-` (e.g., `ds-btn-primary-pill`, `ds-surface-card`, `ds-text-heading`).
    *   All standard buttons must be **50px pill-shaped** with `active:scale-95` micro-animation.

---

## 3. Git & Workflows

*   **Conventional Commits:**
    *   Format commit messages using Conventional Commits guidelines:
        *   `feat: <description>`: For new features.
        *   `fix: <description>`: For bug fixes.
        *   `refactor: <description>`: For performance improvements or code restructuring.
        *   `docs: <description>`: For updating documentation files.
*   **Pre-commit Checklist:**
    *   Verify the project compiles without TypeScript errors by running `npx tsc --noEmit`.
    *   Run `npm run lint` to fix formatting and code style issues before pushing code.
