# MediCare Hospital Management System — Frontend

## Stack
- React 19 + Vite
- React Router
- Tailwind CSS v4
- Axios
- Bootstrap retained for legacy protected screens during the migration

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Important

The frontend keeps the existing backend API contract and authentication flow. The redesign changes the presentation, component organization and shared healthcare theme; it does not change Spring Boot endpoints or database code.

`VITE_API_BASE_URL` in `.env` points to the configured backend deployment. Update it only if your backend URL changes.
