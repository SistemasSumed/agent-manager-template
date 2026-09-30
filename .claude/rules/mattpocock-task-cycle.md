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
| 1 | `zoom-out` | No conocés el área del código o la tarea toca muchos módulos |
| 2 | `grill-with-docs` | Requisitos ambiguos, términos nuevos, o falta `CONTEXT.md` / domain actualizado |
| 3 | `to-prd` | La tarea necesita PRD/issue publicado (feature mediana o grande) |
| 4 | `triage` | Issue entrante sin clasificar (label `needs-triage`) |

Tras `to-prd`, publicá en GitHub y registrá la feature en `pipeline-state.json` si aplica.

---

## Pipeline de 7 fases → skills

| Fase | Equipo | Skills obligatorios | Skills del template (`.claude/skills/`) |
| ---- | ------ | ------------------- | --------------------------------------- |
| 1–2 | Diseño | `grill-with-docs`, `prototype` (si hay duda de UX/API) | `skill-agent-design` |
| 3 | Backend | `improve-codebase-architecture` (diseño de módulos), `tdd` (contratos/tests primero) | `skill-api-design` |
| 4 | Seguridad | — | `skill-code-review` + agente `security-auditor` |
| 5 | Develop | `tdd` (implementación), `review` | `skill-refactoring`, `skill-git-workflow` |
| 6 | QA | `diagnose` si hay fallos intermitentes | `skill-testing` |
| 6.5 | DevOps | — | agente `devops-infra` |
| 7 | GO/NO-GO | `handoff` si la sesión termina sin GO | orquestador |

---

## Durante implementación

| Situación | Skill |
| --------- | ----- |
| Bug o regresión | `diagnose` |
| Tests antes/durante código | `tdd` |
| Refactor grande | `improve-codebase-architecture` o `request-refactor-plan` |
| Dividir trabajo en issues | `to-issues` |
| Contexto de sesión larga | `handoff` |
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

---

## Skills adicionales instaladas (multi-repo, 2026-09-30)

Además de `mattpocock/skills`, `.agents/skills/` incluye paquetes de otros orígenes. Lockfile: `skills-lock.json` en la raíz del repo (no en `.agents/skills/`).

| Origen | Skills | Cuándo usar |
| ------ | ------ | ----------- |
| `vercel-labs/skills` | `find-skills` | Descubrir e instalar skills nuevas cuando falta una capacidad |
| `vercel-labs/agent-browser` | `agent-browser` | Automatización de browser para agentes: forms, screenshots, scraping, verificación de apps web |
| `juliusbrussee/caveman` | `caveman`, `caveman-*` (commit, compress, discover, evidence-review, explore, help, learn, manage, optimize, review, setup, stats), `cavecrew`, `investigate-first`, `lean-build`, `migration`, `safe-refactor`, `surgical-patch`, `verify-and-stop` | Modo de comunicación ultra-comprimido (`caveman`), diagnóstico antes de editar (`investigate-first`), refactors seguros (`safe-refactor`), parches quirúrgicos (`surgical-patch`), migraciones reversibles (`migration`) |
| `czlonkowski/n8n-skills` | `n8n-agents`, `n8n-binary-and-data`, `n8n-code-javascript`, `n8n-code-python`, `n8n-code-tool`, `n8n-error-handling`, `n8n-expression-syntax`, `n8n-mcp-tools-expert`, `n8n-multi-instance`, `n8n-node-configuration`, `n8n-self-hosting`, `n8n-subworkflows`, `n8n-validation-expert`, `n8n-workflow-patterns`, `using-n8n-mcp-skills` | Cualquier tarea de workflows n8n (nodos, expresiones, MCP tools, self-hosting) |
| `higgsfield-ai/skills` | `higgsfield-brandkit`, `higgsfield-generate`, `higgsfield-marketplace-cards`, `higgsfield-product-photoshoot`, `higgsfield-soul-id`, `higgsfield-video-explainer`, `higgsfield-websites`, `higgsfield-youtube-thumbnail` | Generación de imagen/video/marca vía Higgsfield AI |
| `remotion-dev/skills` | `remotion-best-practices` (router), `remotion-captions`, `remotion-create`, `remotion-docs`, `remotion-interactivity`, `remotion-maps`, `remotion-markup`, `remotion-multimedia`, `remotion-render`, `remotion-saas`, `remotion-studio`, `remotion-upgrade` | Videos programáticos con Remotion |
| `seaworld008/commonly-used-high-value-skills` | `andrej-karpathy-skills` | Disciplina de código estilo Karpathy: pensar antes de codear, cambios simples, ediciones quirúrgicas, criterios de éxito verificables |
| `astro-han/karpathy-llm-wiki` | `karpathy-llm-wiki` | Mantener una wiki de conocimiento personal potenciada por LLM |

**Nota:** "Gstack" (skills `retro`, `_gstack-command`, `gstack-upgrade`, `open-gstack-browser`) ya está activo como plugin global de la cuenta, no vive en `.agents/skills/` de este repo — no requiere instalación vía `skills` CLI.

Actualizar cualquiera de estos: `npx skills@latest add <owner/repo> --all -y` (o `-s <skill-name>` para uno solo). Ver todos: `npx skills@latest list`.
