# Cómo hacer funcionar el visor de PDF

El visor solo acepta URLs HTTPS directas a archivos .pdf. La forma más rápida:

## Opción 1: Subir a tu repo de Vercel (30 segundos)

En tu repo del proyecto, copia el PDF a la carpeta `/public`:

```bash
cp "A2G × INS — The Future of Music in Asia4.pdf" public/proposal-v4.pdf
git add public/proposal-v4.pdf
git commit -m "Add static PDF for viewer"
git push
```

Luego el PDF estará en: `https://ins-proposal.vercel.app/proposal-v4.pdf`

## Opción 2: Subir a Google Drive y compartir link directo

1. Sube el PDF a Google Drive
2. Comparte > "Cualquier persona con el enlace"
3. Copia el ID del enlace (la parte entre /d/ y /view)
4. La URL directa será: `https://drive.google.com/uc?export=download&id=TU_ID_AQUI`
