# Prompt Definitivo — V5 de ins-proposal

Copia y pega en Claude Code:

---

```
Necesito una revisión profunda de la versión /print de la propuesta A2G × INS. Los cambios son de LAYOUT, COPY y DISEÑO VISUAL. La versión web (/) no debe romperse — estos cambios son para /print y los componentes compartidos que afecten ambas.

Lee la estructura del proyecto primero. Luego ejecuta los cambios página por página:

---

## PÁGINA 1 — PORTADA (rehacer completamente)

La portada actual es la página más débil del documento. Los problemas:
- El título "From booking shows to building artist businesses in China" tiene errores de kerning/spacing visibles en el PDF export
- Hay un hueco vacío ENORME (50%+ de la página) entre el título/subtítulo y los tres cards del bottom
- Los copys no comunican suficiente impacto para una primera impresión
- Los tres cards (INS → Infrastructure / A2G → Artist engine / OUTPUT → Artists built for China) son genéricos

### Cambios:

**Título:** Mantener "From booking shows to building artist businesses in China" pero verificar que el rendering en /print no rompa el kerning. Si hay un `letter-spacing` o `word-spacing` personalizado, verificar que se vea correcto en el PDF export.

**Subtítulo:** Cambiar de "From booking shows to building artist businesses — a first-of-its-kind co-development model with long-term shared ownership." a algo más impactante:
"A first-of-its-kind partnership: Western production meets Chinese infrastructure. Co-development. Co-ownership. Long-term value."

**Layout:** Eliminar el hueco vacío. Centrar todo el contenido verticalmente como un bloque cohesivo:
- Título arriba
- Subtítulo debajo (gap: 24px)
- Tres cards debajo (gap: 80px)
- KPI bar debajo de los cards con 3-4 datos de impacto: "$8.5B market · 10.6% CAGR · 3 artists · Q2-Q3 2026 launch"

**Los tres cards:** Hacerlos más específicos:
- INS: "Infrastructure" → "Venues · Marketing · Distribution · China reach"
- A2G: "Artist engine" → "Production · Labels · Content · Global network"
- OUTPUT: "Artists built for China" → "Co-owned artists generating revenue across live, streaming, licensing & content"

**Contraste:** Todo el texto en la portada necesita ser legible. Subtítulo mínimo #c0c0c0, cards mínimo #b0b0b0.

## PÁGINA 2 — THE MODEL (ajustar legibilidad, mantener estructura)

La estructura de esta página es buena. Los cambios:

**Tamaño de fuente:** Subir el tamaño del body text en las tres columnas (INS PROVIDES / A2G PROVIDES / TOGETHER THEY BUILD) un 15-20%. Actualmente es demasiado pequeño para lectura cómoda.

**Diagrama de ecosistemas:** Los subtítulos dentro de cada bloque (ej: "Platforms" bajo HERO.COM, "Live events" bajo INS Shows, "Label" bajo INSane) son casi ilegibles. Subir a mínimo 11px y color #9a9a9a.

**Contraste general:** Todo el texto secundario en esta página necesita subir. El texto de la línea "EACH ARTIST PROVES THE MODEL · INFRASTRUCTURE SERVES THE NEXT" al pie necesita ser mínimo #a0a0a0.

**El bloque "THE DEAL"** en el centro del diagrama necesita más protagonismo: borde gold más grueso o fondo ligeramente diferenciado.

**"ARTIST FACTORY"** → Cambiar a **"ARTIST BUILDER"** (ya se ve "ARTIST BUILDER" en el diagrama — confirmar que sea consistente en todo el documento).

## PÁGINA 3 — WHY THIS WINS (reescribir copys + cerrar huecos)

### Copys de los cards de comparación:

**TRADITIONAL BOOKING** — cambiar:
- "Pay fee" → "Pay €15–50K per booking"
- "Run event" → "One show, one night"
- "Value ends when the night ends" → mantener (este es bueno)

**CO-DEVELOPMENT MODEL** — cambiar:
- "Invest in activation" → "Co-invest in artist development"
- "Build shows, music, content" → "Build shows, music, content & IP"
- "Retain participation in China value" → "Own a share of every revenue stream — permanently"

### Comparación Five Holdings:

El usuario siente que los números son exagerados. La comparación €302.5M vs €54K es impactante pero puede sentirse like apples-to-oranges. Mejorar el framing:

Cambiar el texto debajo de la comparación de:
"Still rents talent" / "Co-owns artists from day one"

A:
"€302.5M invested · Still pays external booking fees for every show" / "€54K Year 1 · Co-owns artist development from day one"

Esto contextualiza AMBOS números (lo que se invirtió Y la consecuencia).

### Layout:
- Reducir gap entre hero "A better model for everyone" y los cards de comparación a ~48px
- Reducir gap entre el card de Five Holdings y los dos cards de comparación a ~36px
- Reducir gap al bottom de la página — el espacio vacío tras los cards debe ser máximo ~60px
- El contenido total debería llenar ~85% de la página

## PÁGINA 4 — WHY NOW (ajustar copys + tamaño fuente + cerrar huecos)

### Layout:
- Reducir gap ENORME (~250px) entre el card de mercado ($8.5B → $19.1B) y los 5 puntos numerados a ~48px
- Los 5 puntos deben empezar mucho más arriba en la página

### Tamaño fuente:
- Los títulos de los 5 puntos (ej: "Platform prioritization", "The FIVE gap") están bien
- Las descripciones debajo de cada punto necesitan subir de tamaño ~10-15% y subir contraste a #c0c0c0
- Actualmente son demasiado pequeñas y tenues para lectura cómoda

### Copys — refinamientos:
- Punto 05 "Low-cost entry": Cambiar "The risk-to-upside ratio will never be this favorable again" → "The risk-to-upside ratio at this stage is exceptionally favorable"
- La frase de cierre "The question isn't whether this model works. It's who builds it first." es EXCELENTE — no tocar

## PÁGINA 5 — THE ARTISTS (reformatear imágenes + añadir credenciales)

### Imágenes:
Las tres fotos de artistas son demasiado alargadas verticalmente. Cambiar el aspect ratio:
- De: imágenes verticales/portrait que dominan la página
- A: imágenes más cuadradas o landscape (16:9 o 4:3) que dejen más espacio para texto debajo
- Usar `object-fit: cover` con un container de aspect ratio fijo para que las tres tengan el mismo tamaño
- Alternativa: hacer las imágenes más pequeñas (60-70% del tamaño actual) y usar el espacio ganado para las credenciales

### Añadir credenciales (debajo de la descripción actual de cada artista):

**PROPHECY:**
"Co-produced with ARTBAT, MORTEN, David Guetta, Tiësto · 300K+ Spotify monthly listeners · Labels: Insomniac, Spinnin'/Warner, Future Rave"

**AIRE:**
"Thundercode visuals (Alesso, SHM, Alan Walker) · Kuaigon mix & master (Adriatique, Vintage Culture, Fideles)"

**BJÖRN:**
"568K Spotify monthly listeners · #1 Beatport ranking · Target labels: Insomniac, Future Rave, Spinnin'"

Estilo: fuente 1-2px menor que la descripción, color #9a9a9a, separada de la descripción por 8px.

### Distribución:
Asegurar que hero → imágenes → nombres+descripciones+credenciales → quote → mini-cards fluyan sin huecos grandes.

## PÁGINA 6 — THE ECONOMICS (cerrar hueco + completar datos)

### Layout:
- Gap enorme entre hero "Where the money comes from" y los 4 cards de revenue. Reducir a ~48px
- Todo el contenido debe subir significativamente

### Datos faltantes en las proyecciones financieras:
Los cards de Year 1/2/3 necesitan mostrar TRES datos, no dos:

**Year 1:** €44K total revenue · **€54K invested** · €24K INS return **(46% recovered)**
**Year 2:** €179K total revenue · **€131K cumul. invested** · €53K INS return **(60% recovered)**
**Year 3:** €495K total revenue · **€253K cumul. invested** · €145K INS return **(88% recovered)**

Añadir la línea "invested" y el porcentaje entre paréntesis. El "% recovered" en teal o gold para que destaque.

### Contraste:
- "total revenue", "INS return" labels y los datos de shows/streams al pie de cada card: subir a #a0a0a0 mínimo

## PÁGINA 7 — YEAR 1 (optimizar distribución + fuente + refinar copys)

### Layout:
- Reducir gap entre hero y las dos columnas a ~48px
- El hero "Focused. Measurable. Concrete." funciona pero es genérico. Considerar cambiar a: "The first move." o "Year 1: prove it works."

### Tamaño fuente:
- Los bullet points de ambas columnas necesitan subir ~10-15% de tamaño
- Actualmente se leen como footnotes, no como los deliverables de un deal de €24K

### Copy de "3-5 non-INS China shows":
Cambiar "3-5 non-INS China shows (€4-5K rate)" → "3-5 additional China shows via INS network or local partners (€4-5K rate)"

### Success Metrics:
El bloque "YEAR 1 IS SUCCESSFUL IF:" le gusta al usuario pero necesita más peso visual:
- Envolverlo en un card con borde gold sutil
- Cambiar header a: "OUR COMMITMENT — YEAR 1 SUCCESS METRICS"
- Los 6 criterios deben tener checkbox-style (□) como ya tienen — mantener

## PÁGINA 8 — THE OUTPUT (compactar distribución)

### Layout:
Hay gaps grandes entre TODOS los elementos. Compactar:
- Hero → pipeline visual: reducir gap a ~60px
- Pipeline visual → Year 1/2/3 cards: reducir gap a ~36px
- Year 1/2/3 cards → revenue per artist cards: reducir gap a ~36px

### Typo:
"We dont book artists. We build them." → "We **don't** book artists. We build them."

### "It runs itself" (Year 3):
Cambiar "It runs itself" → "The system accelerates" — "it runs itself" suena a que ya no necesitan a A2G.

## PÁGINA 9 — RISKS (compactar + mejorar distribución + color de severity)

### Layout:
- Gap enorme (~300px) entre hero y los riesgos. Reducir a ~60px
- Los riesgos empiezan casi en la mitad de la página — deben empezar en el tercio superior

### Severity labels — diferenciar colores:
- LOW → verde (#22c55e)
- LOW-MED → amarillo (#eab308)
- MEDIUM → naranja (#f97316)
- STRUCTURAL → teal (mantener)

### Añadir riesgo 06:
**06 · A2G underdelivery** — Severity: MEDIUM
"Deliverables defined per quarter with measurable outputs. INS retains all co-owned IP regardless of partnership status. Performance review built into Year 1 success metrics."

### Copy del closing:
La frase "Every failure mode has a contractual or structural response built in." es excelente — no tocar.

## PÁGINA 10 — NEXT STEPS + CLOSE (minor fixes)

### Consistencia:
Paso 1 dice "Prophecy as headliner" — cambiar a "Prophecy as anchor act" (consistente con "Opens doors" en el resto del doc).

### QR:
Cambiar "Scan to view the full interactive proposal" → "Experience the full interactive proposal"

---

## REGLAS GLOBALES PARA TODAS LAS PÁGINAS

### Contraste (aplicar en TODO el documento):
- Body text principal: mínimo #d4d4d4
- Texto secundario / descripciones: mínimo #b0b0b0
- Labels en caps: mínimo #8a8a8a
- Subtítulos bajo hero statements: mínimo #c0c0c0
- Todo debe pasar WCAG AA (4.5:1 para <18px, 3:1 para ≥18px bold)

### Layout /print (aplicar a TODAS las secciones):
- Eliminar `min-height: 100vh` → `min-height: auto` en /print
- Eliminar `scroll-snap-align` y `scroll-snap-type` en /print
- Gap estándar hero → contenido: 48px
- Gap entre cards: 24px
- Gap entre bloques: 36px
- Page breaks entre secciones: `page-break-after: always`
- NO tocar el layout de la versión web (/)

### Verificación:
1. Abrir / → nada cambió
2. Abrir /print → gaps reducidos, copys actualizados
3. Cmd+P → Save as PDF → verificar que cada página tiene contenido bien distribuido
4. Verificar que no se corta contenido entre páginas

Haz commit después de cada 2-3 páginas para poder hacer rollback si algo se rompe.
```

---
