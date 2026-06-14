export type ServiceSlug =
  | 'web-design'
  | 'ui-ux'
  | 'branding'
  | 'strategie-digitale'
  | 'seo'
  | 'application-mobile'
  | 'maintenance';

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface ServiceFeature {
  title: LocalizedText;
  desc: LocalizedText;
}

export interface ServiceProcessStep {
  title: LocalizedText;
  desc: LocalizedText;
}

export interface RelatedProjectRef {
  image: string;
  titleKey: string;
  catKey: string;
}

export interface Service {
  slug: ServiceSlug;
  image: string;
  color: string;
  hero: {
    title: LocalizedText;
    subtitle: LocalizedText;
    tagline: LocalizedText;
  };
  heroGradientWord: LocalizedText;
  heroSub: LocalizedText;
  meta: {
    title: LocalizedText;
    description: LocalizedText;
  };
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  relatedProjects: RelatedProjectRef[];
}

const PORTFOLIO_PROJECTS: Record<'bloomair' | 'topnos' | 'nexus' | 'aurora', RelatedProjectRef> = {
  bloomair: { image: '/images/project-bloomair.png', titleKey: 'project1_title', catKey: 'project1_cat' },
  topnos:   { image: '/images/project-daniela.png',  titleKey: 'project2_title', catKey: 'project2_cat' },
  nexus:    { image: '/images/project-nexus.png',    titleKey: 'project3_title', catKey: 'project3_cat' },
  aurora:   { image: '/images/project-aurora.png',   titleKey: 'project4_title', catKey: 'project4_cat' },
};

