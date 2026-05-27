# Code Organization & Structure Guidelines

> **MANDATORY RULES FOR ALL DEVELOPERS AND AI AGENTS**
> The codebase is organized as a Turborepo monorepo. Do not alter the directory layout or place files in unauthorized directories.

---

## 1. Monorepo Workspaces Layout

The root directory is divided into two primary workspaces:
*   **`apps/`**: Contains runnable applications.
    *   `apps/api`: NestJS backend application.
    *   `apps/web`: Next.js (App Router) frontend application.
*   **`packages/`**: Contains shared configuration and code modules.
    *   `packages/types`: Shared TypeScript interfaces and types across FE and BE.
    *   `packages/eslint-config`: Shared ESLint rules.
    *   `packages/typescript-config`: Shared `tsconfig.json` configurations.

---

## 2. Backend Directory Layout (`apps/api`)

The backend is built using NestJS and organized into modular domain features in `src/`:

```
src/
├── common/             # Shared code and utilities across modules
│   ├── decorators/     # Custom decorators (e.g., @GetCurrentUser)
│   ├── entities/       # BaseEntity (declares id, created_at, updated_at, etc.)
│   ├── filters/        # Global Exception Filters for formatting errors
│   ├── interceptors/   # Interceptors for formatting API responses
│   └── utils/          # Shared helper functions (pagination, query helpers)
├── config/             # Configuration files (database, JWT, etc.)
├── database/           # Seeds and Migrations
├── modules/            # Business feature domains (Mandatory)
│   ├── users/          # Users Feature module
│   │   ├── dto/        # Input validation DTOs
│   │   ├── entities/   # TypeORM entities mapping to database tables
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── roles/          # Roles module
│   └── permissions/    # Permissions module
└── main.ts             # Application entrypoint
```

*Rule:* Every new feature or domain logic must be created as a module folder inside `src/modules/`. Do not place business logic files outside this directory.

---

## 3. Frontend Directory Layout (`apps/web`)

The frontend is built using Next.js App Router. The code in `app/` and related folders is structured as follows:

```
app/                    # App Router pages and layouts
├── (admin)/admin/      # Admin dashboard pages
│   ├── users/
│   │   ├── page.tsx    # User list view page
│   │   └── create-or-edit-user-panel.tsx # Local helper component
│   └── products/
components/             # Shared UI components
├── shared/common/      # Standardized data table, filters, and form helpers
└── ui/                 # Atomic design primitives (Shadcn/Radix components)
hooks/                  # Custom React hooks
services/               # API clients, routes, and React Query custom hooks
types/                  # Frontend-only typescript declarations
```

*Rules:*
*   Keep page files (`page.tsx`) focused on page layout and main view logic. Extract complex panels, modals, and forms into separate sibling files (e.g., `create-or-edit-user-panel.tsx` next to `page.tsx`).
*   Do not create custom UI elements if matching components already exist in `components/shared/common` or `components/ui`.

---

## 4. Naming Conventions

*   **Files & Folders:** Use `kebab-case` (lowercase with hyphens).
    *   *Correct:* `user-role.entity.ts`, `create-user.dto.ts`, `query.util.ts`.
    *   *Incorrect:* `userRole.entity.ts`, `CreateUser.dto.ts`.
*   **Classes & Components:** Use `PascalCase`.
    *   *Correct:* `UserService`, `UserController`, `UserRole`, `CommonTable`.
*   **Variables, Functions, Properties:** Use `camelCase`.
    *   *Correct:* `userId`, `getUserPermissions()`, `isDeleted`.
*   **Database Tables & Columns:** Use `snake_case` in lowercase to match SQL Server conventions.
    *   *Correct:* `@Entity({ name: 'user_roles' })`, `@Column({ name: 'user_id' })`.
