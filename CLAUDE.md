# CLAUDE.md — UCY Studio
> Fichier de contexte persistant pour Claude Code.
> À placer à la racine du projet. Ne jamais supprimer.

---

## 🏢 Studio

| Champ | Valeur |
|---|---|
| Nom | UCY Studio |
| Fondateur | Yonathan Chetrit |
| Localisations | Jérusalem, Israël · Paris, France |
| Positionnement | Studio de design & développement digital haut de gamme |
| Services | Logo, branding, print, UI/UX, design systems, web design, développement web (code & no-code, WordPress & custom), stratégie digitale & réseaux sociaux |

---

## 🛠 Stack technique

```
Framework     : Next.js 14 — App Router
Language      : TypeScript (strict mode)
Styling       : Tailwind CSS v4
Animations    : Framer Motion
Déploiement   : Vercel
Emails        : Resend (via API Route Next.js)
Analytics     : Plausible
i18n          : Français (défaut) + Anglais
Thème         : Light mode uniquement — pas de dark mode, pas de toggle
```

---

## 📁 Structure des fichiers

```
/app
  /[locale]         → routing i18n (fr / en)
    /page.tsx       → landing page principale
    /layout.tsx     → layout global
  /api
    /contact        → route Resend pour le formulaire
/components
  /sections         → un fichier par section de la landing (Hero, Services, Portfolio…)
  /ui               → composants réutilisables (Button, Badge, Card…)
  /layout           → Nav, Footer
/lib
  /i18n             → dictionnaires de traduction fr.json / en.json
  /utils            → fonctions utilitaires
/public
  /images           → assets visuels optimisés
  /fonts            → polices locales si applicable
```

---

## 🌍 i18n — Règles de traduction

- Toute chaîne de texte visible passe par les fichiers `/lib/i18n/fr.json` et `/lib/i18n/en.json`
- **Jamais de texte hardcodé** dans les composants
- Le français est la langue par défaut (`defaultLocale: 'fr'`)
- Les clés de traduction suivent le format `section.element` — ex: `hero.headline`, `services.cta`
- Ne jamais modifier le copy anglais sans modifier le copy français en même temps

---

## 🎨 Design — Règles absolues

- **Light mode uniquement** — ne jamais ajouter de classes `dark:` Tailwind
- Ne jamais modifier les design tokens (couleurs, typographie, espacements) sans instruction explicite de Yonathan
- Ne jamais toucher aux `keyframes` ou configurations d'animation Framer Motion existantes
- Chaque nouveau composant doit être **responsive mobile-first**
- Résolutions à tester : 375px / 768px / 1280px / 1440px
- Aucun composant ne doit provoquer de scroll horizontal

---

## 📐 Conventions de code

- **Composants** : PascalCase — `HeroSection.tsx`, `ServiceCard.tsx`
- **Hooks custom** : camelCase préfixé `use` — `useScrollAnimation.ts`
- **Utils** : camelCase — `formatWhatsAppLink.ts`
- **Fichiers i18n** : snake_case pour les clés — `hero.main_headline`
- Imports : absolute paths via `@/` (configuré dans `tsconfig.json`)
- Pas de `any` TypeScript — typage strict obligatoire
- Chaque composant de section reçoit ses textes via props typées, jamais hardcodés

---

## 📱 Contact & liens

```
WhatsApp FR   : +33 6 56 68 46 40
WhatsApp IL   : +972 58 746 7029
Domaine       : ucyweb.fr
Instagram     : https://www.instagram.com/ucy_studio/
LinkedIn      : https://www.linkedin.com/company/115831904/
Behance       : https://www.behance.net/yonathanchetrit3
```

> Les liens WhatsApp doivent utiliser le format :
> `https://wa.me/[numéro_sans_espaces_ni_+]?text=[message_encodé]`
> Ex FR : `https://wa.me/33656684640?text=Bonjour%20UCY%20Studio`
> Ex IL : `https://wa.me/972587467029?text=Bonjour%20UCY%20Studio`

---

## 🔒 Règles d'autonomie — IMPORTANT

Claude Code doit **toujours** respecter ce protocole :

1. **Avant toute modification** → décrire précisément ce qui va changer et attendre la validation de Yonathan
2. **Une section à la fois** → ne jamais modifier plusieurs sections en une seule opération non validée
3. **Jamais supprimer** un fichier, composant ou section existant sans confirmation explicite
4. **Jamais remplacer** une animation ou un effet visuel existant sans confirmation explicite
5. **Toujours proposer** le nouveau copy dans les deux langues (FR + EN) avant de l'intégrer
6. En cas de doute sur l'intention → **demander, ne pas interpréter**

---

## 🗂 Ordre des sections — Landing page

```
1.  Nav               → sticky, logo + ancres + CTA WhatsApp
2.  Hero              → headline fort, sous-titre Jerusalem × Paris, 2 CTAs
3.  Trust Strip       → logos clients en défilement
4.  Stats Bar         → chiffres clés (projets, clients, satisfaction)
5.  Services          → 4 cards (Web, UI/UX, Branding, Stratégie)
6.  Tools             → outils utilisés (Figma, Adobe CC, Framer, WordPress…)
7.  IA Section        → différenciateur IA dans la production
8.  Portfolio         → 4 case studies (Maison Éclat, Daniella Studio, Nexus Capital, Aurora Media)
9.  About + Team      → Yonathan + équipe, manifeste de marque
10. Footer CTA        → "Démarrons quelque chose ensemble" + WhatsApp CTA
11. Footer            → liens, adresses Jérusalem + Paris, réseaux sociaux
```

---

## ✅ Checklist avant chaque déploiement

- [ ] `npm run build` passe sans erreur TypeScript
- [ ] Toutes les chaînes traduites existent en FR et EN
- [ ] Aucun lien WhatsApp avec numéro incorrect
- [ ] Plausible script présent dans `layout.tsx`
- [ ] Images optimisées via `next/image`
- [ ] Métadonnées SEO renseignées (title, description, og:image) en FR et EN
- [ ] Formulaire Resend testé en staging avant prod
- [ ] Responsive validé sur 375px, 768px, 1280px
