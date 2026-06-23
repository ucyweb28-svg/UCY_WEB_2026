# UCY — Architecture & spec v1

*Document de référence — à compléter/amender au fil des sessions*

---

## 1. Vision

UCY devient le hub de confiance pour les francophones (et anglophones) qui s'installent ou vivent en Israël — pas un média d'humour façon JewBuzz, mais la référence **pratique** : business, logement, et tout ce dont on a besoin pendant une alya.

Trois piliers, statut différent :
- **Studio** — agence digitale (activité existante, autonome)
- **Stays** — gestion locative courte durée (activité existante, autonome)
- **Réseau** — carnet d'adresses de confiance (nouveau, construit sur le cercle personnel du fondateur)

Studio et Stays apparaissent à la fois comme verticales autonomes (`/studio`, `/stays`) et comme entrées vedettes à l'intérieur du Réseau (Studio sous "Business & Argent", Stays sous "Logement").

**Priorités business pour la home/le Réseau (6 mois)** : 1) plus de propriétaires confiant leur bien à Stays, 2) notoriété/trafic général. Pas la conversion rapide de leads Studio ni les réservations voyageurs — ça influence tous les choix de design en aval (profondeur de scroll, partage, clarté du chemin vers "Devenir partenaire").

---

## 2. Architecture du site (Option C)

```
ucyweb.fr (maison mère)
├── /studio   (agence — existant)
├── /stays    (locations — existant)
└── /reseau   (carnet d'adresses)
    ├── /reseau/immobilier-financement
    ├── /reseau/business-argent
    ├── /reseau/sante-famille
    ├── /reseau/quotidien
    └── /reseau/s-installer (admin/légal)
```

Nav globale avec mégamenu (3 entrées : Studio / Stays / Réseau), chaque entrée ouvrant son panneau au survol/clic — pas de comportement lié au scroll.

---

## 3. Page d'accueil — structure narrative

Ordre de scroll, dans cet ordre précis :

