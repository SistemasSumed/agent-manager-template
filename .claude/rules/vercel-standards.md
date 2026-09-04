# Estándares Vercel y Next.js / React (Vercel Agent Skills)

**Referencia:** [Vercel Agent Skills](https://vercel.com/docs/agent-resources/skills) · `vercel-labs/agent-skills`

---

## 1. Principios de Rendimiento en React y Next.js (`react-best-practices`)

1. **Server Components por defecto (Next.js App Router):**
   - Mantén componentes como Server Components (`RSC`) a menos que requieran interactividad (`useState`, `useEffect`, event listeners) o APIs del navegador.
   - Coloca `'use client'` solo en las hojas del árbol de componentes (hojas de interactividad), nunca en componentes contenedor superiores.
2. **Optimización de Renderizado:**
   - Evita re-renderizados innecesarios. No crees objetos, arreglos ni funciones inline dentro de renders si se pasan como props a componentes memorizados.
   - Utiliza `useMemo` y `useCallback` estratégicamente en cálculos costosos y dependencias de efectos.
3. **Data Fetching y Caching:**
   - Fetching de datos en el servidor donde sea posible.
   - Utiliza `Suspense` y Streaming para componentes con fetching asíncrono pesado.
   - Evita cascadas de solicitudes (waterfalls); realiza requests paralelos con `Promise.all` cuando sean independientes.
4. **Patrones de Composición (`composition-patterns`):**
   - Favorece la composición (`children`, slots) sobre props booleanas excesivas (`isX`, `hasY`).
   - Mantén los componentes pequeños, enfocados y con responsabilidad única.

---

## 2. Directrices de Diseño y UI (`web-design-guidelines`)

1. **Tokens de Diseño y Variables CSS:**
   - Usa siempre tokens semánticos (fondos, bordes, tipografía, contrastes accesibles WCAG AA/AAA).
   - No hardcodees valores hexadecimales ni medidas mágicas directas.
2. **Accesibilidad (a11y):**
   - Asegúrate de que todos los elementos interactivos tengan roles, etiquetas accesibles (`aria-label`, `aria-labelledby`) y soporte completo para teclado (`Tab`, `Enter`, `Space`, `Esc`).
   - Incluye estados visibles de `:focus-visible`.
3. **Animaciones y Transiciones (`react-view-transitions`):**
   - Utiliza View Transitions para transiciones suaves de estado y página sin saltos bruscos de layout.
   - Respeta la preferencia del usuario por movimiento reducido (`prefers-reduced-motion`).

---

## 3. Despliegue y Operación en Vercel (`deploy-to-vercel`, `vercel-optimize`)

1. **Configuración de `vercel.json`:**
   - Valida rutas, rewrites, headers de seguridad (CORS, CSP, X-Frame-Options) y funciones serverless.
2. **Optimización de Bundles:**
   - Monitorea el tamaño de paquetes. Importa utilidades modulares (ej. `lodash-es/get` o funciones nativas en lugar de librerías completas).
   - Aprovecha Edge Middleware y Edge Functions para lógica de baja latencia (geo-routing, autenticación rápida).
3. **Variables de Entorno y Seguridad (`vercel-cli-with-tokens`):**
   - Nunca commitees credenciales ni archivos `.env`.
   - Utiliza Vercel CLI o el dashboard para inyectar variables de entorno por ambiente (`development`, `preview`, `production`).
