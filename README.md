# Digital Menu SaaS

## Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm --filter @digitalmenu/api prisma:migrate
pnpm --filter @digitalmenu/api prisma:seed
pnpm dev:api
pnpm dev:web
pnpm dev:mobile
```

## Services

- API: `http://localhost:4000`
- Web: `http://localhost:5173`
- Swagger: `http://localhost:4000/docs`

## Workspace structure

- `apps/api`: NestJS API
- `apps/web`: React web app
- `apps/mobile`: Expo mobile app
- `packages/shared`: Shared types and validation