export const SERVICES: Service[] = [
  {
    slug: 'web-design',
    image: '/images/icon-engineering.jpg',
    color: '#3626A7',
    hero: {
      title: {
        fr: 'Web Design & Développement',
        en: 'Web Design & Development',
      },
      subtitle: {
        fr: 'Des sites sur-mesure, rapides et conçus pour convertir — de la maquette Figma au code Next.js livré en production.',
        en: 'Custom-built websites, fast and designed to convert — from Figma mockups to production-ready Next.js code.',
      },
      tagline: {
        fr: 'Du design au code, sans compromis.',
        en: 'From design to code, no compromise.',
      },
    },
    heroGradientWord: {
      fr: 'le Web Design.',
      en: 'Web Design.',
    },
    heroSub: {
      fr: 'Du premier wireframe au déploiement — design, dev et performance inclus.',
      en: 'From first wireframe to deployment — design, dev and performance included.',
    },
    meta: {
      title: {
        fr: 'Web Design & Développement — UCY Studio',
        en: 'Web Design & Development — UCY Studio',
      },
      description: {
        fr: 'Sites web sur-mesure en Next.js, WordPress ou no-code : design, développement, performance et SEO. Studio basé à Jérusalem et Paris.',
        en: 'Custom websites built with Next.js, WordPress or no-code: design, development, performance and SEO. Studio based in Jerusalem and Paris.',
      },
    },
    features: [
      {
        title: { fr: 'Design sur-mesure', en: 'Custom design' },
        desc: {
          fr: 'Chaque interface est conçue à partir de zéro pour refléter votre marque, pas un template générique.',
          en: 'Every interface is designed from scratch to reflect your brand, never a generic template.',
        },
      },
      {
        title: { fr: 'Développement Next.js', en: 'Next.js development' },
        desc: {
          fr: 'Code propre, typé et performant — TypeScript, Tailwind, animations fluides avec Framer Motion.',
          en: 'Clean, typed and high-performance code — TypeScript, Tailwind, smooth Framer Motion animations.',
        },
      },
      {
        title: { fr: 'Performance & Core Web Vitals', en: 'Performance & Core Web Vitals' },
        desc: {
          fr: 'Temps de chargement optimisés, images compressées, score Lighthouse maximisé dès le lancement.',
          en: 'Optimized load times, compressed images, maximized Lighthouse score from day one.',
        },
      },
      {
        title: { fr: 'WordPress & no-code', en: 'WordPress & no-code' },
        desc: {
          fr: "Pour les budgets plus serrés ou les besoins d'autonomie, on construit aussi sur WordPress et Framer.",
          en: 'For tighter budgets or teams who need autonomy, we also build on WordPress and Framer.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Discovery & cahier des charges', en: 'Discovery & scoping' },
        desc: {
          fr: 'On cadre vos objectifs, votre cible et le périmètre exact du site.',
          en: 'We define your goals, audience and the exact scope of the website.',
        },
      },
      {
        title: { fr: 'Maquettes Figma', en: 'Figma mockups' },
        desc: {
          fr: 'Design haute-fidélité validé avec vous avant tout développement.',
          en: 'High-fidelity designs validated with you before any development starts.',
        },
      },
      {
        title: { fr: 'Intégration & développement', en: 'Build & development' },
        desc: {
          fr: 'Code Next.js avec preview en direct à chaque étape.',
          en: 'Next.js build with a live preview at every step.',
        },
      },
      {
        title: { fr: 'Mise en ligne & suivi', en: 'Launch & follow-up' },
        desc: {
          fr: 'Déploiement, tests cross-device et accompagnement après livraison.',
          en: 'Deployment, cross-device testing and support after delivery.',
        },
      },
    ],
    relatedProjects: [PORTFOLIO_PROJECTS.bloomair, PORTFOLIO_PROJECTS.nexus, PORTFOLIO_PROJECTS.aurora],
  },
  {
    slug: 'ui-ux',
    image: '/images/icon-design.jpg',
    color: '#DF57BC',
    hero: {
      title: {
        fr: 'UI/UX Design',
        en: 'UI/UX Design',
      },
      subtitle: {
        fr: 'Des interfaces pensées pour guider, rassurer et convertir — wireframes, design systems et prototypes interactifs.',
        en: 'Interfaces designed to guide, reassure and convert — wireframes, design systems and interactive prototypes.',
      },
      tagline: {
        fr: 'Une expérience qui se sent juste.',
        en: 'An experience that feels right.',
      },
    },
    heroGradientWord: {
      fr: "l'UI/UX Design.",
      en: 'UI/UX Design.',
    },
    heroSub: {
      fr: 'Research, wireframes, UI haute-fidélité et tests utilisateurs.',
      en: 'Research, wireframes, high-fidelity UI and user testing.',
    },
    meta: {
      title: {
        fr: 'UI/UX Design — UCY Studio',
        en: 'UI/UX Design — UCY Studio',
      },
      description: {
        fr: "Conception d'interfaces et d'expériences utilisateur sur Figma : wireframes, design systems, prototypes. Studio UCY, Jérusalem × Paris.",
        en: 'User interface and experience design on Figma: wireframes, design systems, prototypes. UCY Studio, Jerusalem × Paris.',
      },
    },
    features: [
      {
        title: { fr: 'Recherche & wireframes', en: 'Research & wireframes' },
        desc: {
          fr: "On part de l'usage réel : parcours utilisateur, arborescence et wireframes avant tout pixel.",
          en: 'We start from real usage: user flows, sitemaps and wireframes before any pixel.',
        },
      },
      {
        title: { fr: 'Design systems', en: 'Design systems' },
        desc: {
          fr: 'Composants réutilisables, tokens cohérents — une base scalable pour votre produit.',
          en: 'Reusable components, consistent tokens — a scalable foundation for your product.',
        },
      },
      {
        title: { fr: 'Prototypes interactifs', en: 'Interactive prototypes' },
        desc: {
          fr: 'Maquettes cliquables sur Figma pour tester et valider avant le développement.',
          en: 'Clickable Figma prototypes to test and validate before development.',
        },
      },
      {
        title: { fr: 'Accessibilité & responsive', en: 'Accessibility & responsive' },
        desc: {
          fr: 'Interfaces pensées mobile-first, accessibles et cohérentes sur tous les écrans.',
          en: 'Mobile-first interfaces, accessible and consistent across every screen.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Audit & recherche', en: 'Audit & research' },
        desc: {
          fr: 'Analyse de votre produit existant, de vos utilisateurs et de vos concurrents.',
          en: 'Analysis of your existing product, your users and your competitors.',
        },
      },
      {
        title: { fr: 'Architecture & wireframes', en: 'Architecture & wireframes' },
        desc: {
          fr: 'Structuration des parcours et des écrans clés en basse fidélité.',
          en: 'Structuring user flows and key screens in low fidelity.',
        },
      },
      {
        title: { fr: 'UI design & design system', en: 'UI design & design system' },
        desc: {
          fr: 'Habillage visuel complet avec composants réutilisables.',
          en: 'Full visual design with reusable components.',
        },
      },
      {
        title: { fr: 'Tests & itérations', en: 'Testing & iteration' },
        desc: {
          fr: 'Prototypes testés, ajustés et livrés prêts pour le développement.',
          en: 'Prototypes tested, refined and delivered ready for development.',
        },
      },
    ],
    relatedProjects: [PORTFOLIO_PROJECTS.aurora, PORTFOLIO_PROJECTS.nexus, PORTFOLIO_PROJECTS.topnos],
  },
  {
    slug: 'branding',
    image: '/images/icon-print.jpg',
    color: '#DE541E',
    hero: {
      title: {
        fr: 'Branding & Identité',
        en: 'Branding & Identity',
      },
      subtitle: {
        fr: 'Logo, charte graphique, design system — une identité de marque cohérente, mémorable et prête à décliner partout.',
        en: 'Logo, brand guidelines, design system — a coherent, memorable identity ready to apply everywhere.',
      },
      tagline: {
        fr: "Une marque qu'on reconnaît du premier coup d'œil.",
        en: 'A brand you recognize at a glance.',
      },
    },
    heroGradientWord: {
      fr: 'le Branding.',
      en: 'Branding.',
    },
    heroSub: {
      fr: 'Logo, charte graphique et design system — une identité qui dure.',
      en: 'Logo, brand guidelines and design system — an identity built to last.',
    },
    meta: {
      title: {
        fr: 'Branding & Identité visuelle — UCY Studio',
        en: 'Branding & Visual Identity — UCY Studio',
      },
      description: {
        fr: 'Création de logo, charte graphique et identité de marque complète. Studio de branding UCY, Jérusalem × Paris.',
        en: 'Logo design, brand guidelines and complete visual identity. UCY branding studio, Jerusalem × Paris.',
      },
    },
    features: [
      {
        title: { fr: 'Logo & identité visuelle', en: 'Logo & visual identity' },
        desc: {
          fr: 'Création ou refonte de logo, palette, typographies — une signature visuelle unique.',
          en: 'Logo creation or redesign, color palette, typography — a unique visual signature.',
        },
      },
      {
        title: { fr: 'Charte graphique', en: 'Brand guidelines' },
        desc: {
          fr: 'Un guide complet pour une application cohérente sur tous vos supports.',
          en: 'A complete guide for consistent application across all your media.',
        },
      },
      {
        title: { fr: 'Print & supports physiques', en: 'Print & physical media' },
        desc: {
          fr: 'Cartes de visite, packaging, signalétique — votre identité dans le monde réel.',
          en: 'Business cards, packaging, signage — your identity in the real world.',
        },
      },
      {
        title: { fr: 'Déclinaisons digitales', en: 'Digital adaptations' },
        desc: {
          fr: 'Réseaux sociaux, présentations, templates — une marque prête pour le digital.',
          en: 'Social media, presentations, templates — a brand ready for digital.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Brand discovery', en: 'Brand discovery' },
        desc: {
          fr: 'Immersion dans votre univers, vos valeurs et votre positionnement.',
          en: 'Immersion in your world, your values and your positioning.',
        },
      },
      {
        title: { fr: 'Recherche visuelle', en: 'Visual exploration' },
        desc: {
          fr: 'Exploration de pistes graphiques, moodboards et directions créatives.',
          en: 'Exploring graphic directions, moodboards and creative options.',
        },
      },
      {
        title: { fr: 'Création & finalisation', en: 'Creation & refinement' },
        desc: {
          fr: 'Développement du logo et des éléments de marque jusqu’à la version finale.',
          en: 'Developing the logo and brand elements through to the final version.',
        },
      },
      {
        title: { fr: 'Livraison & guidelines', en: 'Delivery & guidelines' },
        desc: {
          fr: 'Fichiers sources, charte graphique complète et formats prêts à l’emploi.',
          en: 'Source files, full brand guidelines and ready-to-use formats.',
        },
      },
    ],
    relatedProjects: [PORTFOLIO_PROJECTS.topnos, PORTFOLIO_PROJECTS.aurora, PORTFOLIO_PROJECTS.bloomair],
  },
  {
    slug: 'strategie-digitale',
    image: '/images/icon-social.jpg',
    color: '#DF57BC',
    hero: {
      title: {
        fr: 'Stratégie Digitale',
        en: 'Digital Strategy',
      },
      subtitle: {
        fr: 'Réseaux sociaux, contenu, positionnement — une présence digitale pensée pour générer des résultats mesurables.',
        en: 'Social media, content, positioning — a digital presence designed to deliver measurable results.',
      },
      tagline: {
        fr: 'Une présence qui travaille pour vous.',
        en: 'A presence that works for you.',
      },
    },
    heroGradientWord: {
      fr: 'la Stratégie Digitale.',
      en: 'Digital Strategy.',
    },
    heroSub: {
      fr: 'Réseaux sociaux, contenu et acquisition — une présence qui génère.',
      en: 'Social media, content and acquisition — a presence that generates.',
    },
    meta: {
      title: {
        fr: 'Stratégie Digitale & Réseaux Sociaux — UCY Studio',
        en: 'Digital Strategy & Social Media — UCY Studio',
      },
      description: {
        fr: 'Stratégie digitale, contenu et réseaux sociaux pour développer votre présence en ligne et générer des résultats. UCY Studio, Jérusalem × Paris.',
        en: 'Digital strategy, content and social media to grow your online presence and drive measurable results. UCY Studio, Jerusalem × Paris.',
      },
    },
    features: [
      {
        title: { fr: 'Positionnement de marque', en: 'Brand positioning' },
        desc: {
          fr: 'Définition d’un message clair et différenciant pour votre cible.',
          en: 'Defining a clear, differentiated message for your audience.',
        },
      },
      {
        title: { fr: 'Stratégie de contenu', en: 'Content strategy' },
        desc: {
          fr: 'Calendrier éditorial, formats et lignes directrices pour chaque canal.',
          en: 'Editorial calendar, formats and guidelines for every channel.',
        },
      },
      {
        title: { fr: 'Réseaux sociaux', en: 'Social media' },
        desc: {
          fr: 'Gestion et création de contenu pour Instagram, LinkedIn et plus encore.',
          en: 'Content management and creation for Instagram, LinkedIn and beyond.',
        },
      },
      {
        title: { fr: 'Analyse & optimisation', en: 'Analytics & optimization' },
        desc: {
          fr: 'Suivi des performances avec Plausible et ajustements basés sur la donnée.',
          en: 'Performance tracking with Plausible and data-driven adjustments.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Audit digital', en: 'Digital audit' },
        desc: {
          fr: 'État des lieux de votre présence actuelle et de celle de vos concurrents.',
          en: "Assessment of your current presence and your competitors'.",
        },
      },
      {
        title: { fr: 'Stratégie & messages clés', en: 'Strategy & key messages' },
        desc: {
          fr: 'Définition du positionnement, des cibles et des messages prioritaires.',
          en: 'Defining positioning, target audiences and priority messages.',
        },
      },
      {
        title: { fr: 'Production de contenu', en: 'Content production' },
        desc: {
          fr: 'Création des visuels, textes et formats adaptés à chaque plateforme.',
          en: 'Creating visuals, copy and formats tailored to each platform.',
        },
      },
      {
        title: { fr: 'Pilotage & reporting', en: 'Management & reporting' },
        desc: {
          fr: 'Suivi régulier des résultats et ajustements de la stratégie.',
          en: 'Regular results tracking and strategy adjustments.',
        },
      },
    ],
    relatedProjects: [PORTFOLIO_PROJECTS.bloomair, PORTFOLIO_PROJECTS.topnos, PORTFOLIO_PROJECTS.aurora],
  },
  {
    slug: 'seo',
    image: '/images/service-seo.png',
    color: '#3626A7',
    hero: {
      title: {
        fr: 'SEO & Performance',
        en: 'SEO & Performance',
      },
      subtitle: {
        fr: 'Audits techniques, Core Web Vitals et référencement naturel pour que votre site soit visible — et rapide.',
        en: 'Technical audits, Core Web Vitals and organic search optimization so your site gets found — and loads fast.',
      },
      tagline: {
        fr: 'Être trouvé. Être rapide.',
        en: 'Get found. Stay fast.',
      },
    },
    heroGradientWord: {
      fr: 'le SEO.',
      en: 'SEO.',
    },
    heroSub: {
      fr: 'Audit technique, mots-clés et Core Web Vitals — visible durablement.',
      en: 'Technical audit, keywords and Core Web Vitals — visible for the long run.',
    },
    meta: {
      title: {
        fr: 'SEO & Performance Web — UCY Studio',
        en: 'SEO & Web Performance — UCY Studio',
      },
      description: {
        fr: 'Audit SEO technique, optimisation des Core Web Vitals et référencement naturel pour améliorer votre visibilité sur Google. UCY Studio.',
        en: 'Technical SEO audit, Core Web Vitals optimization and organic search to improve your visibility on Google. UCY Studio.',
      },
    },
    features: [
      {
        title: { fr: 'Audit technique', en: 'Technical audit' },
        desc: {
          fr: 'Analyse complète de votre site : structure, balisage, indexation et erreurs techniques.',
          en: 'Full analysis of your site: structure, markup, indexing and technical issues.',
        },
      },
      {
        title: { fr: 'Core Web Vitals', en: 'Core Web Vitals' },
        desc: {
          fr: 'Optimisation de la vitesse de chargement, de la stabilité visuelle et de l’interactivité.',
          en: 'Optimizing load speed, visual stability and interactivity.',
        },
      },
      {
        title: { fr: 'SEO On-page', en: 'On-page SEO' },
        desc: {
          fr: 'Mots-clés, balises titre, structure de contenu — chaque page optimisée pour Google.',
          en: 'Keywords, title tags, content structure — every page optimized for Google.',
        },
      },
      {
        title: { fr: 'Suivi & reporting', en: 'Tracking & reporting' },
        desc: {
          fr: 'Tableaux de bord et suivi mensuel de vos positions et de votre trafic.',
          en: 'Dashboards and monthly tracking of your rankings and traffic.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Audit initial', en: 'Initial audit' },
        desc: {
          fr: 'Crawl complet du site et identification des points de blocage.',
          en: 'Full site crawl and identification of blocking issues.',
        },
      },
      {
        title: { fr: 'Recherche de mots-clés', en: 'Keyword research' },
        desc: {
          fr: 'Identification des requêtes pertinentes pour votre activité et votre marché.',
          en: 'Identifying the search queries that matter for your business and market.',
        },
      },
      {
        title: { fr: 'Optimisations techniques', en: 'Technical optimizations' },
        desc: {
          fr: 'Corrections de structure, vitesse et balisage appliquées au site.',
          en: 'Structure, speed and markup fixes applied to the site.',
        },
      },
      {
        title: { fr: 'Suivi mensuel', en: 'Monthly monitoring' },
        desc: {
          fr: 'Reporting régulier des positions, du trafic et des prochaines actions.',
          en: 'Regular reporting on rankings, traffic and next actions.',
        },
      },
    ],
    relatedProjects: [PORTFOLIO_PROJECTS.bloomair, PORTFOLIO_PROJECTS.nexus],
  },
  {
    slug: 'application-mobile',
    image: '/images/service-mobile.png',
    color: '#DE541E',
    hero: {
      title: {
        fr: 'Application Mobile',
        en: 'Mobile App',
      },
      subtitle: {
        fr: 'Applications React Native et PWA fluides, rapides et pensées pour l’usage mobile — du concept au store.',
        en: 'Smooth, fast React Native and PWA apps designed for mobile-first usage — from concept to store.',
      },
      tagline: {
        fr: 'Votre produit, dans toutes les poches.',
        en: 'Your product, in every pocket.',
      },
    },
    heroGradientWord: {
      fr: "l'Application Mobile.",
      en: 'Mobile Apps.',
    },
    heroSub: {
      fr: 'React Native et PWA — des apps iOS et Android sans compromis.',
      en: 'React Native and PWA — iOS and Android apps without compromise.',
    },
    meta: {
      title: {
        fr: 'Application Mobile — UCY Studio',
        en: 'Mobile App Development — UCY Studio',
      },
      description: {
        fr: 'Développement d’applications mobiles React Native et PWA, du concept au lancement sur les stores. UCY Studio, Jérusalem × Paris.',
        en: 'React Native and PWA mobile app development, from concept to store launch. UCY Studio, Jerusalem × Paris.',
      },
    },
    features: [
      {
        title: { fr: 'React Native', en: 'React Native' },
        desc: {
          fr: 'Une seule base de code pour iOS et Android, performante et maintenable.',
          en: 'A single, performant and maintainable codebase for iOS and Android.',
        },
      },
      {
        title: { fr: 'Progressive Web Apps', en: 'Progressive Web Apps' },
        desc: {
          fr: 'Des expériences installables, hors-ligne et rapides sans passer par un store.',
          en: 'Installable, offline-ready, fast experiences without going through a store.',
        },
      },
      {
        title: { fr: 'UI mobile sur-mesure', en: 'Custom mobile UI' },
        desc: {
          fr: 'Interfaces pensées pour le tactile, les gestes et les contraintes des petits écrans.',
          en: 'Interfaces designed for touch, gestures and small-screen constraints.',
        },
      },
      {
        title: { fr: 'Publication sur les stores', en: 'Store publishing' },
        desc: {
          fr: 'Accompagnement complet pour la mise en ligne sur App Store et Google Play.',
          en: 'Full support to launch on the App Store and Google Play.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Discovery produit', en: 'Product discovery' },
        desc: {
          fr: 'Définition des fonctionnalités clés, des plateformes cibles et du scope MVP.',
          en: 'Defining key features, target platforms and MVP scope.',
        },
      },
      {
        title: { fr: 'Design mobile', en: 'Mobile design' },
        desc: {
          fr: 'Maquettes Figma adaptées aux standards iOS et Android.',
          en: 'Figma mockups tailored to iOS and Android standards.',
        },
      },
      {
        title: { fr: 'Développement React Native', en: 'React Native development' },
        desc: {
          fr: 'Construction de l’app avec tests réguliers sur appareils réels.',
          en: 'Building the app with regular testing on real devices.',
        },
      },
      {
        title: { fr: 'Publication & suivi', en: 'Publishing & follow-up' },
        desc: {
          fr: 'Soumission aux stores, suivi post-lancement et corrections.',
          en: 'Store submission, post-launch monitoring and fixes.',
        },
      },
    ],
    relatedProjects: [PORTFOLIO_PROJECTS.nexus, PORTFOLIO_PROJECTS.bloomair],
  },
  {
    slug: 'maintenance',
    image: '/images/service-maintenance.png',
    color: '#3626A7',
    hero: {
      title: {
        fr: 'Maintenance & Support',
        en: 'Maintenance & Support',
      },
      subtitle: {
        fr: 'Suivi mensuel, mises à jour de sécurité et hébergement premium — votre site reste rapide, sûr et à jour.',
        en: 'Monthly monitoring, security updates and premium hosting — your site stays fast, safe and up to date.',
      },
      tagline: {
        fr: 'Votre site, toujours en bonne santé.',
        en: 'Your site, always in good health.',
      },
    },
    heroGradientWord: {
      fr: 'la Maintenance.',
      en: 'Maintenance.',
    },
    heroSub: {
      fr: "Mises à jour, sécurité et support — on s'occupe de tout.",
      en: 'Updates, security and support — we handle everything.',
    },
    meta: {
      title: {
        fr: 'Maintenance & Support Web — UCY Studio',
        en: 'Website Maintenance & Support — UCY Studio',
      },
      description: {
        fr: 'Maintenance mensuelle, mises à jour de sécurité et hébergement premium pour votre site web. UCY Studio, Jérusalem × Paris.',
        en: 'Monthly maintenance, security updates and premium hosting for your website. UCY Studio, Jerusalem × Paris.',
      },
    },
    features: [
      {
        title: { fr: 'Mises à jour & sécurité', en: 'Updates & security' },
        desc: {
          fr: 'Surveillance continue, correctifs de sécurité et mises à jour des dépendances.',
          en: 'Continuous monitoring, security patches and dependency updates.',
        },
      },
      {
        title: { fr: 'Hébergement premium', en: 'Premium hosting' },
        desc: {
          fr: 'Infrastructure rapide et fiable sur Vercel, avec sauvegardes régulières.',
          en: 'Fast, reliable infrastructure on Vercel, with regular backups.',
        },
      },
      {
        title: { fr: 'Évolutions & ajustements', en: 'Updates & tweaks' },
        desc: {
          fr: 'Petites évolutions, corrections de contenu et ajustements visuels au besoin.',
          en: 'Small feature updates, content fixes and visual tweaks as needed.',
        },
      },
      {
        title: { fr: 'Support réactif', en: 'Responsive support' },
        desc: {
          fr: 'Une équipe disponible pour répondre rapidement à vos demandes.',
          en: 'A team available to respond quickly to your requests.',
        },
      },
    ],
    process: [
      {
        title: { fr: 'Audit initial', en: 'Initial audit' },
        desc: {
          fr: 'État des lieux du site, des dépendances et des points de vigilance.',
          en: 'Assessment of the site, its dependencies and points of attention.',
        },
      },
      {
        title: { fr: 'Mise en place du suivi', en: 'Monitoring setup' },
        desc: {
          fr: 'Configuration de la surveillance, des sauvegardes et des outils de reporting.',
          en: 'Setting up monitoring, backups and reporting tools.',
        },
      },
      {
        title: { fr: 'Maintenance continue', en: 'Ongoing maintenance' },
        desc: {
          fr: 'Mises à jour régulières, corrections et petites évolutions au fil du temps.',
          en: 'Regular updates, fixes and small improvements over time.',
        },
      },
      {
        title: { fr: 'Reporting mensuel', en: 'Monthly reporting' },
        desc: {
          fr: 'Bilan mensuel de l’état du site et des actions réalisées.',
          en: "Monthly summary of the site's status and completed actions.",
        },
      },
    ],
    relatedProjects: [PORTFOLIO_PROJECTS.topnos, PORTFOLIO_PROJECTS.aurora],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export const SERVICE_SLUGS: ServiceSlug[] = SERVICES.map((service) => service.slug);
