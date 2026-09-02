import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { copyDir } from './installer.js'

const MATTPOCOCK_SOURCE = 'mattpocock/skills'
const VERCEL_SOURCE = 'vercel-labs/agent-skills'

const MATTPOCOCK_MARKER = join('.agents', 'skills', 'tdd', 'SKILL.md')
const VERCEL_MARKER = join('.agents', 'skills', 'deploy-to-vercel', 'SKILL.md')

export function hasMattPocockSkills(projectRoot: string): boolean {
  return existsSync(join(projectRoot, MATTPOCOCK_MARKER))
}

export function hasVercelSkills(projectRoot: string): boolean {
  return (
    existsSync(join(projectRoot, VERCEL_MARKER)) ||
    existsSync(join(projectRoot, '.agents', 'skills', 'react-best-practices', 'SKILL.md')) ||
    existsSync(join(projectRoot, '.claude', 'skills', 'deploy-to-vercel', 'SKILL.md'))
  )
}

/**
 * Instala mattpocock/skills con el CLI oficial (skills.sh).
 * Idempotente: si ya existe el marker, no hace nada salvo force.
 */
export function installMattPocockSkills(projectRoot: string, force = false): void {
  if (!force && hasMattPocockSkills(projectRoot)) {
    return
  }

  const cmd = `npx skills@latest add ${MATTPOCOCK_SOURCE} --yes`
  execSync(cmd, {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, npm_config_yes: 'true' },
  })
}

/**
 * Instala vercel-labs/agent-skills con el CLI oficial (skills.sh).
 * Idempotente: si ya existe el marker, no hace nada salvo force.
 */
export function installVercelSkills(projectRoot: string, force = false): void {
  if (!force && hasVercelSkills(projectRoot)) {
    return
  }

  const cmd = `npx skills@latest add ${VERCEL_SOURCE} --yes`
  execSync(cmd, {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, npm_config_yes: 'true' },
  })
}

/**
 * Instala todas las skills (Matt Pocock + Vercel Agent Skills).
 */
export function installAllSkills(projectRoot: string, force = false): void {
  installMattPocockSkills(projectRoot, force)
  installVercelSkills(projectRoot, force)
}

/** Copia bundle del template (rápido, sin red) o instala vía npx si falta en el template. */
export function syncMattPocockBundle(templateRoot: string, targetDir: string): void {
  syncAllSkillsBundle(templateRoot, targetDir)
}

/** Copia bundle completo de skills (Matt Pocock + Vercel) y documentación de agentes. */
export function syncAllSkillsBundle(templateRoot: string, targetDir: string): void {
  const agentsSrc = join(templateRoot, '.agents')
  if (existsSync(agentsSrc)) {
    copyDir(agentsSrc, join(targetDir, '.agents'))
  } else {
    installAllSkills(targetDir)
  }

  const lockSrc = join(templateRoot, 'skills-lock.json')
  if (existsSync(lockSrc)) {
    copyFileSync(lockSrc, join(targetDir, 'skills-lock.json'))
  }

  const docsAgentsSrc = join(templateRoot, 'docs', 'agents')
  if (existsSync(docsAgentsSrc)) {
    copyDir(docsAgentsSrc, join(targetDir, 'docs', 'agents'))
  }

  for (const name of ['CONTEXT.md', 'AGENTS.md'] as const) {
    const src = join(templateRoot, name)
    if (existsSync(src)) {
      copyFileSync(src, join(targetDir, name))
    }
  }

  if (!hasMattPocockSkills(targetDir)) {
    installMattPocockSkills(targetDir)
  }
  if (!hasVercelSkills(targetDir)) {
    installVercelSkills(targetDir)
  }
}