1. **Nav** (mégamenu + icône recherche/routeur IA toujours visible)
2. **Ouverture humour** — courte, registre "vivre en Israël, tout le monde se connaît" (Sarcelles)
3. **Présentation perso** — UI originale
4. **"Comme vous vous en doutez..."** — la famille en cartes. Chaque carte : ton fun (le "parrain spirituel" etc.) + une ligne de crédibilité sérieuse en dessous (diplôme, années d'expérience, nom du cabinet). Formuler comme *"ça a commencé avec eux"*, pas *"voici notre réseau"* — laisse la porte ouverte à l'élargissement sans paraître n'être "que" l'affaire de famille.
5. **Prestations** (Studio / Stays / Vente / Architecture d'intérieur), chacune reliée visuellement à la personne famille présentée juste avant
6. **Bloc de clôture fort**, dédié, qui pousse "Devenir partenaire" sans ambiguïté

---

## 4. Mégamenu / Taxonomie Réseau

5 colonnes :

| Colonne | Contenu |
|---|---|
| **S'installer** (admin/légal) | avocat francophone, démarches Misrad HaPnim/Teoudat Oleh, ouverture compte bancaire |
| **Logement** | Stays (vedette), achat immobilier (frère), courtier mashkanta'ot, archi intérieure (cousine), déménagement international |
| **Business & Argent** | Studio (vedette), création d'entreprise/Osek Patour, comptable, fiscaliste franco-israélien |
| **Santé & Famille** | dentiste (mère), infirmière/esthéticienne (sœurs), ulpan/écoles, assurance santé |
| **Quotidien & Bonnes adresses** | restos, services courants, transport/permis — registre léger, traité utile |

Chaque colonne du mégamenu : 1-2 profils en vedette + lien "voir tout" vers la page catégorie correspondante.

**Règle de présentation** (résout la tension "plusieurs contacts par catégorie") : la home reste intime et sélective (famille proche uniquement). Les pages `/reseau/*` affichent **tous** les contacts d'une catégorie à égalité — y compris les membres de la famille, qui réapparaissent là aussi.

---

## 5. Page catégorie — structure de données & recherche

**Format de données** : fichier structuré (JSON/TS) par catégorie — pas de CMS externe. Volume attendu trop faible pour le justifier.

**Champs par profil** :
- nom, catégorie, sous-spécialité (tag)
- ville (Jérusalem / Tel Aviv / Netanya / Raanana)
- langue(s) parlée(s) (FR / EN / HE)
- lien de confiance (famille proche / réseau élargi) — usage interne, pas forcément affiché
- contact (WhatsApp pré-rempli selon contexte)

**Système de recherche** :
- Filtres actifs dès le lancement sur **toutes** les catégories, même à 2-3 profils
- **Recherche globale** en plus, accessible partout (nav + home) — même champ que le routeur IA (section 6)
- **Règle SEO non-négociable** : chaque page catégorie doit afficher tous les profils en HTML au chargement (SSR/SSG). Le filtre/recherche est une amélioration JS par-dessus du contenu déjà rendu — jamais un chargement qui cache le contenu des crawlers.
- Pages catégorie groupées (5-7 pages solides), pas une page par micro-sous-catégorie, pour éviter le thin content.

**Cases vides actuellement** : aucune — contacts déjà identifiés sur toutes les catégories. Si une catégorie venait à manquer de profils à l'avenir, traiter comme opportunité de recrutement ("Vous êtes X ? Rejoignez notre réseau") plutôt que de cacher le vide.

---

## 6. Routeur IA

- Champ "Dites-moi ce que vous cherchez", vivant dans la nav (icône permanente), pas dans le flux de scroll de la home
- Sert deux usages : routage intelligent (ex. "je viens d'arriver, je veux ouvrir mon business et trouver un appart" → Studio + Stays + bon contact Réseau) **et** recherche globale dans le Réseau (ex. "comptable francophone Tel Aviv")
- Peut pré-remplir le message WhatsApp de contact avec le contexte de la recherche
- **Ne pas faire** : chatbot généraliste répondant à des questions de visa/droit du travail/immigration — hors périmètre, risque de responsabilité.

---

## 7. Points de vigilance légaux

- **Achat immobilier** : si UCY/le frère perçoit une commission sur transaction, vérifier l'obligation de licence de courtage (תיווך) en Israël. *Claude n'est pas juriste — à valider avec un avocat.*
- **Séparer les niveaux de confiance** : enjeux élevés/irréversibles (immobilier, financement, juridique) ≠ enjeux faibles (restos, quotidien). Formulation prudente sur les catégories sensibles : "recommandé par notre réseau", jamais "garanti par UCY".
- Clarifier dans chaque fiche immobilier/financement si UCY recommande (apporteur) ou opère (responsable légal) — déterminant pour qui porte le risque.

---

## 9. Système typographique & grille (référentiel design system)

*Basé sur un référentiel de design system professionnel retrouvé (grille, typo, boutons, responsive). Valeurs tranchées pour UCY — appliquées uniformément sur Studio, Stays et le futur Réseau, pas seulement les nouvelles pages.*

### Grille & container
- Container : `max-w-7xl mx-auto px-6 lg:px-8` (1280px — une des tailles de grille standards). Sur grand écran, `mx-auto` génère naturellement des marges généreuses (~320px à 1920px) ; le `px-8` n'est qu'un filet de sécurité sur les résolutions proches de 1280-1440px.
- Colonnes de mise en page : 12 (desktop) / 8 (tablette) / 4 (mobile) — déjà compatible avec le split 7/12–5/12 utilisé dans StaysShowcase.
- Breakpoints de référence : desktop 1280/1366/1440/1536, tablette 1024/1280, mobile 360/375/414.

### Hauteurs structurelles
- NAV : hauteur fixe **84px**, sur tout le site.
- NAV + Header (hero) combinés : max **850px** desktop, et toujours laisser au moins ~550px visibles avant le pli pour suggérer le scroll.

### Échelle typographique (desktop / tablette / mobile)
| Niveau | Desktop | Tablette | Mobile | Poids | Token CSS |
|---|---|---|---|---|---|
| H1 | 88px | 64px | 40px | Extrabold | `ds-h1` |
| H2 | 52px | 40px | 28px | Bold/Extrabold | `ds-h2` |
| H3 section | 40px | 30px | 20px | Bold | `ds-h3` |
| Card title | 18px | 18px | 18px | Semibold | `card-title` |
| Texte long (corps) | 16-18px | — | 16-18px | Regular/Medium | — |
| Texte court (intro) | 18-20px | — | 18-20px | Regular/Medium | — |
| Boutons | **16-18px** (compromis UCY — le référentiel cite 22-28px, jugé trop "retail" pour notre positionnement) | — | 16-18px | Semibold | — |

> **Exception documentée — `AISection.tsx`** : le H2 de cette section conserve intentionnellement `clamp(24px, 2.8vw, 40px)` au lieu du token `ds-h2`. Raison : contrainte de layout bi-colonne (55/45) — le titre doit rester sur 2-3 lignes maximum. **Ne pas migrer vers `ds-h2`** dans les futures sessions. (Décision tranchée commit `7de5f3f`, juin 2026.)

### Rythme vertical
- Entre sections : `py-16 lg:py-24` (sections standards), `py-24 lg:py-32` (hero/ouvertures de page) — cohérent avec la fourchette 100-120px du référentiel.

### Système de boutons
- **Une seule forme dans tout le site : pill complet** (border-radius full) — le référentiel propose plusieurs options (5px / 12px / pill), UCY tranche pour le pill partout, déjà notre convention Studio/Stays.
- Hiérarchie à 3 niveaux, déjà en place :
  - **Primary** : fond plein (couleur ou dégradé), toujours rempli sauf à l'état disabled (gris).
  - **Secondary** : outline (contour seul, pas de fond), même logique d'état, disabled en gris.
  - **Tertiary** : texte + soulignement, change de couleur au survol, état disabled en gris.
- 4 états obligatoires sur **tous** les boutons : défaut, survol (hover), actif (pressed/clic), désactivé (disabled — toujours en gris, jamais dans la couleur de marque).

### Mégamenu — interaction
- Ouverture au survol (`mouse enter`) sur l'item de nav correspondant, fermeture au `mouse leave` (retour à l'état par défaut) — confirme la décision déjà prise (pas de déclenchement au scroll).
- Transition recommandée : fondu (dissolve), pas de glissement brutal.

### Spécificités mobile/tablette
- Menu hamburger (pas de mégamenu déplié) sur mobile et tablette.
- Pas d'état "survol" sur mobile/tablette (pas de souris) — uniquement défaut/actif/disabled.
- Scroll tactile natif.
- Boutons côte à côte ou empilés : toujours de **même taille** entre eux, jamais l'un plus grand que l'autre.


- ~~Nom définitif du pilier "Réseau"~~ → **Tranché.** Pas de nom de marque dédié : ce pilier est porté directement par **UCY** (la maison mère), pas une troisième sous-marque parallèle à Studio/Stays. Dans la nav, l'entrée mégamenu garde un libellé générique ("Réseau" ou "Accueil") plutôt qu'un nom stylisé — pas de logo ni de palette à décliner une troisième fois.
- Modèle de monétisation du Réseau (gratuit pour construire la confiance d'abord ; commission par lead à introduire plus tard, une fois le trafic prouvé)
- Comportement mobile du mégamenu (accordéon empilé, façon Decathlon) — à spécifier séparément
- Formulaire "devenir partenaire propriétaire" (Stays) vs futur formulaire "rejoindre le Réseau" — parcours séparés à confirmer
