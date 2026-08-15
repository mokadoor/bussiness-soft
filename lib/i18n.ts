export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  en: {
    common: {
      home: 'Home',
      requestDemo: 'Request Demo',
      english: 'English',
      french: 'Français',
      arabic: 'العربية',
      learnMore: 'Learn more',
      viewAllProducts: 'View all products',
      bookConsultation: 'Book a consultation',
      language: 'Language',
      contactOurTeam: 'Contact Our Team',
      allProducts: 'All Products',
      backToHome: 'Back to Home',
      browseProducts: 'Browse Products',
      pageNotFound: 'Page not found',
      pageNotFoundDescription: "The page you&apos;re looking for doesn&apos;t exist or has been moved.",
    },
    nav: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Industries', href: '/industries' },
      { label: 'References', href: '/references' },
      { label: 'Contact', href: '/contact' },
    ],
    home: {
      hero: {
        eyebrow: 'Tunisian ERP since 2006',
        title: 'Run your entire business on',
        description:
          'The powerful, user-friendly Tunisian ERP that optimizes finance, sales, inventory, production, and HR — all in one integrated platform built for local compliance.',
        requestDemo: 'Request Demo',
        exploreProducts: 'Explore Products',
        stats: {
          expertise: '18+ years of expertise',
          clients: '150+ active clients',
          compliance: 'Tunisian compliance built in',
        },
      },
      about: {
        eyebrow: 'About Us',
        title: 'Your partner in business software, since {year}',
        description:
          'Founded in {year}, {companyName} is a Tunisian software editor specialized in information technology and enterprise consulting. Our mission is to accompany companies at every stage — from design to the deployment of powerful, innovative IT systems. Our goal: help our clients increase productivity, profitability, and responsiveness.',
        cta: 'Learn more about us',
        points: [
          'Tunisian ERP editor since 2006',
          '150+ active clients across 8 industries',
          'Local support and dedicated consulting',
          'Compliant with Tunisian fiscal regulations',
        ],
      },
      highlights: {
        eyebrow: 'Why Business Software',
        title: 'Built for Tunisian enterprises, ready for growth',
        description:
          'Nearly two decades of building and maintaining business software that companies across Tunisia rely on every day.',
        items: [
          {
            title: 'Tunisian Compliance',
            description: 'Built for local fiscal, VAT, and CNSS regulations out of the box.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Modular Architecture',
            description: 'Deploy the modules you need today and expand as your business grows.',
            icon: 'Boxes',
          },
          {
            title: 'Dedicated Support',
            description: 'Responsive, local support team available when you need assistance.',
            icon: 'Users',
          },
          {
            title: 'Real-Time Insights',
            description: 'Dashboards and KPIs that give you visibility across every function.',
            icon: 'BarChart3',
          },
        ],
      },
      featuredProducts: {
        eyebrow: 'Our Products',
        title: 'The Nexus software suite',
        description:
          'A family of integrated products covering ERP, CRM, industry-specific operations, and point of sale — all built and maintained in Tunisia.',
        cta: 'Explore product',
        viewAll: 'View all products',
      },
      services: {
        eyebrow: 'Our Services',
        title: 'Full-lifecycle software services',
        description:
          'A complete range of responsive, personalized services to meet all your business needs — from consulting and development to support and maintenance.',
        cta: 'Learn more',
      },
      industries: {
        eyebrow: 'Industries We Serve',
        title: 'Solutions tailored to your sector',
        description:
          'We understand that every industry has unique processes and challenges. Our solutions are adapted to how you actually work.',
        cta: 'Learn more',
      },
      whyChooseUs: {
        eyebrow: 'Why Choose Us',
        title: 'A trusted Tunisian partner, not just a vendor',
        description:
          'Companies across Tunisia choose Business Software because we combine technical excellence with genuine partnership — staying with you long after go-live.',
        cardTitle: 'Our promise to every client',
        cardDescription:
          'We commit to delivering software that is reliable, compliant, and genuinely useful — backed by responsive support and continuous improvement.',
        promises: [
          'On-time, on-budget delivery',
          'Tunisian regulatory compliance',
          'Dedicated local support team',
          'Continuous product evolution',
        ],
        reasons: [
          {
            title: 'A satisfied client is our absolute priority',
            description:
              'We measure our success by your results. Every engagement starts with understanding your business and ends with a solution your team can rely on.',
          },
          {
            title: 'Deep Tunisian market expertise',
            description:
              'Born and built in Tunisia, we understand local regulations, business culture, and the real challenges Tunisian enterprises face every day.',
          },
          {
            title: 'Responsive and personalized service',
            description:
              'We offer a complete range of reactive, personalized services. Your dedicated team knows your business and is there when you need them.',
          },
          {
            title: 'From design to long-term support',
            description:
              'We accompany you at every stage — from initial analysis and design to deployment, training, and ongoing support and maintenance.',
          },
        ],
      },
      process: {
        eyebrow: 'How we work',
        title: 'A simple roadmap from strategy to scale',
        description:
          'We combine local expertise, ERP know-how, and hands-on support to help your teams adopt the right system with confidence.',
        cta: 'Book a consultation',
        steps: [
          {
            title: 'Discover',
            description: 'We map your process, pain points, and growth goals to define the right ERP fit.',
          },
          {
            title: 'Implement',
            description: 'We configure the platform, connect your data, and guide your teams through a smooth rollout.',
          },
          {
            title: 'Scale',
            description: 'We stay close with support, reporting, and continuous optimization as your business grows.',
          },
        ],
      },
      statistics: {
        eyebrow: 'By the Numbers',
        title: 'Trusted across Tunisia',
        description:
          'Nearly two decades of building software that Tunisian enterprises depend on.',
      },
      clients: {
        eyebrow: 'Our Clients',
        title: 'Trusted by leading Tunisian companies',
        description:
          'From manufacturing and distribution to retail and healthcare, organizations across Tunisia run on our software.',
      },
      testimonials: {
        eyebrow: 'Testimonials',
        title: 'What our clients say',
        description: 'Real results from real Tunisian companies running on Nexus.',
      },
      contactPreview: {
        eyebrow: 'Get in Touch',
        title: "Let's talk about your project",
        description:
          "Whether you're exploring ERP for the first time or looking to upgrade your current systems, our team is ready to help. Reach out and we'll get back to you within one business day.",
        cta: 'Contact us',
        emailTitle: 'Email us',
        callTitle: 'Call us',
        visitTitle: 'Visit us',
      },
    },
    footer: {
      companyTitle: 'Company',
      productsTitle: 'Products',
      servicesTitle: 'Services',
      contactTitle: 'Contact',
      contactDetailsTitle: 'Contact details',
      adminDashboard: 'Admin Dashboard',
      productLinks: [
        { label: 'Nexus ERP', href: '/products/nexus-erp' },
        { label: 'Nexus CRM', href: '/products/nexus-crm' },
        { label: 'Nexus Bois', href: '/products/nexus-bois' },
        { label: 'Nexus Smart Point', href: '/products/nexus-smart-point' },
      ],
      serviceLinks: [
        { label: 'ERP Consulting', href: '/services#erp-consulting' },
        { label: 'Digital Transformation', href: '/services#digital-transformation' },
        { label: 'Custom Software', href: '/services#custom-software-development' },
        { label: 'ERP Implementation', href: '/services#erp-implementation' },
      ],
      copy: '© {year} Business Software TN. All rights reserved.',
      founded: 'Founded in 2006 · Tunis, Tunisia',
    },
    pages: {
      about: {
        metaTitle: 'About Us — Our Story, Mission & Team',
        metaDescription:
          'Founded in 2006, Business Software TN is a Tunisian software editor specialized in ERP solutions, custom development, and IT consulting.',
        eyebrow: 'About Us',
        title: 'Building business software for Tunisia since 2006',
        description:
          'A Tunisian software editor specialized in information technology and enterprise consulting — accompanying companies at every stage, from design to deployment of powerful, innovative IT systems.',
        breadcrumb: 'About',
        story: {
          eyebrow: 'Our Story',
          title: 'From a local startup to a trusted ERP editor',
          paragraph1:
            'Founded in {foundedYear}, {companyName} is a Tunisian software editor specialized in information technology and enterprise consulting. Our mission is to accompany companies at every stage — from design to the deployment of powerful and innovative IT systems.',
          paragraph2:
            "Our primary objective is to help our clients increase their productivity, profitability, and responsiveness in an increasingly competitive market. Over nearly two decades, we've built and refined the Nexus suite — ERP, CRM, industry-specific editions, and point of sale — trusted by over 150 active clients across 8 industries.",
          paragraph3:
            "What sets us apart is our Tunisian roots. We build software that understands local regulations, business culture, and the real challenges Tunisian enterprises face — backed by a local support team that's there when you need them.",
        },
        mission: {
          title: 'Our Mission',
          description:
            'To accompany enterprises at every stage — from design to the deployment of powerful, innovative IT systems — and help them increase productivity, profitability, and responsiveness.',
        },
        vision: {
          title: 'Our Vision',
          description:
            'To be the leading Tunisian software editor, empowering every enterprise — large or small — with accessible, reliable, and compliant technology that drives sustainable growth.',
        },
        values: [
          {
            title: 'Client Commitment',
            description: 'A satisfied client is our absolute priority. We measure our success by your results.',
            icon: 'HeartHandshake',
          },
          {
            title: 'Expertise',
            description: 'Nearly two decades of building business software for Tunisian and international enterprises.',
            icon: 'Award',
          },
          {
            title: 'Innovation',
            description: 'We continuously invest in new technologies to keep our clients ahead of the curve.',
            icon: 'Lightbulb',
          },
          {
            title: 'Reliability',
            description: 'Robust, tested software and responsive support you can depend on, day in and day out.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Partnership',
            description: 'We accompany you at every stage — from design to deployment and long after go-live.',
            icon: 'Users',
          },
          {
            title: 'Tunisian Roots',
            description: 'Built in Tunisia with deep understanding of local regulations and business culture.',
            icon: 'MapPin',
          },
        ],
        valuesSection: {
          eyebrow: 'Our Values',
          title: 'What we stand for',
          description: 'The principles that guide how we build software and work with our clients.',
        },
        timeline: [
          {
            year: '2006',
            title: 'Foundation',
            description: 'Business Software is founded in Tunis with a mission to build business software for Tunisian enterprises.',
          },
          {
            year: '2009',
            title: 'First Nexus ERP Release',
            description: 'We launch the first version of Nexus ERP, quickly adopted by manufacturers and distributors.',
          },
          {
            year: '2013',
            title: 'Nexus CRM & Mobile',
            description: 'We expand the platform with Nexus CRM and native mobile apps for field sales teams.',
          },
          {
            year: '2016',
            title: 'Nexus Bois',
            description: 'We release Nexus Bois, a specialized ERP for the wood and furniture industry with cutting optimization.',
          },
          {
            year: '2019',
            title: 'Nexus Smart Point',
            description: 'We launch an offline-first POS for retail and hospitality, integrated with Nexus ERP.',
          },
          {
            year: '2022',
            title: 'Cloud & Digital Transformation',
            description: 'We introduce cloud deployment and a dedicated digital transformation consulting practice.',
          },
          {
            year: '2024',
            title: '150+ Active Clients',
            description: 'Today we serve over 150 active clients across 8 industries with a team of 45+ experts.',
          },
        ],
        timelineSection: {
          eyebrow: 'Our Journey',
          title: 'Milestones along the way',
          description: 'Key moments in our growth from a local startup to a trusted Tunisian software editor.',
        },
        team: [
          {
            name: 'Riadh Khelil',
            role: 'Founder & CEO',
            bio: 'A software entrepreneur with over 20 years building enterprise systems for Tunisian and international companies.',
            initials: 'RK',
          },
          {
            name: 'Nadia Ferchichi',
            role: 'CTO',
            bio: 'Leads our engineering teams and platform architecture with a passion for robust, scalable software.',
            initials: 'NF',
          },
          {
            name: 'Slim Bouazizi',
            role: 'Head of Delivery',
            bio: 'Oversees ERP implementations and ensures every project is delivered on time and to specification.',
            initials: 'SB',
          },
          {
            name: 'Amel Sassi',
            role: 'Head of Consulting',
            bio: 'Guides clients through digital transformation with deep expertise in process optimization.',
            initials: 'AS',
          },
          {
            name: 'Wassim Jelassi',
            role: 'Head of Support',
            bio: 'Leads our support organization, ensuring clients get fast, effective help whenever they need it.',
            initials: 'WJ',
          },
          {
            name: 'Dorra Hamdi',
            role: 'Head of Sales',
            bio: 'Works with prospective clients to find the right solutions for their business challenges.',
            initials: 'DH',
          },
        ],
        leadershipSection: {
          eyebrow: 'Leadership',
          title: 'Meet the team behind Business Software',
          description: 'Experienced leaders guiding our mission to build software Tunisian enterprises can rely on.',
        },
        offices: [
          {
            name: 'Head Office — Tunis',
            address: 'Les Berges du Lac II, Rue du Lac Windermere, 1053 Tunis, Tunisia',
            phone: '+216 71 902 456',
            email: 'contact@businesssoftware.com.tn',
            hours: 'Mon – Fri: 8:30 – 18:00',
          },
          {
            name: 'Sfax Office',
            address: 'Route de Gabès, Imm. Ekhtebar, 3027 Sfax, Tunisia',
            phone: '+216 74 401 122',
            email: 'sfax@businesssoftware.com.tn',
            hours: 'Mon – Fri: 8:30 – 18:00',
          },
        ],
        officesSection: {
          eyebrow: 'Our Offices',
          title: 'Where to find us',
          description: 'Based in Tunis with a regional office in Sfax — serving clients across the country.',
        },
      },
      contact: {
        metaTitle: 'Contact — Get in Touch with Business Software TN',
        metaDescription:
          'Contact Business Software TN for ERP demos, consulting, custom software development, and support. Offices in Tunis and Sfax, Tunisia.',
        eyebrow: 'Contact',
        title: "Let's talk about your project",
        description:
          "Whether you're exploring ERP for the first time or upgrading your current systems, our team is ready to help. We'll get back to you within one business day.",
        breadcrumb: 'Contact',
        contactDetailsHeading: 'Contact details',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        websiteLabel: 'Website',
        hoursLabel: 'Business hours',
        mapTitle: 'Find us in Tunis',
        mapDescription:
          "Google Maps integration placeholder",
        form: {
          heading: 'Send us a message',
          subheading: 'Fill out the form below and we’ll be in touch shortly.',
          fullName: 'Full name',
          email: 'Email',
          phone: 'Phone',
          company: 'Company',
          subject: 'Subject',
          message: 'Message',
          consent:
            'I agree to be contacted by Business Software TN regarding my inquiry.',
          sendMessage: 'Send Message',
          sending: 'Sending...',
          placeholder: {
            name: 'John Doe',
            email: 'john@company.com',
            phone: '+216 71 000 000',
            company: 'Your company',
            subject: 'Select a subject',
            message: 'Tell us about your project or question...',
          },
          thankYou: 'Thank you!',
          sent: 'Your message has been received. Our team will get back to you within one business day.',
          sendAnother: 'Send another message',
        },
      },
      industries: {
        metaTitle: 'Industries — Solutions for Your Sector',
        metaDescription:
          'Industry-tailored ERP and software solutions for manufacturing, retail, distribution, construction, wood industry, healthcare, education, and professional services in Tunisia.',
        eyebrow: 'Industries',
        title: 'Solutions tailored to your sector',
        description:
          'Every industry has unique processes and challenges. Our solutions are adapted to how you actually work — not the other way around.',
        breadcrumb: 'Industries',
      },
      services: {
        metaTitle: 'Services — ERP Consulting, Development & Digital Transformation',
        metaDescription:
          'Full-lifecycle software services: ERP consulting, digital transformation, custom software development, web and mobile development, ERP implementation, data migration, support, and maintenance.',
        eyebrow: 'Our Services',
        title: 'Full-lifecycle software services',
        description:
          'A complete range of responsive, personalized services to meet all your business needs — from initial consulting and development to ongoing support and maintenance.',
        breadcrumb: 'Services',
      },
      products: {
        metaTitle: 'Products — Nexus ERP, CRM, Bois & Smart Point',
        metaDescription:
          'Discover the Nexus software suite: Nexus ERP for full business management, Nexus CRM for customer relationships, Nexus Bois for the wood industry, and Nexus Smart Point for retail POS.',
        eyebrow: 'Our Products',
        title: 'The Nexus software suite',
        description:
          'A family of integrated products covering ERP, CRM, industry-specific operations, and point of sale — all built, maintained, and supported in Tunisia.',
        breadcrumb: 'Products',
      },
      references: {
        metaTitle: 'References — Our Clients & Case Studies',
        metaDescription:
          'Discover the Tunisian companies that trust Business Software — from manufacturing and distribution to retail, healthcare, and construction. Client references and case studies.',
        eyebrow: 'References',
        title: 'Trusted by leading Tunisian companies',
        description:
          "Over 150 active clients across 8 industries run their operations on our software. Here are some of the organizations we're proud to work with.",
        breadcrumb: 'References',
      },
    },
    contactForm: {
      subjects: [
        'Request a demo',
        'ERP Consulting',
        'Custom Software Development',
        'ERP Implementation',
        'Technical Support',
        'Partnership',
        'Other',
      ],
    },
  },
  fr: {
    common: {
      home: 'Accueil',
      requestDemo: 'Demander une démo',
      english: 'English',
      french: 'Français',
      arabic: 'العربية',
      learnMore: 'En savoir plus',
      viewAllProducts: 'Voir tous les produits',
      bookConsultation: 'Réserver une consultation',
      language: 'Langue',
      contactOurTeam: 'Contactez notre équipe',
      allProducts: 'Tous les produits',
      backToHome: 'Retour à l’accueil',
      browseProducts: 'Parcourir les produits',
      pageNotFound: 'Page introuvable',
      pageNotFoundDescription: 'La page que vous recherchez n’existe pas ou a été déplacée.',
    },
    nav: [
      { label: 'Accueil', href: '/' },
      { label: 'À propos', href: '/about' },
      { label: 'Produits', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Secteurs', href: '/industries' },
      { label: 'Références', href: '/references' },
      { label: 'Contact', href: '/contact' },
    ],
    home: {
      hero: {
        eyebrow: 'ERP tunisien depuis 2006',
        title: 'Gérez toute votre entreprise avec',
        description:
          'L’ERP tunisien puissant et facile à utiliser qui optimise la finance, les ventes, les stocks, la production et les ressources humaines — le tout sur une plateforme intégrée conforme aux normes locales.',
        requestDemo: 'Demander une démo',
        exploreProducts: 'Découvrir les produits',
        stats: {
          expertise: '18+ ans d’expertise',
          clients: '150+ clients actifs',
          compliance: 'Conformité tunisienne intégrée',
        },
      },
      about: {
        eyebrow: 'À propos',
        title: 'Votre partenaire en logiciels métiers depuis {year}',
        description:
          'Fondée en {year}, {companyName} est un éditeur de logiciels tunisien spécialisé dans les technologies de l’information et le conseil aux entreprises. Notre mission est d’accompagner les entreprises à chaque étape — de la conception au déploiement de systèmes informatiques puissants et innovants. Notre objectif : aider nos clients à accroître leur productivité, leur rentabilité et leur réactivité.',
        cta: 'En savoir plus sur nous',
        points: [
          'Éditeur ERP tunisien depuis 2006',
          'Plus de 150 clients actifs dans 8 secteurs',
          'Support local et accompagnement dédié',
          'Conforme aux réglementations fiscales tunisiennes',
        ],
      },
      highlights: {
        eyebrow: 'Pourquoi Business Software',
        title: 'Conçu pour les entreprises tunisiennes, prêt à grandir',
        description:
          'Près de deux décennies à concevoir et maintenir des logiciels d’entreprise sur lesquels les entreprises tunisiennes comptent chaque jour.',
        items: [
          {
            title: 'Conformité tunisienne',
            description: 'Conçu pour les réglementations fiscales, TVA et CNSS locales dès le départ.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Architecture modulaire',
            description: 'Déployez les modules dont vous avez besoin aujourd’hui et étendez-les au fil de votre croissance.',
            icon: 'Boxes',
          },
          {
            title: 'Support dédié',
            description: 'Une équipe locale réactive et disponible quand vous en avez besoin.',
            icon: 'Users',
          },
          {
            title: 'Analyses en temps réel',
            description: 'Tableaux de bord et KPI pour une visibilité complète sur chaque fonction.',
            icon: 'BarChart3',
          },
        ],
      },
      featuredProducts: {
        eyebrow: 'Nos produits',
        title: 'La suite logicielle Nexus',
        description:
          'Une famille de produits intégrés couvrant ERP, CRM, opérations sectorielles et point de vente — tout est conçu et maintenu en Tunisie.',
        cta: 'Découvrir le produit',
        viewAll: 'Voir tous les produits',
      },
      services: {
        eyebrow: 'Nos services',
        title: 'Services logiciels de bout en bout',
        description:
          'Une offre complète et personnalisée pour répondre à tous vos besoins — du conseil et du développement au support et à la maintenance.',
        cta: 'En savoir plus',
      },
      industries: {
        eyebrow: 'Secteurs couverts',
        title: 'Solutions sur mesure pour votre secteur',
        description:
          'Nous comprenons que chaque secteur a ses propres processus et défis. Nos solutions s’adaptent à votre façon de travailler.',
        cta: 'En savoir plus',
      },
      whyChooseUs: {
        eyebrow: 'Pourquoi nous choisir',
        title: 'Un partenaire tunisien de confiance, pas seulement un fournisseur',
        description:
          'Les entreprises tunisiennes nous choisissent parce que nous associons excellence technique et partenariat sincère — et restons à vos côtés bien après la mise en production.',
        cardTitle: 'Notre engagement envers chaque client',
        cardDescription:
          'Nous nous engageons à fournir des logiciels fiables, conformes et réellement utiles — avec un support réactif et une amélioration continue.',
        promises: [
          'Livraison dans les délais et le budget',
          'Conformité réglementaire tunisienne',
          'Équipe de support locale dédiée',
          'Évolution continue du produit',
        ],
        reasons: [
          {
            title: 'La satisfaction du client est notre priorité absolue',
            description:
              'Notre succès se mesure à vos résultats. Chaque mission commence par la compréhension de votre activité et se termine par une solution fiable pour votre équipe.',
          },
          {
            title: 'Une expertise profonde du marché tunisien',
            description:
              'Nés et développés en Tunisie, nous comprenons les réglementations locales, la culture d’entreprise et les défis réels des entreprises tunisiennes.',
          },
          {
            title: 'Un service réactif et personnalisé',
            description:
              'Nous offrons une gamme complète de services réactifs et personnalisés. Votre équipe dédiée connaît votre activité et est présente quand vous en avez besoin.',
          },
          {
            title: 'De la conception au support à long terme',
            description:
              'Nous vous accompagnons à chaque étape — de l’analyse initiale et de la conception au déploiement, à la formation et au support continu.',
          },
        ],
      },
      process: {
        eyebrow: 'Notre méthode',
        title: 'Une feuille de route simple, de la stratégie à la croissance',
        description:
          'Nous combinons expertise locale, savoir-faire ERP et support concret pour aider vos équipes à adopter le bon système en toute confiance.',
        cta: 'Réserver une consultation',
        steps: [
          {
            title: 'Découvrir',
            description: 'Nous cartographions vos processus, vos points de friction et vos objectifs pour définir le bon ERP.',
          },
          {
            title: 'Implémenter',
            description: 'Nous configurons la plateforme, connectons vos données et guidons vos équipes lors du déploiement.',
          },
          {
            title: 'Évoluer',
            description: 'Nous restons proches avec le support, les tableaux de bord et l’optimisation continue.',
          },
        ],
      },
      statistics: {
        eyebrow: 'Chiffres clés',
        title: 'Une confiance partout en Tunisie',
        description:
          'Près de deux décennies à développer des logiciels auxquels les entreprises tunisiennes font confiance.',
      },
      clients: {
        eyebrow: 'Nos clients',
        title: 'Des entreprises tunisiennes de référence',
        description:
          'Des secteurs manufacturier, distribution, retail et santé aux organisations de tout le pays, nos logiciels sont utilisés partout en Tunisie.',
      },
      testimonials: {
        eyebrow: 'Témoignages',
        title: 'Ce que disent nos clients',
        description: 'Des résultats concrets issus d’entreprises tunisiennes qui utilisent Nexus.',
      },
      contactPreview: {
        eyebrow: 'Contactez-nous',
        title: 'Parlons de votre projet',
        description:
          'Que vous exploriez l’ERP pour la première fois ou que vous modernisiez vos systèmes, notre équipe est prête à vous aider. Nous vous répondrons dans un délai d’un jour ouvrable.',
        cta: 'Contactez-nous',
        emailTitle: 'Envoyez un email',
        callTitle: 'Appelez-nous',
        visitTitle: 'Visitez-nous',
      },
    },
    footer: {
      companyTitle: 'Entreprise',
      productsTitle: 'Produits',
      servicesTitle: 'Services',
      contactTitle: 'Contact',
      contactDetailsTitle: 'Coordonnées',
      adminDashboard: 'Espace admin',
      productLinks: [
        { label: 'Nexus ERP', href: '/products/nexus-erp' },
        { label: 'Nexus CRM', href: '/products/nexus-crm' },
        { label: 'Nexus Bois', href: '/products/nexus-bois' },
        { label: 'Nexus Smart Point', href: '/products/nexus-smart-point' },
      ],
      serviceLinks: [
        { label: 'Conseil ERP', href: '/services#erp-consulting' },
        { label: 'Transformation digitale', href: '/services#digital-transformation' },
        { label: 'Logiciel sur mesure', href: '/services#custom-software-development' },
        { label: 'Mise en œuvre ERP', href: '/services#erp-implementation' },
      ],
      copy: '© {year} Business Software TN. Tous droits réservés.',
      founded: 'Fondé en 2006 · Tunis, Tunisie',
    },
    pages: {
      about: {
        metaTitle: 'À propos — Notre histoire, mission & équipe',
        metaDescription:
          'Fondée en 2006, Business Software TN est un éditeur tunisien spécialisé dans les solutions ERP, le développement sur mesure et le conseil informatique.',
        eyebrow: 'À propos',
        title: 'Construire des logiciels métiers pour la Tunisie depuis 2006',
        description:
          'Un éditeur tunisien spécialisé en technologies de l’information et conseil d’entreprise — accompagnant les entreprises de la conception au déploiement de systèmes informatiques puissants et innovants.',
        breadcrumb: 'À propos',
        story: {
          eyebrow: 'Notre histoire',
          title: "D'une jeune entreprise locale à un éditeur ERP de confiance",
          paragraph1:
            "Fondée en {foundedYear}, {companyName} est un éditeur de logiciels tunisien spécialisé dans les technologies de l'information et le conseil aux entreprises. Notre mission est d'accompagner les entreprises à chaque étape — de la conception au déploiement de systèmes informatiques puissants et innovants.",
          paragraph2:
            "Notre objectif principal est d'aider nos clients à accroître leur productivité, leur rentabilité et leur réactivité dans un marché de plus en plus concurrentiel. Depuis près de deux décennies, nous avons construit et perfectionné la suite Nexus — ERP, CRM, éditions sectorielles et point de vente — adoptée par plus de 150 clients actifs dans 8 secteurs.",
          paragraph3:
            "Ce qui nous distingue, ce sont nos racines tunisiennes. Nous concevons des logiciels qui comprennent la réglementation locale, la culture d'entreprise et les défis réels des entreprises tunisiennes — soutenus par une équipe de support locale toujours présente.",
        },
        mission: {
          title: 'Notre mission',
          description:
            "Accompagner les entreprises à chaque étape — de la conception au déploiement de systèmes informatiques puissants et innovants — et les aider à accroître leur productivité, leur rentabilité et leur réactivité.",
        },
        vision: {
          title: 'Notre vision',
          description:
            "Devenir le premier éditeur de logiciels tunisien, en donnant à chaque entreprise — grande ou petite — accès à une technologie fiable, accessible et conforme, moteur d'une croissance durable.",
        },
        values: [
          {
            title: 'Engagement client',
            description: 'Un client satisfait est notre priorité absolue. Notre succès se mesure à vos résultats.',
            icon: 'HeartHandshake',
          },
          {
            title: 'Expertise',
            description: 'Près de deux décennies à concevoir des logiciels pour les entreprises tunisiennes et internationales.',
            icon: 'Award',
          },
          {
            title: 'Innovation',
            description: 'Nous investissons continuellement dans les nouvelles technologies pour garder nos clients en avance.',
            icon: 'Lightbulb',
          },
          {
            title: 'Fiabilité',
            description: 'Des logiciels robustes, testés et un support réactif sur lequel vous pouvez compter chaque jour.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Partenariat',
            description: 'Nous vous accompagnons à chaque étape — de la conception au déploiement et bien après la mise en production.',
            icon: 'Users',
          },
          {
            title: 'Racines tunisiennes',
            description: 'Conçu en Tunisie avec une compréhension profonde des réglementations et de la culture locale.',
            icon: 'MapPin',
          },
        ],
        valuesSection: {
          eyebrow: 'Nos valeurs',
          title: 'Ce qui nous anime',
          description: "Les principes qui guident la façon dont nous concevons nos logiciels et travaillons avec nos clients.",
        },
        timeline: [
          {
            year: '2006',
            title: 'Fondation',
            description: 'Business Software est fondée à Tunis avec pour mission de créer des logiciels pour les entreprises tunisiennes.',
          },
          {
            year: '2009',
            title: 'Première version de Nexus ERP',
            description: 'Nous lançons la première version de Nexus ERP, rapidement adoptée par les fabricants et distributeurs.',
          },
          {
            year: '2013',
            title: 'Nexus CRM & mobile',
            description: 'Nous élargissons la plateforme avec Nexus CRM et des applications mobiles natives pour les équipes commerciales terrain.',
          },
          {
            year: '2016',
            title: 'Nexus Bois',
            description: 'Nous publions Nexus Bois, un ERP spécialisé pour l’industrie du bois et du mobilier avec optimisation des coupes.',
          },
          {
            year: '2019',
            title: 'Nexus Smart Point',
            description: 'Nous lançons un système de caisse hors ligne pour le retail et l’hôtellerie, intégré à Nexus ERP.',
          },
          {
            year: '2022',
            title: 'Cloud & transformation digitale',
            description: 'Nous introduisons le déploiement cloud et une pratique dédiée de conseil en transformation digitale.',
          },
          {
            year: '2024',
            title: '150+ clients actifs',
            description: 'Aujourd’hui, nous servons plus de 150 clients actifs dans 8 secteurs avec une équipe de plus de 45 experts.',
          },
        ],
        timelineSection: {
          eyebrow: 'Notre parcours',
          title: 'Les étapes clés de notre croissance',
          description: "Les moments marquants de notre évolution, d'une jeune entreprise locale à un éditeur de logiciels tunisien de confiance.",
        },
        team: [
          {
            name: 'Riadh Khelil',
            role: 'Fondateur & PDG',
            bio: 'Entrepreneur du logiciel avec plus de 20 ans d’expérience dans la création de systèmes d’entreprise pour des entreprises tunisiennes et internationales.',
            initials: 'RK',
          },
          {
            name: 'Nadia Ferchichi',
            role: 'CTO',
            bio: 'Dirige nos équipes d’ingénierie et l’architecture de la plateforme avec une passion pour des logiciels robustes et évolutifs.',
            initials: 'NF',
          },
          {
            name: 'Slim Bouazizi',
            role: 'Responsable de la mise en œuvre',
            bio: 'Supervise les déploiements ERP et veille à ce que chaque projet soit livré à temps et selon les spécifications.',
            initials: 'SB',
          },
          {
            name: 'Amel Sassi',
            role: 'Responsable conseil',
            bio: 'Accompagne les clients dans leur transformation digitale avec une expertise pointue en optimisation des processus.',
            initials: 'AS',
          },
          {
            name: 'Wassim Jelassi',
            role: 'Responsable support',
            bio: 'Dirige notre organisation de support pour offrir une aide rapide et efficace à chaque besoin.',
            initials: 'WJ',
          },
          {
            name: 'Dorra Hamdi',
            role: 'Responsable commercial',
            bio: 'Travaille avec les clients potentiels pour trouver les meilleures solutions à leurs défis métier.',
            initials: 'DH',
          },
        ],
        leadershipSection: {
          eyebrow: 'Direction',
          title: "L'équipe derrière Business Software",
          description: "Des dirigeants expérimentés qui guident notre mission : construire des logiciels sur lesquels les entreprises tunisiennes peuvent compter.",
        },
        offices: [
          {
            name: 'Siège social — Tunis',
            address: 'Les Berges du Lac II, Rue du Lac Windermere, 1053 Tunis, Tunisie',
            phone: '+216 71 902 456',
            email: 'contact@businesssoftware.com.tn',
            hours: 'Lun – Ven: 8:30 – 18:00',
          },
          {
            name: 'Bureau de Sfax',
            address: 'Route de Gabès, Imm. Ekhtebar, 3027 Sfax, Tunisie',
            phone: '+216 74 401 122',
            email: 'sfax@businesssoftware.com.tn',
            hours: 'Lun – Ven: 8:30 – 18:00',
          },
        ],
        officesSection: {
          eyebrow: 'Nos bureaux',
          title: 'Où nous trouver',
          description: "Basés à Tunis avec un bureau régional à Sfax — au service de nos clients dans tout le pays.",
        },
      },
      contact: {
        metaTitle: 'Contact — Prenez contact avec Business Software TN',
        metaDescription:
          'Contactez Business Software TN pour des démonstrations ERP, du conseil, du développement sur mesure et du support. Bureaux à Tunis et Sfax, Tunisie.',
        eyebrow: 'Contact',
        title: 'Parlons de votre projet',
        description:
          'Que vous exploriez l’ERP pour la première fois ou que vous modernisiez vos systèmes, notre équipe est prête à vous aider. Nous vous répondrons dans un délai d’un jour ouvrable.',
        breadcrumb: 'Contact',
        contactDetailsHeading: 'Coordonnées',
        emailLabel: 'Email',
        phoneLabel: 'Téléphone',
        websiteLabel: 'Site web',
        hoursLabel: 'Heures d’ouverture',
        mapTitle: 'Trouvez-nous à Tunis',
        mapDescription:
          'Espace réservé pour l’intégration Google Maps',
        form: {
          heading: 'Envoyez-nous un message',
          subheading: 'Remplissez le formulaire ci-dessous et nous reviendrons vers vous rapidement.',
          fullName: 'Nom complet',
          email: 'Email',
          phone: 'Téléphone',
          company: 'Entreprise',
          subject: 'Sujet',
          message: 'Message',
          consent: 'J’accepte d’être contacté par Business Software TN au sujet de ma demande.',
          sendMessage: 'Envoyer le message',
          sending: 'Envoi...',
          placeholder: {
            name: 'Jean Dupont',
            email: 'jean@entreprise.com',
            phone: '+216 71 000 000',
            company: 'Votre entreprise',
            subject: 'Sélectionnez un sujet',
            message: 'Parlez-nous de votre projet ou de votre question...',
          },
          thankYou: 'Merci !',
          sent: 'Votre message a bien été reçu. Notre équipe vous répondra dans un délai d’un jour ouvrable.',
          sendAnother: 'Envoyer un autre message',
        },
      },
      industries: {
        metaTitle: 'Secteurs — Solutions pour votre domaine',
        metaDescription:
          'Solutions ERP et logicielles adaptées aux secteurs tunisien de la production, du commerce, de la distribution, de la construction, du bois, de la santé et de l’éducation.',
        eyebrow: 'Secteurs',
        title: 'Solutions sur mesure pour votre secteur',
        description:
          'Chaque secteur a des processus et des défis uniques. Nos solutions s’adaptent à votre façon de travailler — pas l’inverse.',
        breadcrumb: 'Secteurs',
      },
      services: {
        metaTitle: 'Services — Conseil ERP, développement & transformation digitale',
        metaDescription:
          'Services complets : conseil ERP, transformation digitale, développement sur mesure, web et mobile, mise en œuvre ERP, migration de données, support et maintenance.',
        eyebrow: 'Nos services',
        title: 'Services logiciels de bout en bout',
        description:
          'Une offre complète et personnalisée pour répondre à tous vos besoins — du conseil initial au support continu.',
        breadcrumb: 'Services',
      },
      products: {
        metaTitle: 'Produits — Nexus ERP, CRM, Bois & Smart Point',
        metaDescription:
          'Découvrez la suite Nexus : Nexus ERP pour la gestion globale, Nexus CRM pour la relation client, Nexus Bois pour le bois et Nexus Smart Point pour le point de vente.',
        eyebrow: 'Nos produits',
        title: 'La suite logicielle Nexus',
        description:
          'Une famille de produits intégrés couvrant ERP, CRM, opérations sectorielles et point de vente — conçue, maintenue et supportée en Tunisie.',
        breadcrumb: 'Produits',
      },
      references: {
        metaTitle: 'Références — Nos clients & études de cas',
        metaDescription:
          'Découvrez les entreprises tunisiennes qui font confiance à Business Software — du manufacturier au commerce de détail, en passant par la santé et la construction.',
        eyebrow: 'Références',
        title: 'Des entreprises tunisiennes de référence',
        description:
          'Plus de 150 clients actifs dans 8 secteurs utilisent nos logiciels. Voici quelques organisations dont nous sommes fiers.',
        breadcrumb: 'Références',
      },
    },
    contactForm: {
      subjects: [
        'Demande de démo',
        'Conseil ERP',
        'Développement sur mesure',
        'Mise en œuvre ERP',
        'Support technique',
        'Partenariat',
        'Autre',
      ],
    },
  },
  ar: {
    common: {
      home: 'الرئيسية',
      requestDemo: 'طلب عرض',
      english: 'English',
      french: 'Français',
      arabic: 'العربية',
      learnMore: 'اعرف المزيد',
      viewAllProducts: 'عرض جميع المنتجات',
      bookConsultation: 'احجز استشارة',
      language: 'اللغة',
      contactOurTeam: 'تواصل مع فريقنا',
      allProducts: 'جميع المنتجات',
      backToHome: 'العودة إلى الرئيسية',
      browseProducts: 'تصفح المنتجات',
      pageNotFound: 'الصفحة غير موجودة',
      pageNotFoundDescription: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    },
    nav: [
      { label: 'الرئيسية', href: '/' },
      { label: 'من نحن', href: '/about' },
      { label: 'المنتجات', href: '/products' },
      { label: 'الخدمات', href: '/services' },
      { label: 'القطاعات', href: '/industries' },
      { label: 'عملاؤنا', href: '/references' },
      { label: 'اتصل بنا', href: '/contact' },
    ],
    home: {
      hero: {
        eyebrow: 'ERP تونسي منذ 2006',
        title: 'قم بتشغيل أعمالك بالكامل على',
        description:
          'ERP التونسي القوي والسهل الاستخدام الذي يُحسّن المالية والمبيعات والمخزون والإنتاج والموارد البشرية — جميعها في منصة متكاملة مصممة للامتثال المحلي.',
        requestDemo: 'طلب عرض',
        exploreProducts: 'استكشف المنتجات',
        stats: {
          expertise: 'أكثر من 18 عاماً من الخبرة',
          clients: 'أكثر من 150 عميل نشط',
          compliance: 'امتثال تونسي مدمج',
        },
      },
      about: {
        eyebrow: 'من نحن',
        title: 'شريكك في البرمجيات المؤسسية منذ {year}',
        description:
          'تأسست في {year}، {companyName} هي شركة برمجيات تونسية متخصصة في تكنولوجيا المعلومات والاستشارات المؤسسية. مهمتنا هي مرافقة الشركات في كل مرحلة — من التصميم إلى نشر أنظمة تقنية قوية ومبتكرة. هدفنا: مساعدة عملائنا على زيادة الإنتاجية والربحية والاستجابة.',
        cta: 'اعرف المزيد عنا',
        points: [
          'ناشر ERP تونسي منذ 2006',
          'أكثر من 150 عميل نشط في 8 قطاعات',
          'دعم محلي واستشارات مخصصة',
          'متوافق مع اللوائح الضريبية التونسية',
        ],
      },
      highlights: {
        eyebrow: 'لماذا Business Software',
        title: 'مصمم للشركات التونسية، مستعد للنمو',
        description:
          'قرابة عقدين من بناء وصيانة برامج الأعمال التي تعتمد عليها الشركات في تونس يومياً.',
        items: [
          {
            title: 'الامتثال التونسي',
            description: 'مصمم للأنظمة الضريبية والضريبية على القيمة المضافة والنظام الاجتماعي التونسي بشكل جاهز.',
            icon: 'ShieldCheck',
          },
          {
            title: 'هيكلية معيارية',
            description: 'قم بنشر الوحدات التي تحتاجها اليوم وقم بتوسيعها مع نمو نشاطك.',
            icon: 'Boxes',
          },
          {
            title: 'دعم مخصص',
            description: 'فريق دعم محلي سريع الاستجابة متاح عندما تحتاج إليه.',
            icon: 'Users',
          },
          {
            title: 'مؤشرات فورية',
            description: 'لوحات القيادة ومؤشرات الأداء التي تمنحك رؤية كاملة عبر كل وظيفة.',
            icon: 'BarChart3',
          },
        ],
      },
      featuredProducts: {
        eyebrow: 'منتجاتنا',
        title: 'مجموعة برمجيات Nexus',
        description:
          'عائلة من المنتجات المتكاملة التي تغطي ERP وCRM والعمليات الخاصة بالقطاع ونقاط البيع — كلها مصممة ومصانة في تونس.',
        cta: 'استكشف المنتج',
        viewAll: 'عرض جميع المنتجات',
      },
      services: {
        eyebrow: 'خدماتنا',
        title: 'خدمات برمجية كاملة',
        description:
          'مجموعة متكاملة ومخصصة لتلبية جميع احتياجاتك — من الاستشارات والتطوير إلى الدعم والصيانة.',
        cta: 'اعرف المزيد',
      },
      industries: {
        eyebrow: 'القطاعات التي نخدمها',
        title: 'حلول مخصصة لقطاعك',
        description:
          'نحن ندرك أن لكل قطاع عمليات وتحديات فريدة. حلولنا مصممة لتناسب الطريقة الفعلية لعملك.',
        cta: 'اعرف المزيد',
      },
      whyChooseUs: {
        eyebrow: 'لماذا نحن',
        title: 'شريك تونسي موثوق، وليس مجرد مورد',
        description:
          'تختار الشركات في تونس Business Software لأننا نجمع بين التميز التقني والشراكة الحقيقية — ونبقى معك طويلًا بعد التشغيل.',
        cardTitle: 'وعدنا لكل عميل',
        cardDescription:
          'نلتزم بتقديم برمجيات موثوقة ومتوافقة وفعالة — مدعومة بالدعم السريع والتحسين المستمر.',
        promises: [
          'تسليم في الوقت المحدد وفي الميزانية',
          'امتثال تنظيمي تونسي',
          'فريق دعم محلي مخصص',
          'تطوير مستمر للمنتج',
        ],
        reasons: [
          {
            title: 'رضا العميل هو أولويتنا المطلقة',
            description:
              'نقيس نجاحنا بنتائجك. تبدأ كل شراكة بفهم نشاطك وتنتهي بحل يمكنك فريقك الاعتماد عليه.',
          },
          {
            title: 'خبرة عميقة في السوق التونسي',
            description:
              'نحن من مواليد تونس ونعرف اللوائح المحلية وثقافة الأعمال والتحديات الحقيقية التي تواجه الشركات التونسية يومياً.',
          },
          {
            title: 'خدمة سريعة ومخصصة',
            description:
              'نوفر مجموعة كاملة من الخدمات السريعة والمخصصة. يعرف فريقك المخصص نشاطك ويكون متاحًا عند الحاجة.',
          },
          {
            title: 'من التصميم إلى الدعم طويل الأمد',
            description:
              'نرافقك في كل مرحلة — من التحليل الأولي والتصميم إلى النشر والتدريب والدعم المستمر والصيانة.',
          },
        ],
      },
      process: {
        eyebrow: 'كيف نعمل',
        title: 'خريطة طريق بسيطة من الاستراتيجية إلى النمو',
        description:
          'نمزج بين الخبرة المحلية ومعرفة ERP والدعم العملي لمساعدة فرقك على اعتماد النظام المناسب بثقة.',
        cta: 'احجز استشارة',
        steps: [
          {
            title: 'اكتشاف',
            description: 'نرسم عملياتك ونقاط الألم وأهداف النمو لتحديد ERP المناسب.',
          },
          {
            title: 'تنفيذ',
            description: 'نقوم بتهيئة المنصة وربط بياناتك وتوجيه فرقك خلال التشغيل السلس.',
          },
          {
            title: 'التوسع',
            description: 'نبقى قريبين مع الدعم والتقارير والتحسين المستمر مع نمو عملك.',
          },
        ],
      },
      statistics: {
        eyebrow: 'بالأرقام',
        title: 'موثوق في كل أنحاء تونس',
        description:
          'قرابة عقدين من بناء البرمجيات التي تعتمد عليها المؤسسات التونسية.',
      },
      clients: {
        eyebrow: 'عملاؤنا',
        title: 'موثوق من قبل شركات تونسية رائدة',
        description:
          'من التصنيع والتوزيع إلى التجزئة والرعاية الصحية، تعتمد المنظمات في تونس على برامجنا.',
      },
      testimonials: {
        eyebrow: 'التعليقات',
        title: 'ما يقوله عملاؤنا',
        description: 'نتائج حقيقية من شركات تونسية حقيقية تستخدم Nexus.',
      },
      contactPreview: {
        eyebrow: 'تواصل معنا',
        title: 'دعنا نتحدث عن مشروعك',
        description:
          'سواء كنت تستكشف ERP لأول مرة أو تقوم بتحديث أنظمتك الحالية، فريقنا جاهز لمساعدتك. سنعاود الاتصال بك خلال يوم عمل واحد.',
        cta: 'اتصل بنا',
        emailTitle: 'راسلنا عبر البريد',
        callTitle: 'اتصل بنا',
        visitTitle: 'قم بزيارتنا',
      },
    },
    footer: {
      companyTitle: 'الشركة',
      productsTitle: 'المنتجات',
      servicesTitle: 'الخدمات',
      contactTitle: 'اتصل بنا',
      contactDetailsTitle: 'بيانات الاتصال',
      adminDashboard: 'لوحة الإدارة',
      productLinks: [
        { label: 'Nexus ERP', href: '/products/nexus-erp' },
        { label: 'Nexus CRM', href: '/products/nexus-crm' },
        { label: 'Nexus Bois', href: '/products/nexus-bois' },
        { label: 'Nexus Smart Point', href: '/products/nexus-smart-point' },
      ],
      serviceLinks: [
        { label: 'استشارات ERP', href: '/services#erp-consulting' },
        { label: 'التحول الرقمي', href: '/services#digital-transformation' },
        { label: 'تطوير خاص', href: '/services#custom-software-development' },
        { label: 'تنفيذ ERP', href: '/services#erp-implementation' },
      ],
      copy: '© {year} Business Software TN. جميع الحقوق محفوظة.',
      founded: 'تأسست في 2006 · تونس، تونس',
    },
    pages: {
      about: {
        metaTitle: 'من نحن — قصتنا، مهمتنا وفريقنا',
        metaDescription:
          'تأسست في 2006، Business Software TN هي شركة برمجيات تونسية متخصصة في حلول ERP، البرمجة المخصصة والاستشارات التقنية.',
        eyebrow: 'من نحن',
        title: 'نبني برامج الأعمال لتونس منذ 2006',
        description:
          'شركة برمجيات تونسية متخصصة في تكنولوجيا المعلومات والاستشارات المؤسسية — نرافق الشركات من التصميم حتى نشر أنظمة تقنية قوية ومبتكرة.',
        breadcrumb: 'من نحن',
        story: {
          eyebrow: 'قصتنا',
          title: 'من شركة ناشئة محلية إلى محرر ERP موثوق',
          paragraph1:
            'تأسست في {foundedYear}، {companyName} هي شركة برمجيات تونسية متخصصة في تكنولوجيا المعلومات والاستشارات المؤسسية. مهمتنا هي مرافقة الشركات في كل مرحلة — من التصميم إلى نشر أنظمة تقنية قوية ومبتكرة.',
          paragraph2:
            'هدفنا الأساسي هو مساعدة عملائنا على زيادة إنتاجيتهم وربحيتهم واستجابتهم في سوق تنافسية بشكل متزايد. على مدى ما يقارب عقدين، قمنا ببناء وتطوير مجموعة Nexus — ERP وCRM وإصدارات قطاعية ونقاط بيع — التي يثق بها أكثر من 150 عميلاً نشطاً في 8 قطاعات.',
          paragraph3:
            'ما يميزنا هو جذورنا التونسية. نبني برمجيات تفهم اللوائح المحلية وثقافة الأعمال والتحديات الحقيقية التي تواجهها الشركات التونسية — مدعومة بفريق دعم محلي متواجد دائماً عند الحاجة.',
        },
        mission: {
          title: 'مهمتنا',
          description:
            'مرافقة الشركات في كل مرحلة — من التصميم إلى نشر أنظمة تقنية قوية ومبتكرة — ومساعدتها على زيادة الإنتاجية والربحية والاستجابة.',
        },
        vision: {
          title: 'رؤيتنا',
          description:
            'أن نكون الشركة التونسية الرائدة في مجال البرمجيات، من خلال تمكين كل شركة — كبيرة أو صغيرة — بتقنية موثوقة وميسرة ومتوافقة تدفع نحو نمو مستدام.',
        },
        values: [
          {
            title: 'التزامنا بالعميل',
            description: 'العميل الراضٍ هو أولويتنا القصوى. نُقِيم نجاحنا من خلال نتائجك.',
            icon: 'HeartHandshake',
          },
          {
            title: 'الخبرة',
            description: 'ما يقرب من عقدين من بناء برامج الأعمال للشركات التونسية والدولية.',
            icon: 'Award',
          },
          {
            title: 'الابتكار',
            description: 'نستثمر باستمرار في التقنيات الجديدة للحفاظ على تقدم عملائنا.',
            icon: 'Lightbulb',
          },
          {
            title: 'الموثوقية',
            description: 'برمجيات قوية ومختبرة ودعم سريع يمكن الاعتماد عليه يوميًا.',
            icon: 'ShieldCheck',
          },
          {
            title: 'الشراكة',
            description: 'نرافقك في كل مرحلة — من التصميم إلى النشر وحتى بعد التشغيل.',
            icon: 'Users',
          },
          {
            title: 'الجذور التونسية',
            description: 'تم تطويرها في تونس بفهم عميق للوائح المحلية وثقافة الأعمال.',
            icon: 'MapPin',
          },
        ],
        valuesSection: {
          eyebrow: 'قيمنا',
          title: 'ما نؤمن به',
          description: 'المبادئ التي توجه كيفية بناء برمجياتنا وتعاملنا مع عملائنا.',
        },
        timeline: [
          {
            year: '2006',
            title: 'التأسيس',
            description: 'تأسست Business Software في تونس بهدف بناء برمجيات الأعمال للشركات التونسية.',
          },
          {
            year: '2009',
            title: 'الإصدار الأول من Nexus ERP',
            description: 'أطلقنا أول إصدار من Nexus ERP، واستُخدم بسرعة من قبل الشركات المصنعة والموزعين.',
          },
          {
            year: '2013',
            title: 'Nexus CRM والجوال',
            description: 'وسعنا المنصة مع Nexus CRM وتطبيقات جوال أصلية لفِرَق المبيعات الميدانية.',
          },
          {
            year: '2016',
            title: 'Nexus Bois',
            description: 'أطلقنا Nexus Bois، وهو ERP متخصص في صناعة الخشب والأثاث مع تحسين عمليات القطع.',
          },
          {
            year: '2019',
            title: 'Nexus Smart Point',
            description: 'أطلقنا نظام نقاط بيع أولي يعمل دون اتصال بالإنترنت، متكاملًا مع Nexus ERP.',
          },
          {
            year: '2022',
            title: 'السحابة والتحول الرقمي',
            description: 'قدمنا النشر السحابي وممارسة استشارية مخصصة للتحول الرقمي.',
          },
          {
            year: '2024',
            title: 'أكثر من 150 عميلًا نشطًا',
            description: 'نخدم اليوم أكثر من 150 عميلًا نشطًا عبر 8 قطاعات مع فريق يضم أكثر من 45 خبيرًا.',
          },
        ],
        timelineSection: {
          eyebrow: 'مسيرتنا',
          title: 'محطات بارزة على الطريق',
          description: 'أهم اللحظات في نمونا من شركة ناشئة محلية إلى محرر برمجيات تونسي موثوق.',
        },
        team: [
          {
            name: 'رياض خليّل',
            role: 'المؤسس والرئيس التنفيذي',
            bio: 'رائد في مجال البرمجيات بخبرة تزيد عن 20 عامًا في بناء أنظمة المؤسسات للشركات التونسية والدولية.',
            initials: 'RK',
          },
          {
            name: 'نادية فرشيشي',
            role: 'CTO',
            bio: 'تؤدي إدارة فرق الهندسة وبنية المنصة مع شغف ببرمجيات موثوقة وقابلة للتطوير.',
            initials: 'NF',
          },
          {
            name: 'سليم بوعزيزي',
            role: 'رئيس التنفيذ',
            bio: 'يراقب عمليات تنفيذ ERP ويضمن تسليم كل مشروع في الوقت المناسب وبما يوافق المواصفات.',
            initials: 'SB',
          },
          {
            name: 'آمال الساسي',
            role: 'رئيس الاستشارات',
            bio: 'ترافق العملاء خلال تحولهم الرقمي بخبرة عميقة في تحسين العمليات.',
            initials: 'AS',
          },
          {
            name: 'واسيم جلاصي',
            role: 'رئيس الدعم',
            bio: 'يرأس منظمة الدعم لضمان حصول العملاء على مساعدة سريعة وفعالة في كل وقت.',
            initials: 'WJ',
          },
          {
            name: 'درة حمدي',
            role: 'رئيس المبيعات',
            bio: 'يعمل مع العملاء المحتملين للعثور على الحلول المناسبة لتحديات أعمالهم.',
            initials: 'DH',
          },
        ],
        leadershipSection: {
          eyebrow: 'القيادة',
          title: 'تعرف على الفريق وراء Business Software',
          description: 'قادة ذوو خبرة يوجهون مهمتنا لبناء برمجيات يمكن للشركات التونسية الاعتماد عليها.',
        },
        offices: [
          {
            name: 'المقر الرئيسي — تونس',
            address: 'Les Berges du Lac II, Rue du Lac Windermere, 1053 Tunis, تونس',
            phone: '+216 71 902 456',
            email: 'contact@businesssoftware.com.tn',
            hours: 'الاثنين – الجمعة: 8:30 – 18:00',
          },
          {
            name: 'مكتب صفاقس',
            address: 'Route de Gabès, Imm. Ekhtebar, 3027 Sfax, تونس',
            phone: '+216 74 401 122',
            email: 'sfax@businesssoftware.com.tn',
            hours: 'الاثنين – الجمعة: 8:30 – 18:00',
          },
        ],
        officesSection: {
          eyebrow: 'مكاتبنا',
          title: 'أين تجدنا',
          description: 'مقرنا في تونس مع مكتب إقليمي في صفاقس — نخدم عملاءنا في جميع أنحاء البلاد.',
        },
      },
      contact: {
        metaTitle: 'اتصل بنا — تواصل مع Business Software TN',
        metaDescription:
          'تواصل مع Business Software TN لطلب عروض ERP والاستشارات والتطوير المخصص والدعم. مكاتبنا في تونس وصفاقس، تونس.',
        eyebrow: 'اتصل بنا',
        title: 'دعنا نتحدث عن مشروعك',
        description:
          'سواء كنت تستكشف ERP لأول مرة أو تقوم بتحديث أنظمتك الحالية، فريقنا جاهز لمساعدتك. سنعود إليك في غضون يوم عمل واحد.',
        breadcrumb: 'اتصل بنا',
        contactDetailsHeading: 'بيانات الاتصال',
        emailLabel: 'البريد الإلكتروني',
        phoneLabel: 'الهاتف',
        websiteLabel: 'الموقع الإلكتروني',
        hoursLabel: 'ساعات العمل',
        mapTitle: 'اعثر علينا في تونس',
        mapDescription:
          'عنصر نائب لتكامل خرائط جوجل',
        form: {
          heading: 'أرسل لنا رسالة',
          subheading: 'املأ النموذج وسنعاود الاتصال بك قريباً.',
          fullName: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          phone: 'الهاتف',
          company: 'الشركة',
          subject: 'الموضوع',
          message: 'الرسالة',
          consent: 'أوافق على أن تتواصل معي شركة Business Software TN بخصوص استفساري.',
          sendMessage: 'إرسال الرسالة',
          sending: 'جارٍ الإرسال...',
          placeholder: {
            name: 'أحمد علي',
            email: 'ahmed@company.com',
            phone: '+216 71 000 000',
            company: 'اسم شركتك',
            subject: 'اختر موضوعاً',
            message: 'أخبرنا عن مشروعك أو سؤالك...',
          },
          thankYou: 'شكراً لك!',
          sent: 'تم استلام رسالتك. سيعاود فريقنا الاتصال بك خلال يوم عمل واحد.',
          sendAnother: 'أرسل رسالة أخرى',
        },
      },
      industries: {
        metaTitle: 'القطاعات — حلول لقطاعك',
        metaDescription:
          'حلول ERP والبرمجيات المصممة خصيصاً لقطاعات التصنيع والتجزئة والتوزيع والبناء والخشب والصحة والتعليم في تونس.',
        eyebrow: 'القطاعات',
        title: 'حلول مخصصة لقطاعك',
        description:
          'كل قطاع له تحدياته الخاصة. حلولنا مصممة لتناسب طريقة عملك الفعلية — وليس العكس.',
        breadcrumb: 'القطاعات',
      },
      services: {
        metaTitle: 'الخدمات — استشارات ERP، التطوير والتحول الرقمي',
        metaDescription:
          'خدمات شاملة: استشارات ERP، التحول الرقمي، التطوير المخصص، الويب والهواتف، تنفيذ ERP، ترحيل البيانات، الدعم والصيانة.',
        eyebrow: 'خدماتنا',
        title: 'خدمات برمجية كاملة',
        description:
          'مجموعة متكاملة ومخصصة لتلبية جميع احتياجاتك — من الاستشارة الأولى إلى الدعم المستمر.',
        breadcrumb: 'الخدمات',
      },
      products: {
        metaTitle: 'المنتجات — Nexus ERP، CRM، Bois و Smart Point',
        metaDescription:
          'اكتشف مجموعة Nexus: Nexus ERP لإدارة الأعمال، Nexus CRM للعلاقات مع العملاء، Nexus Bois لقطاع الأخشاب، و Nexus Smart Point لنقاط البيع.',
        eyebrow: 'منتجاتنا',
        title: 'مجموعة برمجيات Nexus',
        description:
          'مجموعة متكاملة تغطي ERP و CRM والعمليات القطاعية ونقاط البيع — مصممة ومدعومة في تونس.',
        breadcrumb: 'المنتجات',
      },
      references: {
        metaTitle: 'عملاؤنا — رؤى وحالات نجاح',
        metaDescription:
          'اكتشف الشركات التونسية التي تثق في Business Software — من التصنيع إلى التجزئة والصحة والبناء.',
        eyebrow: 'عملاؤنا',
        title: 'موثوقون من قِبل شركات تونسية رائدة',
        description:
          'أكثر من 150 عميل نشط في 8 قطاعات يعملون على برامجنا. إليك بعض المؤسسات التي نفخر بها.',
        breadcrumb: 'عملاؤنا',
      },
    },
    contactForm: {
      subjects: [
        'طلب عرض',
        'استشارات ERP',
        'تطوير مخصص',
        'تنفيذ ERP',
        'دعم فني',
        'شراكة',
        'أخرى',
      ],
    },
  },
};

export function getDictionary(locale: string | null | undefined) {
  const key = locale && locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  return dictionaries[key];
}