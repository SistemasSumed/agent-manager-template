# Agent Manager Template

> Setup profesional de Claude Code y AI Coding Agents: pipeline de 7 fases, **20 agentes**, **16 comandos** slash, **11 hooks**, **60+ skills especializadas** (Vercel Agent Skills + Matt Pocock Skills + Lifecycle Audit) — un comando para empezar.

**Guía rápida:** [GETTING_STARTED.md](GETTING_STARTED.md) · **Referencia completa:** [docs/REFERENCE.md](docs/REFERENCE.md) · **Avanzado (opcional):** [docs/ADVANCED.md](docs/ADVANCED.md)

---

## Inicio rápido (3 comandos)

```bash
git clone https://github.com/nomdedev/agent-manager-template
cd agent-manager-template
npm run setup && npx tsx src/cli/claudio.ts doctor && npm run dev
```

Sin argumentos, `claudio` abre un **menú interactivo** que explica cada opción. También: `claudio guia` (qué hace pipeline, agentes, hooks, skills…).

Instalar en **otro proyecto:**

```bash
npx tsx src/cli/claudio.ts init ./mi-proyecto --yes
npx tsx src/cli/claudio.ts doctor
```

---

## Ecosistema de Skills Integrado

Este template integra de forma nativa el estándar abierto de **Agent Skills** de Vercel y Matt Pocock:

- 🚀 **Vercel Agent Skills** ([vercel.com/docs/agent-resources/skills](https://vercel.com/docs/agent-resources/skills)):
  - `react-best-practices`: Reglas de alto rendimiento, Server Components (RSC) y optimización en React / Next.js.
  - `web-design-guidelines`: Principios de UI moderna, contraste y accesibilidad (a11y).
  - `deploy-to-vercel`: Despliegues automáticos a la plataforma Vercel.
  - `composition-patterns`: Patrones limpios de composición de componentes.
  - `react-view-transitions`: Animaciones fluidas con View Transitions API.
  - `react-native-skills`: Directrices para desarrollo móvil React Native.
  - `vercel-cli-with-tokens`: Automatización segura de Vercel CLI con tokens.
  - `vercel-optimize`: Caching en el Edge, bundle tuning y optimización de serverless.
  - `writing-guidelines`: Documentación técnica clara y directa.

- 🧠 **Matt Pocock Skills** ([github.com/mattpocock/skills](https://github.com/mattpocock/skills)):
  - `wayfinder` / `zoom-out`: Mapeo y exploración de arquitectura de código.
  - `domain-modeling` / `ubiquitous-language`: Modelado de dominio y glosario técnico.
  - `codebase-design` & `improve-codebase-architecture`: Diseño modular y contratos.
  - `to-spec` / `to-prd` & `to-tickets`: Especificación técnica y descomposición en issues.
  - `tdd`: Test-Driven Development riguroso con Vitest/Jest.
  - `diagnosing-bugs` / `diagnose`: Diagnóstico sistemático de errores e hipótesis.
  - `implement` & `code-review`: Implementación y revisión exhaustiva de código.
  - `grill-me`, `grill-with-docs`, `handoff`, `wizard`, `teach`, etc.

- 📦 **Gestión con `npx skills`**:
  - `npm run skills:install` — Instala todas las skills de ambos catálogos.
  - `npm run skills:update` — Actualiza las skills a la última versión.
  - `npm run skills:find` — Busca skills en el catálogo interactivo [skills.sh](https://skills.sh).
  - `npm run skills:list` — Lista las skills instaladas por agente.

---

## Que es esto

**Agent Manager Template** es un sistema de ingeniería asistida por IA para Claude Code y AI Coding Agents. No es solo una estructura de carpetas: es una **metodología completa** que define cómo un equipo de agentes especializados colabora para entregar software de calidad.

La idea central es simple: en lugar de que Claude Code sea un asistente general que hace todo, este template lo convierte en un **equipo de especialistas con roles definidos**, que trabajan bajo un pipeline secuencial con gates de calidad. Cada feature pasa por 7 fases obligatorias antes de llegar a producción.

**Qué incluye:**
- CLI `claudio` (`init`, `doctor`, `evoluciona`) para instalar y verificar el setup
- Pipeline de 7 fases con gates de salida verificables
- 20 agentes especializados con permisos y protocolos definidos (12 de equipo + 8 lifecycle-audit)
- 16 comandos slash (`/vercel`, `/audit`, `/security`, `/test`, `/review`, `/frontend`, `/architect`, etc.)
- 11 hooks que bloquean automáticamente operaciones peligrosas
- 60+ skills cargables on-demand en `.agents/skills/` y `.claude/skills/`
- Vault de Obsidian y Hermes Agent — **opcionales** ([docs/ADVANCED.md](docs/ADVANCED.md))

---

## CLI claudio — referencia completa

### `claudio init [target-dir] [--minimal] [--yes]`

Punto de entrada recomendado. En este template instala dependencias y crea `.env`; en otros proyectos instala `.claude/` y genera `context.md`, `architecture.md`, `domain.md` y `memory.md`.

```
claudio init
claudio init ./mi-proyecto --yes
pnpm setup    # alias de claudio init en este repo
```

### `claudio doctor`

Verifica Node, `.claude/`, MCP paths, hooks y `.env` (en el template).

### `claudio evoluciona [target-dir] [--minimal] [--yes]`

Instala el setup completo de Claude Code en un proyecto.

```
claudio evoluciona ./mi-proyecto --minimal
```

El wizard copia:
- `.claude/agents/` — 12 agentes especializados
- `.claude/commands/` — 12 comandos slash
- `.claude/hooks/` — 11 hooks de seguridad y calidad
- `.claude/skills/` — 10 skills especializados
- `.claude/rules/` — reglas del proyecto (incl. `domain.md` generado)
- `.claude/CLAUDE.md` — 12 reglas de comportamiento
- `.claude/logs/pipeline-state.json` — estado del pipeline

### `claudio hermes <subcomando>`

Gestion de Hermes Agent con Obsidian como knowledge database.

| Subcomando | Descripcion |
|---|---|
| `install` | Instala Hermes Agent en el sistema |
| `init [perfil]` | Crea `~/.hermes/` con `SOUL.md` + memoria inicial. Perfiles: `programmer`, `writer`, `researcher` |
| `optimize [ruta]` | Sincroniza Obsidian vault → `MEMORY.md` + skills de Hermes |
| `status` | Estado de `~/.hermes/` y sus componentes |
| `gepa` | Instrucciones para optimizar skills del agente con GEPA (auto-evolucion) |

### Opciones globales

```
claudio --help      Muestra la ayuda
claudio --version   Muestra la version instalada
```

---

## Documentación detallada

- [Pipeline de 7 fases, agentes, comandos, hooks y skills](docs/REFERENCE.md)
- [Hermes Agent y Obsidian (opcional)](docs/ADVANCED.md)
- [Guía de 5 minutos](GETTING_STARTED.md)

---


## Stack tecnologico

| Categoria | Tecnologia |
|---|---|
| Runtime | Node.js 20+ |
| Lenguaje | TypeScript 5.x (ESM) |
| Package manager | pnpm |
| Framework API | Fastify |
| Validacion | Zod |
| Testing | Vitest + Supertest |
| Coverage | v8 (threshold 80%) |
| Linter | ESLint + Prettier |
| AI SDK | OpenAI SDK / Anthropic SDK |
| Deploy | Vercel |

---

## Comandos de desarrollo

```bash
pnpm install          # Instalar dependencias

# CLI
pnpm run claudio evoluciona           # Wizard interactivo
pnpm run claudio evoluciona ./target  # Instalar en directorio especifico
pnpm run claudio hermes install       # Clonar repo hermes-agent (solo git)

# Servidor de ejemplo
pnpm run dev          # Desarrollo con hot-reload (http://localhost:3000)
pnpm run build        # Compilar TypeScript a dist/
pnpm start            # Iniciar en produccion

# Calidad
pnpm run lint         # Ejecutar ESLint
pnpm run lint:fix     # ESLint con auto-fix
pnpm run format       # Formatear con Prettier

# Tests
pnpm test             # Todos los tests
pnpm run test:unit    # Solo tests unitarios
pnpm run test:int     # Solo tests de integracion
pnpm run test:e2e     # Solo tests end-to-end
pnpm run test:watch   # Tests en modo watch
```

### Variables de entorno

```bash
cp .env.example .env
```

| Variable | Descripcion | Requerida |
|---|---|---|
| `NODE_ENV` | `development` / `production` / `test` | Si |
| `PORT` | Puerto del servidor (default: 3000) | No |
| `OPENAI_API_KEY` | API key de OpenAI | Si (para AI) |
| `LOG_LEVEL` | `debug` / `info` / `warn` / `error` | No |

---

## Pipeline lifecycle de auditoría

Complementa el pipeline de **7 equipos** (`orchestration.md`) con un ciclo de **8 fases** orientado a calidad por disciplina:

| Fase | Agente lifecycle |
|------|------------------|
| 0 Intake | lifecycle-scope-auditor |
| 1 Arquitectura | lifecycle-architecture-auditor |
| 2 Diseño | lifecycle-design-auditor |
| 3 Seguridad | lifecycle-security-auditor |
| 4 Código | lifecycle-code-auditor |
| 5 Testing | lifecycle-test-auditor |
| 6 DevEx | lifecycle-devex-auditor |
| 7 Producción | lifecycle-production-auditor (GO/NO-GO) |

**Instalación:** automática con `claudio evoluciona` → genera `docs/AUDIT_STANDARDS.md`, `docs/AUDIT_AGENTS.md` y 8 agentes.

**Uso:** `/audit-pipeline [feature-id]` o skill `audit-pipeline`.

**Documentación:** [docs/AUDIT_PIPELINE.md](docs/AUDIT_PIPELINE.md)

---

## Adaptarlo a tu proyecto

```bash
claudio init ./mi-proyecto        # genera .claude/ + domain.md + context.md + audit lifecycle
claudio doctor
```

Refiná `.claude/architecture.md` y el glosario en `.claude/rules/domain.md` cuando el proyecto crezca. Obsidian es opcional → [docs/ADVANCED.md](docs/ADVANCED.md).

### Tipos de proyecto soportados

| Tipo | Ajuste necesario |
|---|---|
| API REST | Mantener las capas, ajustar los services |
| Web App (React/Next.js) | Agregar frontend layer, activar `frontend-expert` |
| CLI Tool | Reemplazar API layer por CLI parser (Commander/yargs) |
| Microservicio | Agregar communication layer (message queue) |
| Scraper | Reemplazar Agent service por Scraper con Playwright |

---

## Licencia

MIT
