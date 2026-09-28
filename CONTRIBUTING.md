# Contributing Guidelines

Thank you for your interest in contributing to this project. To maintain high code quality and software engineering discipline, please follow these guidelines.

---

## 1. Development Workflow

1. **Fork or Branch**: Create a feature branch off `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Local Environment**:
   ```bash
   cp .env.example .env.local
   ```
4. **Run Local Server**:
   ```bash
   npm run dev
   ```

---

## 2. Pre-Commit Quality Checks

Before submitting any Pull Request, ensure that all local automated checks pass with zero errors:

```bash
# 1. Static code analysis
npm run lint

# 2. Strict TypeScript type check
npm run typecheck

# 3. Production build compilation
npm run build
```

---

## 3. Commit Message Standards

This repository follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature or capability
- `fix:` A bug fix
- `docs:` Documentation-only changes
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

Example:
```bash
git commit -m "feat(studio): add real-time validation preview for project metadata"
```

---

## 4. Pull Request Process

1. Provide a clear summary of the change in your PR description.
2. Link any related issues.
3. Ensure CI checks pass on GitHub Actions.
