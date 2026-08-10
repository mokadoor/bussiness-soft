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
