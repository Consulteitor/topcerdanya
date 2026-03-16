# Top Cerdanya — Manual de Manteniment

**Repo:** github.com/Consulteitor/topcerdanya  
**Live:** topcerdanya.com  
**Repo local:** `~/Downloads/topcerdanya`  
**Stack:** Google Sheets → Apps Script → Next.js → Vercel

---

## Índex ràpid

1. [Publicar contingut nou](#1-publicar-contingut-nou)
2. [Gestionar el Google Sheet](#2-gestionar-el-google-sheet)
3. [Scripts de manteniment](#3-scripts-de-manteniment)
4. [Control editorial de la home](#4-control-editorial-de-la-home)
5. [Pàgina /guies — format magazine](#5-pàgina-guies--format-magazine)
6. [Sistema de badges](#6-sistema-de-badges)
7. [Afegir un poble nou](#7-afegir-un-poble-nou)
8. [Gestió d'imatges (Cloudinary)](#8-gestió-dimatges-cloudinary)
9. [Deploy i Vercel](#9-deploy-i-vercel)
10. [SEO i Google Search Console](#10-seo-i-google-search-console)
11. [Legal i cookies](#11-legal-i-cookies)
12. [Diagnòstic d'errors freqüents](#12-diagnòstic-derrors-freqüents)
13. [Resum de comandes habituals](#13-resum-de-comandes-habituals)
14. [Estructura del projecte](#14-estructura-del-projecte)

---

## 1. Publicar contingut nou

### Publicar una nova guia

**Pas 1 — Crear el fitxer markdown**

```bash
touch ~/Downloads/topcerdanya/content/guies/NOM-SLUG.md
```

**Regles importants per al markdown:**
- **No** posar `# Títol` a la primera línia — el `<h1>` ja el posa el `page.js` al hero
- Comença directament amb `## Primera secció` (`<h2>`)
- Els `###` es renderitzen com `<h3>`, els `####` com `<h4>`

**Pas 2 — Afegir la fila al Google Sheet (tab Guies)**

| Camp | Exemple |
|---|---|
| `id` | `que-fer-a-la-cerdanya` |
| `slug` | `que-fer-a-la-cerdanya` |
| `titol` | Què fer a la Cerdanya: la guia completa 2026 |
| `meta_description` | Text per a Google (155 caràcters màx) |
| `categoria` | gastronomia / rutes / allotjament / amb-nens / immobiliaria / hivern / estiu / tardor / primavera / pobles / general |
| `posicio_home` | hero / home1 / home2 / home3 / home4 *(o buit)* |
| `destacada` | TRUE / FALSE *(per a la pàgina /guies)* |
| `estat` | publicat |
| `data_publicacio` | 15/03/2026 |
| `imatge` | URL de Cloudinary |

**Pas 3 — Push**
```bash
cd ~/Downloads/topcerdanya
git add content/guies/NOM-SLUG.md
git commit -m "feat: nova guia NOM-SLUG"
git push
```

---

### Publicar una nova notícia

Les notícies s'afegeixen directament al **Google Sheet (tab Noticies)**. No cal fitxer markdown.

| Camp | Valor |
|---|---|
| `id` | slug-de-la-noticia |
| `titol` | Títol de la notícia |
| `resum` | 2-3 frases de resum |
| `cat` | Salut / Mobilitat / Cultura / Esports / Patrimoni / Economia |
| `autor` | Redacció Top Cerdanya |
| `data` | 15 mar 2026 |
| `min` | 3 |
| `imatge` | URL de Cloudinary (opcional) |

No cal push. S'actualitza sol en menys d'una hora. Si és urgent:
```bash
cd ~/Downloads/topcerdanya
git commit --allow-empty -m "redeploy: nova noticia"
git push
```

---

### Publicar un negoci al directori

Afegir fila al **Google Sheet (tab Negocis)**, llavors sincronitzar:
```bash
python3 ~/Downloads/sync-negocis.py
cd ~/Downloads/topcerdanya
git add data/negocis.json
git commit -m "data: actualitzar directori"
git push
```

---

## 2. Gestionar el Google Sheet

**URL de l'Apps Script API:**
```
https://script.google.com/macros/s/AKfycbwoPQmck8k0aDPQ6ijOY0NRFzZ4TI77kd48eZQUR8Izigl-YHnXW1f_zazAhxEBMAhwzQ/exec?sheet=NOM_TAB
```

**Tabs disponibles:** `Guies` · `Noticies` · `Negocis` · `Pobles` · `Badges`

### Tab Badges (nou)

Controla el sistema de verificació dels badges. Camps necessaris:

| Camp | Descripció |
|---|---|
| `slug` | Identificador del negoci (ha de coincidir amb el del directori) |
| `nom` | Nom del negoci |
| `poble` | Poble on és el negoci |
| `categoria` | gastronomia / allotjament / activitats... |
| `tipus` | Present a Top Cerdanya / Recomanat / Millor Restaurant 2026 |
| `actiu` | TRUE / FALSE |
| `data_inici` | 01/04/2026 |
| `data_fi` | 01/04/2027 |

**⚠️ Problemes habituals del Sheet:**
- La columna `valoracio` ha d'estar formatada com a **Text pla** — si apareixen timestamps, executar `fix-valoracions.py`
- Els slugs no poden tenir accents ni espais: `que-fer-cerdanya` ✓ / `Què fer?` ✗
- El camp `destacada` accepta `TRUE` o `FALSE` (text pla, no checkbox)
- El camp `posicio_home` accepta exactament: `hero`, `home1`, `home2`, `home3`, `home4`

---

## 3. Scripts de manteniment

Tots els scripts es troben a `~/Downloads/`.

### `sync-negocis.py` — Sincronitzar directori
```bash
python3 ~/Downloads/sync-negocis.py
```
Executar cada vegada que afegeixes, edites o elimines negocis al Sheet.

---

### `importar-restaurants.py` — Importar des de Google Places
```bash
ANTHROPIC_API_KEY="sk-ant-..." python3 ~/Downloads/importar-restaurants.py
```
Genera `restaurants_sheet.csv` per importar al Sheet. Després:
```bash
python3 ~/Downloads/sync-negocis.py
cd ~/Downloads/topcerdanya
git add data/negocis.json
git commit -m "data: nous restaurants"
git push
```

---

### `fix-valoracions.py` — Netejar valoracions corruptes
```bash
python3 ~/Downloads/fix-valoracions.py
cd ~/Downloads/topcerdanya
git add data/negocis.json
git commit -m "fix: valoracions"
git push
```

---

### Scripts de creació de pobles (ja executats)

```bash
bash ~/Downloads/crear-guies-puigcerda.sh   # ✅ Fet
bash ~/Downloads/crear-guies-bellver.sh     # ✅ Fet
bash ~/Downloads/crear-guies-llivia.sh      # ✅ Fet
bash ~/Downloads/crear-guies-alp.sh         # ✅ Fet
```

---

### Scripts de SEO i fixes (ja executats)

```bash
bash ~/Downloads/fix-seo-pobles.sh         # ✅ Títols + openGraph pobles
bash ~/Downloads/fix-opengraph-static.sh   # ✅ openGraph pàgines estàtiques
bash ~/Downloads/fix-h1-correcte.sh        # ✅ H1 duplicat corregit
bash ~/Downloads/fix-opengraph-errors.sh   # ✅ Errors de build openGraph
```

---

### Scripts de funcionalitats (ja executats)

```bash
bash ~/Downloads/nova-home.sh              # ✅ Nova home magazine
bash ~/Downloads/crear-guies-magazine.sh   # ✅ Pàgina /guies magazine
bash ~/Downloads/crear-cookies-banner.sh   # ✅ Banner cookies GDPR
bash ~/Downloads/crear-pagines-legals.sh   # ✅ Avís legal + privacitat
bash ~/Downloads/crear-badge-system.sh     # ✅ Sistema de badges
```

---

## 4. Control editorial de la home

La home es controla **100% des del Google Sheet** sense tocar codi.

### Camp `posicio_home` (tab Guies)

| Valor | On apareix a la home |
|---|---|
| `hero` | Hero principal superior (imatge gran + títol gran, fons blanc) |
| `home1` | Primera targeta gran del bloc Guies |
| `home2` | Segona targeta gran del bloc Guies |
| `home3` | Tercera posició (format compacte amb miniatura) |
| `home4` | Quarta posició (format compacte amb miniatura) |
| *(buit)* | Apareix a `/guies` però no als slots fixos de la home |

**Fallback automàtic:** si un slot no té cap guia assignada, la home omple automàticament amb les guies amb imatge per ordre de data.

**Per canviar la guia destacada:**
1. Al Sheet, posa `hero` a la nova guia i treu-lo de l'antiga
2. Espera 1 hora o força redeploy:
```bash
cd ~/Downloads/topcerdanya
git commit --allow-empty -m "redeploy: canvi guia destacada"
git push
```

### Camp `destacada` (tab Guies)
Controla quina guia apareix com a peça gran dins el seu bloc de categoria a la pàgina `/guies`.
- `TRUE` → apareix com a destacada del bloc de la seva categoria
- `FALSE` o buit → apareix com a targeta lateral

---

## 5. Pàgina /guies — format magazine

La pàgina `/guies` té una estructura editorial per blocs:

| Bloc | Contingut | Control |
|---|---|---|
| Hero | Una guia destacada global | Camp `destacada: TRUE` al Sheet |
| Essencials | 3 guies pilars fixes | Hardcoded per slug al `page.js` |
| Gastronomia | Destacada + 3 laterals | `categoria: gastronomia` + `destacada` |
| Rutes | Destacada + 3 laterals | `categoria: rutes` |
| Amb nens | Destacada + 3 laterals | `categoria: amb-nens` |
| Allotjament | Destacada + 3 laterals | `categoria: allotjament` |
| Recents | Últimes 4 per data | Automàtic per `data_publicacio` |
| Temporades | Hivern / Primavera / Estiu / Tardor | `categoria: hivern/primavera/estiu/tardor` |
| Pobles | Links als 4 pobles | Hardcoded |
| Immobiliària | Destacada + 3 laterals | `categoria: immobiliaria` |
| Arxiu | Totes les guies | Automàtic |

**Les guies essencials** (hardcoded per slug):
- `que-fer-a-la-cerdanya-guia-practica-i-realista-per-gaudir-ne-tot-lany`
- `on-menjar-a-la-cerdanya-guia-completa-per-encertar-restaurants-2026`
- `allotjament-rural-cerdanya-com-triar-i-on-dormir`

Per canviar-les cal editar `app/guies/page.js` (array `ESSENCIALS_SLUGS`).

---

## 6. Sistema de badges

### Pàgines del sistema

| URL | Funció |
|---|---|
| `/badge` | Pàgina pública amb els tres nivells, previews i codis d'embed |
| `/badge/verificat/[slug]` | Verificació pública d'un badge concret |

### Tres nivells de badge

| Badge | Preu | Per a qui |
|---|---|---|
| Present a Top Cerdanya | Gratuït | Qualsevol negoci del directori |
| Recomanat per Top Cerdanya | 79 €/any | Negocis destacats |
| Millor Restaurant Cerdanya 2026 | 149 €/any | Exclusiu rànquing Google 4.8+ |

### Com afegir un negoci verificat

1. Al **Google Sheet (tab Badges)**, afegir fila amb `actiu: TRUE`
2. La pàgina `/badge/verificat/[slug]` mostra automàticament ✓ verd

### Com funciona el control anti-trampa

El codi d'embed de cada badge inclou un link a `/badge/verificat/nom-negoci`. Si un negoci posa el badge sense estar al Sheet, la pàgina de verificació mostra ✗ vermell. Un cop al mes, cerca `site:*.com "topcerdanya.com"` per detectar usos no autoritzats.

### Flux de venda

1. Enviar mail als 14 restaurants del rànquing oferint el badge **gratuïtament** (early adopters)
2. Quan hi hagi 10-15 badges actius, monetitzar els nous
3. **No publicar preus** fins tenir trànsit suficient

---

## 7. Afegir un poble nou

**Exemple: Meranges**

**Pas 1 — Crear els 7 fitxers markdown**
```bash
# A content/pobles/:
# meranges.md (megapilar)
# meranges-que-fer.md
# meranges-restaurants.md
# meranges-allotjament.md
# meranges-immobiliaria.md
# meranges-rutes.md
# meranges-amb-nens.md
```

**Regla:** cap fitxer ha de tenir `# Títol` a la primera línia. Comença amb `## Primera secció`.

**Pas 2 — Afegir fila al Sheet (tab Pobles)**

| Camp | Valor |
|---|---|
| `id` | 5 |
| `slug` | `meranges` |
| `titol` | Meranges |
| `meta_description` | El poble més alt de la Cerdanya... |
| `imatge` | URL Cloudinary |

**Pas 3 — Push**
```bash
cd ~/Downloads/topcerdanya
git add content/pobles/meranges*.md
git commit -m "feat: guies de Meranges"
git push
```

### Pobles publicats

- ✅ Puigcerdà (`/pobles/puigcerda`)
- ✅ Bellver de Cerdanya (`/pobles/bellver-de-cerdanya`)
- ✅ Llívia (`/pobles/llivia`)
- ✅ Alp (`/pobles/alp`)

Candidats per al 5è poble: **Meranges** (llac de Malniu) o **Bolvir** (millor allotjament).

---

## 8. Gestió d'imatges (Cloudinary)

**Cloud name:** `ddal1prbs`

**Carpetes:**
```
negocis/     → fotos de restaurants i negocis del directori
guies/       → imatges de portada de les guies
noticies/    → fotos per a les notícies
pobles/      → fotos dels pobles
badges/      → fitxers SVG/PNG dels badges
```

**Dimensions recomanades:**
- Guies (portada): 1200×675px (ratio 16:9)
- Negocis: 800×600px (ratio 4:3)
- Pobles (hero): 1600×900px (ratio 16:9)

**⚠️ Sobre imatges de Google Maps:** no allotjar imatges de Google Places. Les URLs expiren i els termes de servei no ho permeten. Per als negocis importants, buscar la foto a la web o Instagram del negoci i pujar-la a Cloudinary manualment.

---

## 9. Deploy i Vercel

**Vercel desplega automàticament** cada push a `main`. Temps: 2-3 minuts.

### Flux normal
```bash
cd ~/Downloads/topcerdanya
git add .
git commit -m "descripció del canvi"
git push
```

### Forçar redeploy sense canvis de codi
```bash
cd ~/Downloads/topcerdanya
git commit --allow-empty -m "redeploy: motiu"
git push
```
Útil per: canvis al Sheet (imatges, `posicio_home`, badges nous) que vols que s'apliquin immediatament sense esperar 1 hora de caché.

### Cache del Sheet
El `revalidate` és de **3600 segons (1 hora)**. Sense redeploy, els canvis al Sheet tarden fins a 1 hora en aparèixer. Amb un redeploy buit, apareixen en 2-3 minuts.

### Si un deploy falla
Errors més comuns:
- **`'use client'` + `export const metadata`** — incompatibles. Cal treure el metadata del component client
- **Coma extra al metadata** — el script d'openGraph pot introduir una coma duplicada. Revisar el fitxer afectat
- **Paquet npm no instal·lat** — verificar que el paquet és a `package.json`
- **Slug numèric** — afegir `String(n.id)` al `generateStaticParams()`
- **Fitxer markdown falta** — el `generateStaticParams()` llegeix el Sheet però el `.md` no existeix al repo

---

## 10. SEO i Google Search Console

**URL Search Console:** search.google.com/search-console  
**Propietat:** `topcerdanya.com`

### OpenGraph i canonical

Totes les pàgines del site tenen `openGraph` i `canonical` configurats:
- Pàgines estàtiques (`/guies`, `/pobles`, `/inmobiliaria`, `/noticies`) — via `export const metadata`
- Pàgines dinàmiques (`/guies/[slug]`, `/pobles/[slug]`, `/pobles/[slug]/[subtema]`) — via `generateMetadata()`
- ⚠️ `/directori` — no té openGraph (és `'use client'`, incompatible)

### Quan sol·licitar indexació manual

Cada vegada que publiques una guia important, sol·licita indexació a Search Console:
1. Search Console → Inspecció de l'URL
2. Enganxa la URL
3. "Sol·licita la indexació"
4. Màxim ~10 URLs al dia

**URLs prioritàries pendents d'indexació:**
- `topcerdanya.com/guies/que-fer-a-la-cerdanya`
- `topcerdanya.com/guies/14-millors-restaurants-cerdanya-google-2026`
- `topcerdanya.com/guies/top10-restaurants-puigcerda-2026`
- `topcerdanya.com/pobles/bellver-de-cerdanya`

### Dades de Search Console (març 2026)

30 consultes, 0 clics, posició mitjana 37. Oportunitats immediates (posició < 15):

| Consulta | Posició | Acció |
|---|---|---|
| bellver de cerdanya | 8,7 | Títol millorat ✅ |
| capital de la cerdanya | 9,5 | Mencionar als primers 100 paraules |
| pobles de la cerdanya | 10,3 | H1 explícita a `/pobles` |
| restaurants puigcerdà | 13 | Sol·licitar indexació del top 10 |
| que fer a la cerdanya | 28 | Guia publicada ✅, sol·licitar indexació |

### Sitemap
```
https://topcerdanya.com/sitemap.xml
```
Dinàmic, s'actualitza amb cada deploy. Verificar a Search Console → Mapes del web.

---

## 11. Legal i cookies

### Pàgines legals

| URL | Contingut | Indexada |
|---|---|---|
| `/avis-legal` | LSSI-CE: titular, condicions d'ús, propietat intel·lectual | No (noindex) |
| `/politica-de-privacitat` | RGPD + LOPDGDD: dades, base legal, drets, contacte AEPD | No (noindex) |
| `/politica-de-cookies` | Explicació GA4, localStorage, com gestionar | No (noindex) |

### Sistema de cookies

El banner de cookies (`components/CookieBanner.js`) gestiona GA4 condicionalment:
- Guarda la decisió a `localStorage` amb la clau `tc_cookies`
- `tc_cookies = 'acceptat'` → GA4 s'injecta dinàmicament
- `tc_cookies = 'rebutjat'` → GA4 no es carrega mai
- El banner no apareix si ja hi ha una decisió guardada

**GA4 (`G-QY8PYQMKHR`) no es carrega sense consentiment.** Això és correcte per GDPR.

### Quan migrar a una CMP certificada

Quan s'implementi AdSense, caldrà substituir el banner simple per una CMP certificada TCF 2.2 (Cookiebot, Axeptio, CookieYes). El banner actual no és suficient per a publicitat programàtica.

---

## 12. Diagnòstic d'errors freqüents

### "Application error: a client-side exception"
**Causa:** valoració numèrica corrupte (timestamp).
```bash
python3 ~/Downloads/fix-valoracions.py
cd ~/Downloads/topcerdanya && git add data/negocis.json
git commit -m "fix: valoracions" && git push
```

### La pàgina no s'actualitza (contingut antic)
```bash
cd ~/Downloads/topcerdanya
git commit --allow-empty -m "redeploy" && git push
```

### Una guia nova porta a 404
El slug del fitxer `.md` ha de coincidir exactament amb la columna `slug` del Sheet.

### H1 duplicat a una guia o poble
El fitxer `.md` té `# Títol` a la primera línia. Eliminar-lo: el `<h1>` ja el posa el `page.js`.

### `export const metadata` en un fitxer `'use client'`
Incompatible amb Next.js. Treure el bloc `metadata` del fitxer, o separar en Server Component + Client Component.

### Error "Unexpected token `,`" al metadata
Coma extra davant de `openGraph`. Obrir el fitxer afectat i eliminar la coma duplicada.

---

## 13. Resum de comandes habituals

```bash
# ── Publicar qualsevol canvi ──────────────────────────────
cd ~/Downloads/topcerdanya
git add . && git commit -m "descripció" && git push

# ── Forçar actualització sense canvis ────────────────────
cd ~/Downloads/topcerdanya
git commit --allow-empty -m "redeploy" && git push

# ── Sincronitzar directori ────────────────────────────────
python3 ~/Downloads/sync-negocis.py
cd ~/Downloads/topcerdanya
git add data/negocis.json && git commit -m "data: directori" && git push

# ── Nova guia (flux complet) ──────────────────────────────
# 1. Crear content/guies/slug.md (sense # a la primera línia)
# 2. Afegir fila al Sheet (slug, titol, meta, categoria, estat=publicat)
# 3. Pujar imatge a Cloudinary carpeta guies/ i posar URL al Sheet
cd ~/Downloads/topcerdanya
git add content/guies/slug.md && git commit -m "feat: guia slug" && git push

# ── Afegir badge verificat ────────────────────────────────
# 1. Afegir fila al Sheet tab Badges (slug, nom, actiu=TRUE, dates)
cd ~/Downloads/topcerdanya
git commit --allow-empty -m "redeploy: nou badge verificat" && git push
```

---

## 14. Estructura del projecte

```
topcerdanya/
├── app/
│   ├── page.js                          ← Home (slots hero/home1-4 des del Sheet)
│   ├── layout.js                        ← Layout global (Navbar, Footer, CookieBanner)
│   ├── globals.css                      ← Estils globals + media queries responsive
│   ├── guies/
│   │   ├── page.js                      ← Hub de guies (/guies) — format magazine
│   │   └── [slug]/page.js               ← Guia individual
│   ├── pobles/
│   │   ├── page.js                      ← Hub de pobles (/pobles)
│   │   ├── [slug]/page.js               ← Megapilar del poble
│   │   └── [slug]/[subtema]/page.js     ← Subpàgines (que-fer, restaurants...)
│   ├── badge/
│   │   ├── page.js                      ← Pàgina pública de badges
│   │   └── verificat/[slug]/page.js     ← Verificació pública d'un badge
│   ├── directori/page.js                ← Directori ('use client' — sense metadata)
│   ├── inmobiliaria/page.js             ← Subhome immobiliària
│   ├── noticies/                        ← Notícies
│   ├── avis-legal/page.js               ← Avís legal (noindex)
│   ├── politica-de-privacitat/page.js   ← Política de privacitat (noindex)
│   ├── politica-de-cookies/page.js      ← Política de cookies (noindex)
│   ├── not-found.js                     ← Pàgina 404 personalitzada
│   └── sitemap.js                       ← Sitemap dinàmic
├── components/
│   ├── Navbar.js                        ← Capçalera (data dinàmica, temps, menú mobile)
│   └── CookieBanner.js                  ← Banner GDPR + injecció condicional GA4
├── content/
│   ├── guies/                           ← Fitxers .md de les guies (sense # inicial)
│   └── pobles/                          ← Fitxers .md dels pobles i subpàgines
├── data/
│   └── negocis.json                     ← Directori (sincronitzat des del Sheet)
└── lib/
    └── sheets.js                        ← Funcions de connexió al Google Sheet (revalidate: 3600)
```

### Google Sheet — tabs i camps principals

| Tab | Camps clau |
|---|---|
| `Guies` | id, slug, titol, meta_description, categoria, posicio_home, destacada, estat, data_publicacio, imatge |
| `Noticies` | id, titol, resum, cat, autor, data, min, imatge |
| `Negocis` | id, nom, categoria, poble, descripcio, telefon, web, valoracio, ressenyes, tags, destacat |
| `Pobles` | id, slug, titol, meta_description, imatge |
| `Badges` | slug, nom, poble, categoria, tipus, actiu, data_inici, data_fi |

---

*Document actualitzat el 16/03/2026 · Top Cerdanya*
