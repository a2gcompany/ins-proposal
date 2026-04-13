# Prompt para Claude Code — Fix Layout y Distribución /print

Copia y pega directamente:

---

```
PROBLEMA URGENTE: La versión /print de la propuesta tiene huecos vacíos enormes en cada página. El problema raíz es que las secciones están diseñadas para la web (100vh por sección, scroll snapping) pero cuando se exporta a PDF el contenido ocupa solo 30-50% de cada página y el resto es espacio negro vacío.

Necesito que arregles el layout de /print para que funcione como documento PDF exportable, SIN romper la versión web principal (/). Los cambios deben aplicarse SOLO a la ruta /print o a través de @media print.

Lee la estructura del proyecto primero, identifica los componentes y estilos de /print, y luego aplica estos cambios:

---

## 1. ELIMINAR ALTURAS FIJAS EN /print

Busca y elimina/override para la ruta /print (o @media print):
- `min-height: 100vh` → `min-height: auto`
- `height: 100vh` → `height: auto`
- Cualquier `min-height` fijo en secciones → `min-height: auto`
- `scroll-snap-align` → `none` (no tiene sentido en un PDF)
- `scroll-snap-type` → `none`

El contenido debe fluir naturalmente — cada sección ocupa SOLO el espacio que necesita.

## 2. PROBLEMAS ESPECÍFICOS POR PÁGINA (mapeo exacto de los huecos)

### Página 1 — Portada
- El hero title + subtitle está en el top 35% de la página
- Los tres cards (INS/A2G/OUTPUT) están pegados al bottom
- En medio hay un 50% de espacio negro vacío
- **Fix:** Centrar verticalmente todo el contenido como un bloque, o subir los cards para que queden justo debajo del subtitle con un gap de ~60-80px máximo

### Página 2 — The Model
- Esta página está bien de densidad (el diagrama llena la página)
- Solo reducir ligeramente el gap entre el hero "One platform. One engine. One outcome." y la primera row de tres columnas (INS PROVIDES / A2G PROVIDES / TOGETHER THEY BUILD)

### Página 3 — Why This Wins
- Gap enorme (~200px+) entre el hero "A better model for everyone" y los cards de comparación (Traditional Booking vs Co-Development)
- Gap entre el card de Five Holdings (€302.5M / $589M) y los dos cards de comparación (€302.5M → €54K) debajo
- Espacio vacío grande al bottom de la página
- **Fix:** Reducir todos los gaps entre secciones internas a máximo 48-60px. El contenido debería llenar ~80% de la página

### Página 4 — Why Now
- Gap enorme (~250px+) entre el card de mercado ($8.5B → $19.1B) y los 5 puntos numerados
- Los 5 puntos están visualmente compactos entre sí (bien) pero empiezan demasiado abajo
- **Fix:** Subir los 5 puntos para que empiecen ~48px debajo del card de mercado. El espacio ahorrado se redistribuye al final

### Página 5 — The Artists
- Relativamente bien. El espacio entre las fotos y el bottom es aceptable
- Minor: reducir ligeramente el gap entre el hero "Three roles. One system." y las imágenes

### Página 6 — The Economics
- Gap grande (~200px+) entre el hero "Where the money comes from" y los 4 cards de revenue streams
- La mitad superior de la página es hero + espacio vacío
- La mitad inferior está bien distribuida (cards + phases + projections)
- **Fix:** Reducir el gap post-hero a ~48px. Los 4 cards de revenue deben empezar mucho más arriba

### Página 7 — Year 1
- Gap entre el hero "Focused. Measurable. Concrete." y las dos columnas (What we want / What INS gets)
- Las dos columnas + investment box + success metrics llenan bien el espacio pero empiezan demasiado abajo
- **Fix:** Reducir gap post-hero. Las columnas deben arrancar ~48-60px debajo del hero

### Página 8 — The Output
- Gaps grandes entre todos los elementos: hero → pipeline visual → Year 1/2/3 cards → revenue per artist cards
- El contenido está distribuido con demasiado respiro entre bloques
- **Fix:** Compactar todos los gaps internos. Esta página tiene suficiente contenido para llenarla bien si los elementos están más juntos

### Página 9 — Risks
- Gap enorme (~300px+) entre el hero "Every risk has a structure" y la primera fila de riesgos
- Los 5 riesgos en sí tienen buen spacing entre ellos
- **Fix:** Los riesgos deben empezar ~60px debajo del hero, no en la mitad de la página

### Página 10 — Next Steps + Close
- Razonablemente bien distribuida (dos secciones en una página)
- Minor: el gap entre los 3 cards de next steps y el "Let's Build Together" puede reducirse ~20%

## 3. REGLA GENERAL DE SPACING PARA /print

Establecer estas variables CSS (o overrides) SOLO para /print:

```css
/* Solo para la ruta /print o @media print */
--section-gap: 48px;        /* entre secciones */
--hero-to-content: 48px;    /* entre el hero statement y el primer elemento de contenido */
--card-gap: 24px;            /* entre cards dentro de una sección */
--block-gap: 36px;           /* entre bloques de contenido dentro de una sección */
```

## 4. PAGE BREAKS

Añadir page breaks explícitos entre secciones principales en /print:

```css
@media print {
  .section { 
    page-break-after: always;
    min-height: auto;
    height: auto;
  }
  .section:last-child {
    page-break-after: avoid;
  }
}
```

Si usas una clase diferente para las secciones, aplica el mismo concepto.

## 5. NO TOCAR LA VERSIÓN WEB

IMPORTANTE: La versión principal (/) debe mantener su diseño actual con scroll snapping y secciones full-viewport. Todos estos cambios son SOLO para /print. Si /print tiene su propio layout component o CSS file, úsalo. Si comparte estilos con /, crea overrides específicos usando:
- La ruta (/print) para scoping
- O @media print para cuando se exporte
- O un className condicional tipo `print-mode`

## 6. VERIFICACIÓN

Después de aplicar los cambios:
1. Abre / en el browser → verificar que NADA cambió
2. Abre /print en el browser → verificar que los gaps se redujeron
3. Exporta /print a PDF (Cmd+P → Save as PDF) → verificar que cada página tiene contenido bien distribuido sin huecos enormes
4. Verificar que no se cortó contenido entre páginas (los page breaks deben caer entre secciones, no en medio de un card)

Haz commit cuando todo esté verificado.
```

---
