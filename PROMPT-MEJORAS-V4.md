# Prompt para Claude Code — Mejoras V4 ins-proposal

Copia y pega este prompt en Claude Code dentro del repo del proyecto:

---

```
Necesito que apliques mejoras específicas a la propuesta A2G × INS desplegada en Vercel (Next.js). He completado una revisión exhaustiva de la V4 (tanto el sitio web / y /print como el PDF exportado). La V4 ya incorporó muchos cambios anteriores — esto son los ajustes finales para llevarla a producción.

Empieza leyendo la estructura del proyecto para ubicar los componentes relevantes. Después ejecuta en orden de prioridad:

---

## PRIORIDAD 1 — CONTRASTE Y LEGIBILIDAD (sigue siendo el problema #1)

El body text sigue con contraste insuficiente contra el fondo oscuro en AMBAS versiones (/ y /print). Esto afecta legibilidad en proyectores, pantallas con brillo bajo, y falla WCAG AA.

Cambios necesarios:
- Body text principal: subir a mínimo #d4d4d4
- Texto secundario / descripciones dentro de cards: subir a mínimo #b0b0b0
- Subtítulos bajo hero statements (ej: "From booking shows to building artist businesses..."): subir a mínimo #c0c0c0
- Labels pequeños en caps (ej: "PRIVATE & CONFIDENTIAL", "THE MODEL", "INS PROVIDES"): subir a mínimo #8a8a8a
- Texto dentro del diagrama de ecosistemas (página 02): los subtítulos bajo cada bloque ("Platforms", "Live events", "Label", etc.) son casi ilegibles → subir a mínimo #9a9a9a
- La línea "EACH ARTIST PROVES THE MODEL · INFRASTRUCTURE SERVES THE NEXT" al pie del diagrama: subir a #b0b0b0
- Descripciones en los cards de proyección financiera (Year 1/2/3): "total revenue", "INS return", y las líneas de shows/streams al pie están demasiado tenues → subir a mínimo #a0a0a0
- Los severity labels en Risk Management (MEDIUM, LOW-MED, LOW, STRUCTURAL): asegurar que sean legibles

Criterio: TODO el texto debe pasar WCAG AA (4.5:1 para texto <18px, 3:1 para texto ≥18px bold o ≥24px) contra el fondo #0a0a0a o el color de fondo que se use.

## PRIORIDAD 2 — CREDENCIALES DE ARTISTAS (página "The Artists")

La V4 simplificó demasiado los perfiles. INS va a preguntar "¿quién es Prophecy?". Añadir UNA línea de credenciales debajo de cada descripción actual:

- **Prophecy** (debajo de "Production credibility, international label relationships, release pipeline"):
  Añadir: "Co-produced with ARTBAT, MORTEN, David Guetta, Tiësto · 300K+ Spotify monthly listeners · Charted on Beatport, Spotify & SiriusXM · Labels: Insomniac, Spinnin'/Warner, Future Rave"

- **AIRE** (debajo de "Immersive DJ×VJ format. Premium visual assets from every activation"):
  Añadir: "Visual collaboration with Thundercode (directors behind Alesso, Swedish House Mafia, Alan Walker) · Mix & master by Kuaigon (Adriatique, Vintage Culture, Fideles)"

- **Björn** (debajo de la descripción actual):
  Añadir: "568K Spotify monthly listeners · #1 Beatport ranking · Target labels: Insomniac, Future Rave, Spinnin' — channels opened by Prophecy's existing relationships"

Estos datos deben aparecer en un tamaño de fuente ligeramente menor que la descripción principal, en color #9a9a9a, para que sean credenciales de soporte sin saturar el layout.

Aplicar en AMBAS versiones (/ y /print).

## PRIORIDAD 3 — PROYECCIONES FINANCIERAS INCOMPLETAS

En la sección "The Economics" / financial projections, los cards de Year 1/2/3 muestran "total revenue" y "INS return" pero NO muestran la inversión acumulada ni el porcentaje de recuperación. Esto es crítico para que INS evalúe el ROI de un vistazo.

Añadir a cada card:
- **Year 1:** €44K total revenue · €54K invested · €24K INS return (46% recovered)
- **Year 2:** €179K total revenue · €131K cumulative invested · €53K INS return (60% recovered)
- **Year 3:** €495K total revenue · €253K cumulative invested · €145K INS return (88% recovered)

Formato sugerido: mantener el €-amount grande como focal, y debajo poner las tres líneas (revenue / invested / return) con el porcentaje de recuperación en teal o gold para que destaque.

Aplicar en AMBAS versiones.

## PRIORIDAD 4 — ESPACIADO Y DENSIDAD

### 4a. Página "Why This Wins" (comparación Traditional vs Co-Development)
Hay un gap vacío excesivo entre el hero statement "A better model for everyone" y los cards de comparación. Reducir el espacio para que el flow sea continuo.

### 4b. Página "Why Now"
Mismo problema: gap excesivo entre el card de mercado ($8.5B → $19.1B) y los 5 puntos numerados. Reducir para que se sienta como una sola unidad.

### 4c. Página "The Model" (diagrama de ecosistemas)
Esta página tiene demasiada densidad: la propuesta de valor tripartita + el diagrama completo + THE DEAL + ARTIST FACTORY + revenue streams. Considerar una de estas opciones:
- Opción A: Aumentar ligeramente el espacio entre los bloques del diagrama para que respire más
- Opción B: Si hay scroll en la versión web, está bien. En /print, asegurarse de que haya un page-break lógico después del diagrama de ecosistemas

### 4d. Cards "Traditional Booking"
Los bullet points son genéricos. Cambiar:
- "Pay fee" → "Pay €15–50K booking fee"
- "Run event" → "Run one event"
- "Value ends when the night ends" → mantener (este es bueno)

Y en "Co-Development Model":
- "Invest in activation" → "Co-fund marketing + production"
- El resto mantener

## PRIORIDAD 5 — SEVERITY LABELS EN RISK MANAGEMENT

Los 5 risk severity labels (MEDIUM, LOW-MED, LOW, MEDIUM, STRUCTURAL) actualmente parecen todos del mismo color. Diferenciar visualmente:
- LOW → verde (#22c55e o similar)
- LOW-MED → amarillo/ámbar (#eab308 o similar)
- MEDIUM → naranja (#f97316 o similar)
- STRUCTURAL → teal/neutro (mantener el color actual)

Esto se aplica tanto en / como en /print.

## PRIORIDAD 6 — RIESGO FALTANTE: DEPENDENCY ON A2G

En la sección Risk Management, añadir un 6to riesgo:

**06 · A2G underdelivery**
Severity: MEDIUM
Mitigation: "Deliverables are defined per quarter with measurable outputs (tracks delivered, shows executed, content pieces produced). INS retains all co-owned IP regardless of partnership status. Performance review built into Year 1 success metrics."

Esto demuestra madurez — INS va a preguntar "¿y si ustedes no cumplen?" y es mejor adelantarse.

## PRIORIDAD 7 — FIXES MENORES

### 7a. Typo
En la sección "The Output" / artist incubator, la frase dice:
"We dont book artists. We build them."
Corregir a: "We don't book artists. We build them."

### 7b. Consistencia de rol de Prophecy
En la página "Next Steps", el paso 1 dice "Prophecy as headliner". En el resto del documento Prophecy es descrito como "Opens doors" / "International credibility". Cambiar "headliner" a "anchor act" o mantener "international credibility" para ser consistente.

### 7c. Texto del QR code
Cambiar "Scan to view the full interactive proposal" por "Experience the full interactive proposal" — más activo y premium.

### 7d. Success metrics — peso visual
En la página Year 1, la sección "YEAR 1 IS SUCCESSFUL IF:" con los 6 criterios está muy abajo y con poco peso visual. Darle más protagonismo:
- Envolverlo en un card con borde (dorado sutil)
- Cambiar el header de "YEAR 1 IS SUCCESSFUL IF:" a "OUR COMMITMENT — YEAR 1 SUCCESS METRICS"
- Ligeramente más grande que el texto actual

### 7e. "3-5 non-INS China shows" 
En la columna "WHAT WE WANT FROM INS" de Year 1, la línea "3-5 non-INS China shows (€4-5K rate)" puede sonar como que A2G trabajará con competidores de INS. Reformular a: "3-5 additional China market shows through INS network or local partners (€4-5K rate)" — esto posiciona a INS como facilitador, no como excluido.

---

Ejecuta estos cambios en orden de prioridad. Haz commit después de cada grupo. Verifica los cambios en ambas rutas (/ y /print) antes de cada commit.
```

---
