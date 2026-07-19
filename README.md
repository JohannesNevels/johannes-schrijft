# versregel

Een rustige, boekachtige poëziesite. Geen menu, geen zijbalk, geen pop-ups —
alleen woorden. De homepage opent met _alles goed?_ — het sterkste gedicht als
groet — en loopt door naar het nieuwste werk.

Gebouwd met [Eleventy](https://www.11ty.dev/). Gedichten zijn losse
Markdown-bestanden; elk gedicht krijgt zijn eigen pagina.

## Lokaal bekijken

```bash
npm install        # eenmalig
npm run dev        # start een lokale server, meestal op http://localhost:8080
```

De site herbouwt zichzelf terwijl je typt. Stoppen: `Ctrl-C`.

Losse build (naar de map `_site/`):

```bash
npm run build
```

## Een nieuw gedicht toevoegen

1. Maak een nieuw bestand in [`src/gedichten/`](src/gedichten/), bijvoorbeeld
   `mijn-nieuwe-gedicht.md`. De bestandsnaam wordt de URL
   (`/gedichten/mijn-nieuwe-gedicht/`), dus houd 'm kort en met streepjes.
2. Zet er bovenaan een klein blok tussen `---`-regels (de "front matter") en
   daaronder het gedicht:

   ```markdown
   ---
   title: "mijn nieuwe gedicht"
   date: 2026-02-05
   ---
   eerste regel
   tweede regel

   nieuwe strofe na een lege regel
   ```

3. **Regelafbrekingen blijven staan** zoals je ze typt. Eén lege regel = een
   nieuwe strofe. Je hoeft dus niets bijzonders te doen — typ het gedicht zoals
   op de typemachine.
4. De volgorde (en dus vorige/volgende) loopt op `date`, oud → nieuw. Een nieuw
   gedicht met een latere datum komt vanzelf achteraan het "boek" en bovenaan de
   overzichtspagina.

Bekijk het resultaat met `npm run dev`. Tevreden? Committen en pushen — de site
gaat automatisch live (zie hieronder).

## Online zetten (GitHub Pages)

Er staat een workflow klaar in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Eenmalig
instellen:

1. Maak een GitHub-repository en push deze map naar de branch `main`.
2. Ga in de repo naar **Settings → Pages** en zet **Source** op
   **GitHub Actions**.
3. Klaar. Elke push naar `main` bouwt en publiceert de site automatisch.

### Eigen domein: versregel.nl

De site draait op het eigen domein **versregel.nl** (in de root, dus geen
`PATH_PREFIX`). Wat er voor is ingesteld:

- [`src/static/CNAME`](src/static/CNAME) met `versregel.nl` (wordt naar de root
  van de site gekopieerd — GitHub Pages leest dit uit).
- `url` in [`src/_data/site.js`](src/_data/site.js) staat op
  `https://versregel.nl`.
- DNS bij de registrar: 4× **A-record** op de apex naar `185.199.108.153`,
  `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, en een **CNAME** voor
  `www` naar `johannesnevels.github.io`.
- In de repo **Settings → Pages**: custom domain `versregel.nl` + **Enforce HTTPS**.

Zou je 'm ooit tijdelijk op `https://<gebruiker>.github.io/johannes-schrijft/`
willen previewen, zet dan `PATH_PREFIX: "/johannes-schrijft/"` in de workflow (zie
het commentaar daar) en haal `src/static/CNAME` weg.

## Aanpassen

- **Instagram-link & sitegegevens:** [`src/_data/site.js`](src/_data/site.js)
  (o.a. `instagram`, `url`, `tagline`).
- **Uiterlijk / lettertype / kleuren:** [`src/css/style.css`](src/css/style.css)
  (typemachine-letter Courier Prime staat lokaal in `src/fonts/`, licht + donker
  thema volgen automatisch de voorkeur van de bezoeker).
- **Sjablonen:** [`src/_includes/`](src/_includes/) — `base.njk` (het omhulsel),
  `home.njk` (de startpagina), `gedicht.njk` (een gedichtpagina).
