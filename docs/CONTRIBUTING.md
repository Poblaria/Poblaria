# Contributing

## Branch Naming Conventions

To ensure clarity and structure, follow these guidelines when naming branches:

### General Format

```
<type>/[optional-scope]/<short-description>
```

### Types of Branches

- **main**: The primary branch containing production-ready code.
- **dev**: The primary development branch containing pre-production code.
- A branch type can be either a _Conventional Commit_ type (cf. [Commit Message Conventions](#commit-message-conventions)) (except `feat` (replaced by `feature`), `chore` and `style` (both for minor changes, no need to do a branch)), or:
    - **`feature`**: For developing new features.
    - **`hotfix`**: For urgent fixes to production.

### Optional Scope

The optional scope is either `backend` or `frontend`.
Whether it concerns both or something else, there is no need to specify it.

### Branch Naming Rules

- Use kebab-case: lowercase letters and hyphens (`-`) to separate words.
- Do not use special characters or spaces.
- Keep names concise but descriptive.

### Example

```
feature/backend/user-authentication
```

## Commit Message Conventions

Follow the [Conventional Commits](https://conventionalcommits.org) format for clear and meaningful commit messages.

### General Format

```
<type>([optional-scope]): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat**: A new feature.
    - Example: `feat(backend): add user authentication`
- **fix**: A bugfix.
    - Example: `fix(frontend-ui): correct button alignment`
- **build**: Build changes.
    - Example: `build(backend): add X library`
- **ci**: CI/CD changes.
    - Example: `ci(tests): add GitHub Actions workflow for tests`
- **perf**: Performance improvements.
    - Example: `perf(backend): reduce response time`
- **test**: Adding or updating tests.
    - Example: `test(frontend): add unit tests for header component`
- **docs**: Documentation changes.
    - Example: `docs(readme): update authors`
- **refactor**: Code refactoring without changing functionality.
    - Example: `refactor(backend): separate code in multiple functions`
- **style**: Code style changes (formatting, re-indentation, etc.) with no functional effect.
    - Example: `style: format files with Prettier`
- **chore**: Miscellaneous tasks (e.g., editing the gitignore).
    - Example: `chore(gitignore): ignore build directory`

### Commit Messages Rules

1. Write messages in the imperative mood (e.g., "add" instead of "added").
2. Separate the description from the body (and the body from the footer(s)) with an empty line.
3. The optional scope. It is an additional identifier to specify the area of the codebase affected by the branch.\
  As its name suggests, it is optional, but it is highly recommended to use it when possible and as often as possible.\
  It should be formatted following these rules:
   - Use kebab-case: lowercase letters and hyphens (`-`) to separate words.
   - Start with the broader part of the codebase and go to the more specific one.
   - It should be formatted as is: `<part>-<subsection>-<subsubsection>...`
       - Where `<part>` is either `backend` or `frontend` (or nothing: if the commit concerns both parts, prefix can be omitted (concerns should be separated into different commits if possible, so this should be rare)).
       - `<subsection>`, `<subsubsection>`, etc. are more specific areas of the codebase. For example, it can be a specific folder, module, or feature.
       - There is no limit to the number of subsection, but keep it reasonable.
   - Examples: `backend`, `frontend-ui`, `backend-database`, `frontend-api`, `backend-auth-service`, `backend-models`, etc.

## Pull Request Conventions/Rules

1. Avoid default PR name (generally the branch name with slashes replaced by spaces). The simplest is to name it following commit message conventions (without body or footer for sure).
2. Request for people to review (add them to reviewers).
3. Wait for the PR to be reviewed.
4. Make changes if necessary.
5. Merge the PR (you can use the default commit name, or customize it, or use a _Conventional Commits_ one).
6. Delete the branch if it is no longer useful.
