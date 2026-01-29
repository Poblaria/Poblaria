Technology Environment – Poblaria
Overview

Poblaria is a web platform that connects people with housing and job opportunities in rural areas.
The tech stack was chosen for maintainability, community support, open-source availability, and future scalability.
Technologies and Libraries
Frontend

    Framework: Next.js (React-based)
    Language: TypeScript
    Styling: Tailwind CSS
    Mapping: Leaflet
    Routing: File-system based with Server-Side Rendering (SSR)

Backend

    Framework: AdonisJS (Node.js MVC)
    Language: TypeScript
    ORM: Lucid
    Validation: VineJS validators
    API: RESTful (GraphQL under consideration)

Mobile (future phase)

    Framework: React Native (planned for cross-platform compatibility)

Infrastructure & Deployment

    Frontend Hosting: 📌 Under evaluation (Vercel or Netlify)
    Backend Hosting: 📌 Under evaluation (Railway, Render, or Supabase Functions)
    Database Hosting: Supabase PostgreSQL or Railway PostgreSQL
    CI/CD: GitHub Actions configured for build/test automation

Authentication

📌 Authentication strategy currently under evaluation.
Options being considered:

    Supabase Auth
    Clerk
    Custom JWT implementation via AdonisJS

Real-Time Capabilities

📌 Real-time features are optional and currently under evaluation.

Potential options:

    Supabase Realtime Channels
    WebSockets (via AdonisJS)
    Pusher or Ably

Hardware Requirements
Development

    Minimum: 8 GB RAM
    Software: Node.js 18+, Docker, PostgreSQL (local or cloud)

Production (Minimum Hosting Specs)

    Backend: 1 vCPU / 2 GB RAM
    PostgreSQL: with automated backup support

Justification

All selected technologies are:

    Open-source or offer generous free tiers
    Actively maintained and well-documented
    Aligned with the team’s experience and development speed
    Scalable for future needs (mobile app, real-time updates, etc.)

Frontend Justification

1. Next.js (React-based)

   Performance & SEO: Server-Side Rendering (SSR) improves SEO for public job/housing listings, critical for attracting users to rural opportunities.
   Scalability: Built-in API routes simplify future feature expansion (e.g., integrating payment systems).
   Ecosystem: Large React community ensures long-term support, abundant libraries, and hiring ease.
   Unified Codebase: File-system routing reduces boilerplate, streamlining collaboration.

2. TypeScript

   Maintainability: Catches type-related errors early, crucial for a distributed team working on housing/job data.
   Consistency: Shared types between frontend and backend reduce integration risks.

3. Tailwind CSS

   Rapid Development: Utility-first classes accelerate UI iteration for dynamic job/housing listings.
   Theming: Easy to enforce design consistency across rural/urban partner pages.

4. Leaflet

   Cost-Effective: Open-source mapping avoids Google Maps API fees.
   Customization: Geared for rural areas with offline-first potential (e.g., low-connectivity regions).

Here’s a revised and corrected version of your backend justification, incorporating your feedback and clarifying AdonisJS’s architecture and GraphQL integration:
Backend Justification

1. AdonisJS (Node.js Framework)

   Flexible Structure:
   AdonisJS it’s streamlined for API development by focusing on:
   Models (data structure for job/housing listings).
   Controllers (business logic for user authentication, job posting workflows).
   Routes (RESTful endpoints) without requiring a "View" layer.
   Batteries-Included Tooling:
   Built-in modules (Lucid ORM, VineJS validation, and Auth) reduce dependency sprawl, accelerating development.
   Avoids fragmented third-party libraries, ensuring consistency and security.
   TypeScript Native:
   End-to-end type safety aligns with your Next.js frontend, minimizing integration errors in critical workflows (e.g., housing application submissions).

2. RESTful API (Core) + GraphQL (Optional Future Layer)

   REST for Simplicity:
   Widely understood by developers and rural partners, reducing onboarding friction.
   Stateless design simplifies caching and scaling for high-traffic job/housing listings.
   GraphQL as a Strategic Optional Upgrade:
   Mobile Optimization: GraphQL’s flexible queries reduce payload sizes for React Native apps in low-bandwidth rural areas.
   Modular Integration: Can coexist with REST (e.g., REST for core features, GraphQL for mobile-specific queries) using tools like Apollo Server or AdonisJS plugins.

Infrastructure & Deployment

1. Vercel/Netlify (Frontend)

   Next.js Optimization: Vercel offers zero-config SSR/ISR for dynamic housing listings.
   Global CDN: Fast loading for rural users with limited bandwidth.

2. Railway/Render (Backend)

   Scalability: Auto-scaling supports traffic spikes (e.g., seasonal job postings).
   Cost-Effective: Generous free tiers align with early-stage budgets.

3. Supabase PostgreSQL

   Auth Integration: Simplifies authentication if Supabase Auth is chosen.
   Realtime Potential: Built-in PostgreSQL listeners enable real-time job alerts without third-party services.

4. GitHub Actions

   Automated Testing: Enforce code quality as rural partners submit job/housing data.
   Team Alignment: Tight integration with GitHub reduces CI/CD complexity.

Authentication Options

Supabase Auth:

    Unified Stack: Reduces vendor sprawl if already using Supabase DB.
    Social Logins: Critical for rural users who may lack corporate emails.

Clerk:

    Pre-Built UI: Accelerates onboarding for housing seekers.
    DevOps Simplicity: Managed service reduces security overhead.

Custom JWT (AdonisJS):

    Full Control: Ideal if rural partners require niche permission workflows.

Real-Time Considerations

Supabase Realtime:

    Cost Efficiency: Free tier suffices for early-stage notifications (e.g., new job postings, new house offer).
    PostgreSQL Synergy: Leverages existing database without new infrastructure.

AdonisJS WebSockets:

    Self-Hosted: Avoids third-party costs if real-time features are minimal.

Mobile (React Native)

    Code Reuse: Leverage React/TypeScript skills from the web team.
    Offline Support: Critical for rural users with unstable connectivity (e.g., cached job listings).

Key Strategic Wins

    Cost Control: Open-source stack + free tiers (Supabase, Vercel) minimize upfront costs.
    Team Velocity: TypeScript across frontend/backend reduces context switching.
    Scalability: Next.js + AdonisJS + PostgreSQL are battle-tested for high-traffic job/housing platforms.
    Rural Resilience: Offline-first potential (Leaflet, React Native) aligns with user needs.
