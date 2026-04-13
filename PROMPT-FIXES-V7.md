# FIXES PARA V7 — Solo estos cambios, no toques nada más

## CRÍTICO (sin esto no se puede enviar)

### FIX 1 — P1: Título roto en PDF export
El título del hero se renderiza como "Fromaaa booking showsto building aartistbusinesses in China" cuando se exporta a PDF. Las palabras se fusionan porque hay `letter-spacing` o `word-spacing` negativo en el CSS.

**Diagnóstico:**
- Busca el componente del hero en la portada (ruta /print)
- Inspecciona los estilos CSS del h1/título principal
- Busca cualquier `letter-spacing` negativo (ej: `-0.02em`, `-1px`) o `word-spacing` personalizado
- También busca si hay `font-feature-settings` o `text-rendering` que pueda causar ligaduras

**Fix:**
```css
/* En el título del hero, para la ruta /print o @media print */
.hero-title, [class*="hero"] h1, [el selector que sea] {
  letter-spacing: normal !important;
  word-spacing: normal !important;
  font-feature-settings: normal !important;
  text-rendering: auto !important;
}
```

**Verificación:** Exporta a PDF y confirma que se lee: "From booking shows to building artist businesses in China" con espacios normales entre TODAS las palabras.

---

### FIX 2 — P8: Typo "dont"
Busca el string exacto: `dont book artists`
Reemplaza por: `don't book artists`

Puede estar en un componente JSX o en un archivo de contenido. Búscalo con grep.

---

### FIX 3 — P9: Colores de severity labels
Los 6 labels de severidad en la página de Risks son todos del mismo color teal. Necesitan colores diferenciados para que la clasificación tenga sentido visual.

**Mapeo de colores:**

| Severity   | Background | Text color |
|-----------|-----------|-----------|
| LOW        | #22c55e (verde) | #000000 |
| LOW-MED    | #eab308 (amarillo) | #000000 |
| MEDIUM     | #f97316 (naranja) | #000000 |
| STRUCTURAL | mantener teal actual | mantener actual |

**Implementación:** Busca el componente de risk/severity badge. Probablemente usa una clase o prop para el nivel. Añade estilos condicionales basados en el texto del label.

```jsx
// Ejemplo de lógica
const severityColors = {
  'LOW': { bg: '#22c55e', text: '#000' },
  'LOW-MED': { bg: '#eab308', text: '#000' },
  'MEDIUM': { bg: '#f97316', text: '#000' },
  'STRUCTURAL': { bg: '#0d9488', text: '#000' } // teal actual
};
```

---

## IMPORTANTE (mejora la calidad pero no bloquea el envío)

### FIX 4 — P6: Inconsistencia €24K vs €54K
En P4 (punto 05) y P7 se dice "€24K Year 1 investment". En P6 la proyección financiera dice "€54K invested" para Year 1. Esto confunde a INS.

**Opciones:**
- Si €24K es la inversión de INS y €54K es el total (INS + A2G): aclarar en P6 con "€54K total invested (€24K INS + €30K A2G)" 
- Si ambos deberían ser el mismo número: corregir el que esté mal

**Nota para Aitzol:** Tú decides cuál es el número correcto. Dale la instrucción exacta a Claude Code.

---

### FIX 5 — Spacing general (todas las páginas)
Varias páginas tienen espacio vacío excesivo en la parte inferior. El root cause es probablemente `min-height: 100vh` en los sections para la versión web scroll.

**Fix para /print:**
```css
/* Solo en /print route o @media print */
section, [class*="section"] {
  min-height: auto !important;
  page-break-inside: avoid;
}
```

Páginas más afectadas: P1 (30% vacío bajo KPIs), P3 (gap bajo comparación), P4 (gap entre punto 05 y quote), P7 (gap bajo success metrics), P8 (gap bajo revenue cards).

---

## MENOR (nice-to-have)

### FIX 6 — Contraste de quotes en gold italic
Las quotes de cierre en gold italic (P3, P4, P5) son legibles pero están al límite de contraste WCAG. Subir el brillo del gold un 10-15% mejoraría la legibilidad sin perder el efecto.

Valor actual estimado: ~`#b8960c` → Sugerido: `#d4a90e` o `#e0b811`

---

**Orden de ejecución: Fix 1 → Fix 2 → Fix 3 → Fix 4 → Fix 5 → Fix 6**
**Exporta a PDF después de cada fix crítico y verifica.**
