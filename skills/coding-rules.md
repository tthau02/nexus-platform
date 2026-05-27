# Coding Rules & Clean Code Standards

> ⚠️ **MANDATORY RULES FOR ALL DEVELOPERS AND AI AGENTS**
> Every code change in this workspace must strictly adhere to the clean code guidelines and coding rules defined below.

---

## 1. Clean Code & Messy Code Prevention

*   **DRY (Don't Repeat Yourself):**
    *   Before writing any utility function, date formatter, paginator, or permission checker, verify if a similar helper already exists in `src/common/utils` or `src/common/interceptors`.
    *   Reuse existing code. If creating a new utility, design it as a generic function so it can be easily shared across other modules.
*   **Remove Dead Code:**
    *   Unused variables, empty functions, and commented-out code blocks must be deleted entirely. Do not keep old code commented out—rely on Git history.
    *   Ensure all `console.log` statements, `debugger` lines, and temporary debugging blocks are removed before submitting code.
*   **Consistent Formatting:**
    *   Follow the workspace's ESLint and Prettier configurations.
    *   Sort imports in the following order:
        1. Third-party packages (React, NestJS, Lucide, etc.)
        2. Workspace packages (e.g., `@repo/types`, `@repo/eslint-config`)
        3. Relative path imports from parent directories (`../../`)
        4. Relative path imports from the current directory (`./`)

---

## 2. Strict TypeScript Enforcement

*   **Avoid `any`:**
    *   Do not use `any`. Utilize concrete types, type assertions, or generic types (`<T>`) when designing shared functions.
*   **Boundary Data Typing:**
    *   Any data structure that crosses the API boundary (Request payloads, Response payloads, DTOs) **must** utilize the shared types defined in `packages/types`.
    *   Do not redeclare local interfaces or types in either frontend or backend for models that already exist in `@repo/types`.

---

## 3. Software Architecture Principles (SOLID & Clean Architecture)

The workspace follows industry-standard design principles:

*   **Single Responsibility Principle (SRP):**
    *   Each class, module, and file should have one, and only one, reason to change.
    *   *Controllers:* Responsible only for handling incoming HTTP requests, validating input data, and returning the response. They must not contain business logic or execute database queries directly.
    *   *Services:* Responsible for containing and executing the core business logic.
    *   *Repositories/Entities:* Responsible for database interactions and defining schema mappings.
*   **Dependency Injection (DI):**
    *   In NestJS, manage dependencies via Constructor Injection. Do not instantiate services manually using `new Service()`.

---

## 4. Error Handling & Input Validation

*   **Input Validation:**
    *   All client-submitted data must be validated using Class DTOs paired with `class-validator` decorators (e.g., `@IsString`, `@IsEmail`, `@MinLength`).
    *   Correctly parse incoming query parameters. Since HTTP query parameters are strings, use `@Transform` to safely parse values like `"true"`/`"false"` into actual booleans before validation.
*   **Uniform API Responses:**
    *   Always format API responses using the common API response utility (`ApiResponse.success`, `ApiResponse.created`).
    *   Throw built-in NestJS exceptions (e.g., `NotFoundException`, `ForbiddenException`, `BadRequestException`) to let the global exception filter format error responses uniformly.
