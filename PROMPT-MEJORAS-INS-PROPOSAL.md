# Prompt para Claude Code — Mejoras ins-proposal

Copia y pega este prompt en Claude Code dentro del repo del proyecto:

---

```
Necesito que mejores tanto la versión principal (/) como la versión print (/print) de esta propuesta de partnership A2G × INS para el mercado de música electrónica en China. El sitio está en Next.js desplegado en Vercel.

He hecho un análisis completo de ambas versiones y de los PDFs originales. Aquí están los cambios específicos que necesito, organizados por prioridad:

---

## PRIORIDAD 1 — CONTRASTE Y LEGIBILIDAD (no negociable)

El body text tiene contraste insuficiente contra el fondo oscuro (#0a0a0a o similar). Esto afecta legibilidad en proyectores, pantallas con brillo bajo, y falla WCAG AA.

- Subir el color del body text de cualquier gris que esté por debajo de #9a9a9a a mínimo #b0b0b0 para texto secundario y #d4d4d4 para texto principal
- Los subtítulos descriptivos debajo de los hero statements (ej: "A first-of-its-kind co-development model...") deben ser al menos #c0c0c0
- Los labels pequeños (CHINA ELECTRONIC MUSIC MARKET, ANNUAL GROWTH, etc.) deben subir a mínimo #8a8a8a
- Las descripciones dentro de los cards (ej: el texto explicativo dentro de "Initial Investment", "Artist Development", etc.) necesitan más contraste
- Verificar que TODO el texto pase al menos WCAG AA (4.5:1 para texto normal, 3:1 para texto grande) contra el fondo

## PRIORIDAD 2 — CONTENIDO: SECCIONES QUE FALTAN EN /print

La versión /print tiene menos contenido que la versión principal. Necesita estas adiciones para funcionar como documento standalone de negociación:

### 2a. Añadir sección "Why Now" (después de "The Opportunity")
Contenido:
- El mercado chino de música electrónica está en un punto de inflexión: $8.5B en 2025, proyectado a $19.1B para 2033
- Las plataformas locales (Douyin, NetEase, QQ Music) están priorizando contenido internacional con partnerships territoriales
- FIVE Holdings demostró el modelo de venue-acquisition pero dejó un gap enorme: no tienen pipeline de artistas propios
- Ventana de oportunidad: los principales grupos de nightlife asiáticos están buscando diferenciación — el primero que construya un pipeline de artistas co-desarrollados tendrá una ventaja defensible
- Si INS no captura este modelo ahora, otro grupo con infraestructura similar lo hará

### 2b. Añadir sección "Risks & Mitigation" en /print
La versión principal (/) ya tiene 5 riesgos identificados. Traer esa misma sección a /print con el mismo contenido y formato:
1. Artist departure → Catalog revenue continues; A2G commits replacement
2. Slower revenue growth → Phase 1 has no time limit until recovery
3. Regulatory changes → Compliance through established platforms
4. Underperformance → Value-trade model limits cash exposure
5. Early exit → Exit clause with 6-month notice after Year 2; IP ownership proportional to investment

### 2c. Recuperar "Year 1 Success Metrics" en /print
Añadir criterios concretos de éxito del Year 1 (estaban en la V1 original pero se perdieron):
- Prophecy completa 3+ shows en venues INS con attendance rate >70%
- Al menos 1 track de ghost-production para Björn lanzado en label Tier 2+
- Pipeline de contenido AIRE produce mínimo 5 piezas de A/V content reutilizable
- Revenue del Year 1 alcanza mínimo €30K (breakeven parcial)
- Björn alcanza 100K+ monthly listeners en plataformas chinas

## PRIORIDAD 3 — CONSISTENCIA ENTRE / y /print

### 3a. Unificar el timeline
- La versión principal dice "April 2026" como first shows
- La versión print dice "Target: First show Q3 2026"
- Unificar a: "Q2–Q3 2026" como ventana de lanzamiento en ambas versiones

### 3b. Unificar el investment breakdown
- En una versión el €24K se descompone como "shows discounted + marketing co-fund + distribution setup"
- En otra se descompone como "€10K marketing + €14K ghost production package"
- Unificar a la versión más clara: "€10K marketing co-funding + €14K ghost production package (4 tracks at €3,500/track)"

### 3c. Scope de Björn
Asegurarse de que en AMBAS versiones Björn se describe de la misma manera:
"INS's homegrown artist — the proof of concept for the co-development model. From local act to internationally positioned name, using A2G's production network and label connections."

## PRIORIDAD 4 — DISEÑO VISUAL

### 4a. Sistema de bordes de cards
Actualmente los cards tienen bordes inconsistentes (algunos dorados, algunos teal, algunos sin borde). Establecer este sistema:
- Borde dorado/gold (#c9a227 o el gold que uses) = elementos de propuesta/highlight principal
- Borde teal (#0d9488 o el teal que uses) = elementos del ecosistema INS
- Sin borde visible (o borde muy sutil #1a1a1a) = contexto neutral/informativo

### 4b. Comparación Five Holdings vs INS+A2G
En la slide "The Opportunity", hacer que el card de "INS + A2G" (€54K) sea visualmente más dominante que el de "FIVE Holdings" (€302.5M):
- Card INS+A2G: borde gold más grueso (2px), glow sutil, o tamaño ligeramente mayor
- Card FIVE Holdings: mantener como está o reducir presencia visual
- El punto es que el ojo del lector se vaya primero al modelo propuesto, no al competidor

### 4c. Bullet points
Unificar todos los bullet points al mismo estilo en ambas versiones. Usar "·" (punto medio) consistentemente, no mezclar con "‣" o "-".

## PRIORIDAD 5 — MEJORAS DE UX

### 5a. QR code en /print
Si hay un QR code al final, añadir texto descriptivo: "Scan to view the full interactive proposal" con el URL visible debajo

### 5b. Navegación en /
Verificar que los anchor links del nav (Partnership, Opportunity, The Model, Artists, Deal, Value, Numbers, Risks, Roadmap, About) tengan scroll suave y que el estado activo se actualice correctamente al scrollear

### 5c. Print-friendliness de /print
Asegurarse de que /print tiene @media print styles correctos:
- Fondo oscuro se imprime como fondo oscuro (o alternativamente, ofrecer un toggle light/dark para impresión)
- Page breaks entre secciones principales
- Sin elementos de navegación en la versión impresa
- Imágenes de artistas se imprimen correctamente

## PRIORIDAD 6 — COPY REFINEMENTS

### 6a. Hero statement de portada
Cambiar de "Co-Building the Future of Music in China" a:
- Título principal: "Co-Building the Future of Music in China"
- Subtítulo (NUEVO, añadir): "From booking shows to building artist businesses — a first-of-its-kind co-development model with long-term shared ownership."

### 6b. Tono de la comparación Five Holdings
La línea "But FIVE proved its biggest vulnerability: without their own artists, they're always paying someone else's fee to fill their own venues." es buena pero agresiva. Cambiar a:
"FIVE's model revealed the industry's structural gap: venue ownership without artist ownership means perpetual dependency on external booking fees."

### 6c. Contact info
Asegurarse de que el email de contacto sea a.arevalo@a2g.company (no aitzolarev@gmail.com) en AMBAS versiones. El gmail no es profesional para un documento de este nivel.

---

Ejecuta estos cambios en orden de prioridad. Después de cada grupo de prioridad, haz commit con un mensaje descriptivo. Empieza leyendo la estructura del proyecto para entender dónde están los componentes relevantes.
```

---
