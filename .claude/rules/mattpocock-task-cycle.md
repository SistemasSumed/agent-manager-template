# Ciclo de tareas — Skills mattpocock (obligatorio)

**Aplicabilidad:** Toda tarea nueva, feature, bugfix no trivial, refactor con impacto, o trabajo bajo el pipeline de 7 fases.

**Instalación:** `.agents/skills/` vía `pnpm run skills:install` o `claudio init` / `claudio evoluciona`.

**Config del repo:** `docs/agents/` + `CONTEXT.md` en la raíz.

---

## Regla principal

Antes de planificar o escribir código para una tarea, el agente **DEBE** leer el skill indicado en la tabla (archivo bajo `.agents/skills/<nombre>/SKILL.md`) y seguir su proceso. No es opcional ni “si acordás”.

Si el skill no está en disco, ejecutá `pnpm run skills:install` y reintentá.

---

## Fase 0 — Arranque (siempre)

| Orden | Skill | Cuándo |
| ----- | ----- | ------ |
| 1 | `wayfinder` / `zoom-out` | Exploración inicial del código y mapeo de dependencias |
| 2 | `grill-with-docs` / `grill-me` | Requisitos ambiguos, clarificación de arquitectura y dominio |
| 3 | `to-spec` / `to-prd` | Especificación formal y PRD para features medianas o grandes |
| 4 | `to-tickets` / `to-issues` | Descomposición de tareas en issues o tickets atómicos |
| 5 | `triage` | Issue entrante sin clasificar |

Tras `to-spec`, registrá la feature en `pipeline-state.json` si aplica.

---

## Pipeline de 7 fases → skills

| Fase | Equipo | Skills obligatorios | Skills Vercel & Template (`.claude/skills/`) |
| ---- | ------ | ------------------- | --------------------------------------------- |
| 1–2 | Dominio / Diseño | `domain-modeling`, `grill-with-docs`, `prototype` | `web-design-guidelines`, `composition-patterns`, `skill-agent-design` |
| 3 | Backend & Arquitectura | `codebase-design`, `improve-codebase-architecture`, `tdd` | `skill-api-design`, `skill-hermes-levels` |
| 4 | Seguridad | `security-auditor` | `skill-code-review`, `writing-guidelines` |
| 5 | Develop | `implement`, `tdd`, `review` | `react-best-practices`, `react-view-transitions`, `skill-refactoring`, `skill-git-workflow` |
| 6 | QA | `diagnosing-bugs` / `diagnose`, `qa` | `skill-testing`, `auto-audit-loop` |
| 6.5 | DevOps | `deploy-to-vercel`, `vercel-optimize` | `vercel-cli-with-tokens`, agente `devops-infra` |
| 7 | GO/NO-GO | `handoff` / `claude-handoff` | `audit-pipeline`, `lifecycle-orchestrator` |

---

## Durante implementación

| Situación | Skill |
| --------- | ----- |
| Bug o regresión | `diagnosing-bugs` (o `diagnose`) |
| Tests antes/durante código | `tdd` |
| Diseño y arquitectura de módulos | `codebase-design`, `improve-codebase-architecture` |
| Componentes React y Next.js | `react-best-practices`, `composition-patterns` |
| Despliegue y optimización | `deploy-to-vercel`, `vercel-optimize` |
| Dividir trabajo en issues | `to-tickets` (o `to-issues`) |
| Contexto de sesión larga | `handoff` (o `claude-handoff`) |
| Token budget (Regla 6) | `handoff` + checkpoint `/checkpoint` |

---

## Comandos slash alineados

| Comando | Skills que deben cargarse antes |
| ------- | -------------------------------- |
| `/plan` | `zoom-out` si aplica + leer esta regla |
| `/domain` | `grill-with-docs` |
| `/architect` | `improve-codebase-architecture` |
| `/test` | `tdd` |
| `/review` | `review` |
| `/handoff` | `handoff` |

---

## Verificación (Regla 12)

Al cerrar una fase o tarea, en el checkpoint indicá:

```
SKILLS_USED: zoom-out, to-prd, tdd, ...
SKILLS_SKIPPED: <nombre> — motivo breve (solo si la tarea era trivial)
```

Si omitiste un skill obligatorio de la tabla sin motivo válido, la tarea **no** está completa.
