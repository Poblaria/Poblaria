# Technology Environment – Poblaria

## Overview

Poblaria is a web platform that connects people with housing and job opportunities in rural areas.  
The tech stack was chosen for maintainability, community support, open-source availability, and future scalability.

---

## Technologies and Libraries

### Frontend

- **Framework**: Next.js (React-based)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet
- **Routing**: File-system based with Server-Side Rendering (SSR)

### Backend

- **Framework**: AdonisJS (Node.js MVC)
- **Language**: TypeScript
- **ORM**: Lucid
- **Validation**: VineJS validators
- **API**: RESTful (GraphQL under consideration)

### Mobile (future phase)

- **Framework**: React Native (planned for cross-platform compatibility)

---

## Infrastructure & Deployment

- **Frontend Hosting**: 📌 Under evaluation (Vercel or Netlify)
- **Backend Hosting**: 📌 Under evaluation (Railway, Render, or Supabase Functions)
- **Database Hosting**: Supabase PostgreSQL or Railway PostgreSQL
- **CI/CD**: GitHub Actions configured for build/test automation

---

## Authentication

📌 Authentication strategy currently under evaluation.  
Options being considered:
- Supabase Auth
- Clerk
- Custom JWT implementation via AdonisJS

---

## Real-Time Capabilities

📌 Real-time features are optional and currently under evaluation.

Potential options:
- Supabase Realtime Channels
- WebSockets (via AdonisJS)
- Pusher or Ably

---

## Hardware Requirements

### Development

- Minimum: 8 GB RAM
- Software: Node.js 18+, Docker, PostgreSQL (local or cloud)

### Production (Minimum Hosting Specs)

- Backend: 1 vCPU / 2 GB RAM
- PostgreSQL: with automated backup support

---

## Justification

All selected technologies are:

- Open-source or offer generous free tiers
- Actively maintained and well-documented
- Aligned with the team’s experience and development speed
- Scalable for future needs (mobile app, real-time updates, etc.)