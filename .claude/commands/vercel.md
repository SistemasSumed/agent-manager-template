---
description: Build, optimize, and deploy to Vercel using Vercel Agent Skills
---

Manage Vercel deployment, React/Next.js optimizations, and configuration using official Vercel Agent Skills.

Skills used:
- `deploy-to-vercel`
- `vercel-optimize`
- `vercel-cli-with-tokens`
- `react-best-practices`
- `web-design-guidelines`

Steps:
1. **Pre-deploy audit**:
   - Run typecheck: `npm run typecheck`
   - Run tests: `npm test`
   - Run linter: `npm run lint`
2. **Vercel optimization & configuration**:
   - Verify `vercel.json` exists and is correctly configured
   - Check framework build outputs and caching strategies (`vercel-optimize`)
   - Verify environment variables are configured (never commit `.env`)
3. **Deployment**:
   - Preview deployment: `npx vercel`
   - Production deployment: `npx vercel --prod`
4. **Post-deploy verification**:
   - Verify edge functions, routes, and response headers
   - Check performance metrics and bundle sizes

$ARGUMENTS
