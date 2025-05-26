# Deployment Guide – Poblaria

## Repository Setup

The project is hosted under the `Poblaria` GitHub organization and follows a standard Git branching strategy.

### Branch Strategy

We follow a simplified Git Flow strategy:
- `main`: Stable production code.
- `develop`: Ongoing integration of features.
- `feature/*`: New functionalities branched from `develop`.

---

## Stages

- **Build**: Ensure the project compiles and dependencies are installed.
- **Test**: Run all defined tests for both frontend and backend.
- **Deploy**: Deployment instructions are located in their respective modules.

### Frontend
Deployment details and commands are documented in [`frontend/README.md`](../frontend/README.md).

### Backend
Deployment instructions using Docker Compose are available in [`backend/README.md`](../backend/README.md).

---

## CI/CD Pipeline

1. We are in the process of setting up a GitHub Actions pipeline to automatically:

- Build the frontend and backend
- Run automated tests
- Deploy the application to the chosen hosting platforms

This pipeline will be triggered on:
- Pushes to `main` and `develop`
- Pull requests targeting `main` and `develop`

2. Once ready, the CI/CD workflow file will be located at `.github/workflows/ci-cd.yml`.

### Triggers

- Pushes to `main` and `develop`
- Pull requests targeting `main` or `develop`

---

## Repository Mirroring to Epitech

To ensure pedagogical visibility:

- All branches are mirrored automatically to an Epitech GitHub repository.
- Branches such as `main`, `develop`, and `feature/*` are preserved.
- This setup allows mentors to follow the project's progress in real-time.