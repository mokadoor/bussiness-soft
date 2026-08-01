export const company = {
  name: 'Business Software TN',
  shortName: 'Business Software',
  legalName: 'Business Software',
  foundedYear: 2006,
  tagline: 'ERP Solutions & Digital Transformation',
  description:
    'A Tunisian software company specialized in ERP solutions, custom software development, digital transformation, and IT consulting.',
  email: 'contact@businesssoftware.com.tn',
  phone: '+216 71 902 456',
  phoneSecondary: '+216 71 902 457',
  website: 'https://businessoftware.com.tn',
  address: {
    street: 'Les Berges du Lac II, Rue du Lac Windermere',
    city: 'Tunis',
    postalCode: '1053',
    country: 'Tunisia',
  },
  hours: 'Monday – Friday: 8:30 – 18:00',
  social: {
    linkedin: 'https://www.linkedin.com/company/business-software-tn',
    facebook: 'https://www.facebook.com/businessoftware',
    twitter: 'https://twitter.com/businessoftware',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'References', href: '/references' },
  { label: 'Contact', href: '/contact' },
];

export const stats = [
  { label: 'Years of Expertise', value: 18, suffix: '+' },
  { label: 'Projects Delivered', value: 320, suffix: '+' },
  { label: 'Active Clients', value: 150, suffix: '+' },
  { label: 'Team Members', value: 45, suffix: '+' },
  { label: 'Client Retention', value: 97, suffix: '%' },
  { label: 'Industries Served', value: 8, suffix: '' },
];

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  summary: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: 'erp-consulting',
    title: 'ERP Consulting',
    shortTitle: 'ERP Consulting',
    icon: 'Compass',
    summary:
      'Strategic guidance to select, plan, and deploy the right ERP for your operations.',
    description:
      'Our ERP consulting experts analyze your business processes, identify optimization opportunities, and design a tailored ERP roadmap that aligns with your strategic objectives — reducing risk and maximizing ROI.',
    features: [
      'Business process analysis & mapping',
      'ERP vendor evaluation & selection',
      'Implementation roadmap design',
      'ROI & TCO modelling',
      'Change management strategy',
    ],
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    shortTitle: 'Digital Transformation',
    icon: 'Workflow',
    summary:
      'End-to-end transformation that modernizes how your organization operates.',
    description:
      'We help you reimagine operations through digital technologies — from paperless workflows and cloud migration to automation and data-driven decision making — building a resilient, future-ready enterprise.',
    features: [
      'Digital maturity assessment',
      'Process automation & paperless workflows',
      'Cloud migration strategy',
      'Data-driven decision frameworks',
      'Organizational change enablement',
    ],
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    icon: 'Code2',
    summary:
      'Bespoke applications engineered to fit your exact business requirements.',
    description:
      'When off-the-shelf software falls short, our engineering team builds custom applications precisely tailored to your processes, integrations, and scale — delivered with enterprise-grade quality and maintainability.',
    features: [
      'Requirements engineering & architecture',
      'Full-stack custom application development',
      'API & third-party system integration',
      'Quality assurance & automated testing',
      'Long-term maintenance & evolution',
    ],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'Web Development',
    icon: 'Globe',
    summary:
      'High-performance web platforms and portals built for scale and speed.',
    description:
      'We design and build modern, responsive web platforms — from corporate websites to customer portals and e-commerce — engineered for performance, SEO, and conversion.',
    features: [
      'Corporate websites & landing pages',
      'Customer & partner portals',
      'E-commerce & booking platforms',
      'Headless CMS architecture',
      'Core Web Vitals & SEO optimization',
    ],
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Development',
    shortTitle: 'Mobile Development',
    icon: 'Smartphone',
    summary:
      'Native and cross-platform mobile apps for iOS and Android.',
    description:
      'We build intuitive, high-performance mobile applications that extend your business systems to the field — with offline support, real-time sync, and seamless ERP integration.',
    features: [
      'iOS & Android native apps',
      'Cross-platform (React Native) development',
      'Offline-first architecture',
      'Push notifications & real-time sync',
      'ERP & backend integration',
    ],
  },
  {
    slug: 'erp-implementation',
    title: 'ERP Implementation',
    shortTitle: 'ERP Implementation',
    icon: 'Boxes',
    summary:
      'Disciplined deployment of Nexus ERP with minimal business disruption.',
    description:
      'From configuration and data migration to user training and go-live, we manage the full ERP implementation lifecycle using a proven methodology that keeps your operations running.',
    features: [
      'Configuration & module setup',
      'Data migration & validation',
      'User training & documentation',
      'Pilot, go-live & hyper-care',
      'Post-implementation optimization',
    ],
  },
  {
    slug: 'data-migration',
    title: 'Data Migration',
    shortTitle: 'Data Migration',
    icon: 'Database',
    summary:
      'Secure, accurate migration of legacy data into your new systems.',
    description:
      'We move your data with precision — cleansing, transforming, and validating every record so your new system starts with data you can trust, backed by reconciliation and rollback safety.',
    features: [
      'Legacy data profiling & mapping',
      'Data cleansing & deduplication',
      'ETL pipeline development',
      'Reconciliation & validation',
      'Rollback & cutover planning',
    ],
  },
  {
    slug: 'technical-support',
    title: 'Technical Support',
    shortTitle: 'Technical Support',
    icon: 'LifeBuoy',
    summary:
      'Responsive support across multiple service levels, 24/7 when you need it.',
    description:
      'Our support team resolves issues fast with tiered SLAs, a dedicated helpdesk, and remote assistance — keeping your systems healthy and your teams productive.',
    features: [
      'Tiered SLA-based support (L1–L3)',
      'Dedicated helpdesk & ticketing',
      'Remote assistance & diagnostics',
      'Incident & problem management',
      'Knowledge base & self-service',
    ],
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & Evolution',
    shortTitle: 'Maintenance',
    icon: 'Wrench',
    summary:
      'Ongoing maintenance and continuous improvement of your software assets.',
    description:
      'Software is never finished. We keep your systems secure, compliant, and evolving — with proactive monitoring, patching, and feature enhancements that protect your investment.',
    features: [
      'Proactive monitoring & alerting',
      'Security patching & compliance',
      'Performance optimization',
      'Feature enhancements & upgrades',
      'Version & dependency management',
    ],
  },
];

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  icon: string;
  color: string;
  image: string;
  summary: string;
  description: string;
  features: { title: string; description: string; icon: string }[];
  benefits: string[];
  modules: { name: string; description: string; icon: string }[];
  faqs: { question: string; answer: string }[];
};

export const products: Product[] = [
  {
    slug: 'nexus-erp',
    name: 'Nexus ERP',
    tagline: 'The complete Tunisian ERP to run your entire business',
    category: 'ERP Suite',
    icon: 'Boxes',
    color: 'from-[#0F4C81] to-[#00A8E8]',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary:
      'A powerful, user-friendly ERP covering finance, sales, purchasing, inventory, production, and HR — built for Tunisian regulations and scalable to multi-company groups.',
    description:
      'Nexus ERP is the flagship product of Business Software. Designed and maintained in Tunisia, it unifies your core business processes into a single, integrated platform. From accounting and fiscal management compliant with Tunisian law to production planning and multi-site inventory, Nexus ERP gives you real-time visibility and control across your entire operation. Its modular architecture means you deploy what you need today and expand as you grow.',
    features: [
      {
        title: 'Unified Finance & Accounting',
        description:
          'Full general ledger, payables, receivables, and cash management — fully compliant with Tunisian fiscal regulations and reporting.',
        icon: 'Landmark',
      },
      {
        title: 'Sales & CRM',
        description:
          'Manage the entire sales cycle from quotations to delivery and invoicing, with integrated customer relationship tracking.',
        icon: 'ShoppingCart',
      },
      {
        title: 'Purchasing & Supply',
        description:
          'Streamline procurement from requisition to payment, with vendor management and automated approval workflows.',
        icon: 'PackageCheck',
      },
      {
        title: 'Inventory & Warehousing',
        description:
          'Real-time stock across multiple warehouses, with batch tracking, valuation methods, and reorder automation.',
        icon: 'Warehouse',
      },
      {
        title: 'Production & MRP',
        description:
          'Plan and control manufacturing operations with bills of material, routing, work orders, and capacity planning.',
        icon: 'Factory',
      },
      {
        title: 'HR & Payroll',
        description:
          'Manage employees, attendance, leave, and Tunisian-compliant payroll with automated declarations.',
        icon: 'Users',
      },
    ],
    benefits: [
      'Real-time visibility across all business functions',
      'Tunisian fiscal and legal compliance built in',
      'Modular — deploy at your own pace',
      'Multi-company and multi-site support',
      'Reduced operational costs and errors',
      'Faster, data-driven decision making',
    ],
    modules: [
      { name: 'Finance & Accounting', description: 'GL, AP, AR, cash, fixed assets', icon: 'Landmark' },
      { name: 'Sales Management', description: 'Quotes, orders, delivery, invoicing', icon: 'ShoppingCart' },
      { name: 'Purchasing', description: 'Requisitions, POs, receiving, supplier portal', icon: 'PackageCheck' },
      { name: 'Inventory', description: 'Multi-warehouse, batches, valuation', icon: 'Warehouse' },
      { name: 'Production (MRP)', description: 'BOMs, routing, work orders, capacity', icon: 'Factory' },
      { name: 'HR & Payroll', description: 'Employees, attendance, payroll, declarations', icon: 'Users' },
      { name: 'CRM', description: 'Leads, opportunities, customer pipeline', icon: 'HeartHandshake' },
      { name: 'Reporting & BI', description: 'Dashboards, KPIs, custom reports', icon: 'BarChart3' },
    ],
    faqs: [
      {
        question: 'Is Nexus ERP compliant with Tunisian regulations?',
        answer:
          'Yes. Nexus ERP is built and maintained in Tunisia with full compliance to local fiscal regulations, VAT handling, CNSS declarations, and statutory reporting.',
      },
      {
        question: 'Can we start with a few modules and expand later?',
        answer:
          'Absolutely. Nexus ERP is modular by design. Most clients begin with finance and sales, then add inventory, production, or HR as their needs grow.',
      },
      {
        question: 'Does it support multiple companies or sites?',
        answer:
          'Yes. Nexus ERP handles multi-company and multi-site operations with consolidated reporting and inter-company transactions.',
      },
      {
        question: 'Can it be customized to our specific processes?',
        answer:
          'Yes. Beyond configuration, our development team can build custom modules and integrations tailored to your unique workflows.',
      },
    ],
  },
  {
    slug: 'nexus-crm',
    name: 'Nexus CRM',
    tagline: 'Build lasting customer relationships and close more deals',
    category: 'Customer Relationship',
    icon: 'HeartHandshake',
    color: 'from-[#00A8E8] to-[#0F4C81]',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary:
      'A complete CRM to manage leads, opportunities, sales pipelines, and customer interactions — fully integrated with Nexus ERP.',
    description:
      'Nexus CRM helps your sales and service teams manage the entire customer journey — from first contact to long-term loyalty. Track leads, prioritize opportunities, automate follow-ups, and gain a 360° view of every customer. Because it shares a platform with Nexus ERP, your sales team sees real-time stock, pricing, and order status without leaving the CRM.',
    features: [
      {
        title: 'Lead & Opportunity Management',
        description:
          'Capture leads from web, email, and events; qualify and route them through customizable sales pipelines.',
        icon: 'Target',
      },
      {
        title: '360° Customer View',
        description:
          'Every interaction, order, invoice, and support ticket in one timeline — for every customer and prospect.',
        icon: 'Eye',
      },
      {
        title: 'Sales Pipeline & Forecasting',
        description:
          'Visual pipelines with drag-and-drop stages, weighted forecasting, and win/loss analytics.',
        icon: 'TrendingUp',
      },
      {
        title: 'Activity & Task Automation',
        description:
          'Automate follow-ups, reminders, and task assignment so nothing falls through the cracks.',
        icon: 'CalendarClock',
      },
      {
        title: 'Marketing Campaigns',
        description:
          'Plan and track campaigns, measure ROI, and nurture leads with targeted segmentation.',
        icon: 'Megaphone',
      },
      {
        title: 'Native ERP Integration',
        description:
          'Real-time access to stock, pricing, customer balances, and order status directly within the CRM.',
        icon: 'Link2',
      },
    ],
    benefits: [
      'Higher conversion rates with structured pipelines',
      'No data silos — CRM and ERP in one platform',
      'Automated follow-ups save hours per week',
      'Accurate sales forecasting and reporting',
      'Better customer experience with full history',
      'Mobile access for field sales teams',
    ],
    modules: [
      { name: 'Lead Management', description: 'Capture, qualify, and route leads', icon: 'Target' },
      { name: 'Sales Pipeline', description: 'Drag-and-drop deal stages & forecasting', icon: 'TrendingUp' },
      { name: 'Customer 360', description: 'Full interaction & transaction timeline', icon: 'Eye' },
      { name: 'Activity Tracking', description: 'Calls, meetings, tasks, reminders', icon: 'CalendarClock' },
      { name: 'Campaigns', description: 'Marketing campaigns & ROI tracking', icon: 'Megaphone' },
      { name: 'Mobile CRM', description: 'iOS & Android apps for field teams', icon: 'Smartphone' },
    ],
    faqs: [
      {
        question: 'Does Nexus CRM work standalone or does it require Nexus ERP?',
        answer:
          'It can run standalone, but the greatest value comes from running it alongside Nexus ERP, where it shares customer, stock, and order data in real time.',
      },
      {
        question: 'Is there a mobile app for field sales teams?',
        answer:
          'Yes. Nexus CRM includes native iOS and Android apps with offline support for leads, contacts, and activities on the go.',
      },
      {
        question: 'Can we customize the sales pipeline stages?',
        answer:
          'Fully. Each team can define its own pipeline stages, probabilities, and qualification criteria.',
      },
    ],
  },
  {
    slug: 'nexus-bois',
    name: 'Nexus Bois',
    tagline: 'Specialized ERP for the wood and furniture industry',
    category: 'Industry ERP',
    icon: 'TreePine',
    color: 'from-[#1d5e3a] to-[#0F4C81]',
    image: 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary:
      'An industry-specific ERP built for wood manufacturers — covering cutting optimization, BOMs, work orders, and costing.',
    description:
      'Nexus Bois is a dedicated edition of Nexus ERP engineered for the wood, joinery, and furniture industry. It understands the unique challenges of your trade — optimizing cutting plans to minimize waste, managing complex multi-level BOMs, tracking work-in-progress on the shop floor, and costing every plank and panel. From raw timber to finished furniture, Nexus Bois gives you control and profitability insight at every step.',
    features: [
      {
        title: 'Cutting Optimization',
        description:
          'Generate optimized cutting plans for panels and beams to minimize waste and maximize yield from every sheet.',
        icon: 'Scissors',
      },
      {
        title: 'Multi-level BOMs',
        description:
          'Model complex furniture assemblies with nested components, hardware, and edge banding in a single BOM.',
        icon: 'Layers',
      },
      {
        title: 'Work Order Tracking',
        description:
          'Track each work order through cutting, edge banding, drilling, assembly, and finishing on the shop floor.',
        icon: 'ClipboardList',
      },
      {
        title: 'Material Costing',
        description:
          'Accurate job costing that accounts for material, labor, machine time, and overhead down to the finished piece.',
        icon: 'Calculator',
      },
      {
        title: 'Stock by Dimensions',
        description:
          'Manage inventory by panel size, thickness, and grade — with offcut tracking and reuse.',
        icon: 'Ruler',
      },
      {
        title: 'Production Scheduling',
        description:
          'Schedule machine centers and work centers with visual planning boards and capacity constraints.',
        icon: 'CalendarRange',
      },
    ],
    benefits: [
      'Reduce raw material waste with optimized cutting',
      'Accurate job costing for profitable pricing',
      'Real-time WIP visibility on the shop floor',
      'Faster quoting from saved BOM templates',
      'Track offcuts and reuse them automatically',
      'Built by experts who know the wood industry',
    ],
    modules: [
      { name: 'Cutting Optimization', description: 'Nesting & yield maximization', icon: 'Scissors' },
      { name: 'BOM Management', description: 'Multi-level assemblies & hardware', icon: 'Layers' },
      { name: 'Work Orders', description: 'Shop-floor tracking & routing', icon: 'ClipboardList' },
      { name: 'Job Costing', description: 'Material, labor & overhead costing', icon: 'Calculator' },
      { name: 'Dimensional Stock', description: 'By size, thickness, grade & offcuts', icon: 'Ruler' },
      { name: 'Scheduling', description: 'Machine & work-center planning', icon: 'CalendarRange' },
    ],
    faqs: [
      {
        question: 'How does the cutting optimization work?',
        answer:
          'Nexus Bois runs advanced nesting algorithms that arrange your cutting list across standard panel sizes to minimize waste, and it tracks reusable offcuts for future jobs.',
      },
      {
        question: 'Can it handle custom furniture alongside standard products?',
        answer:
          'Yes. Nexus Bois supports both made-to-order custom pieces and standard catalog products, with flexible BOMs and routing for each.',
      },
      {
        question: 'Does it include everything from Nexus ERP?',
        answer:
          'Nexus Bois includes the finance, sales, purchasing, and inventory foundations of Nexus ERP, plus the specialized wood-production modules.',
      },
    ],
  },
  {
    slug: 'nexus-smart-point',
    name: 'Nexus Smart Point',
    tagline: 'Fast, reliable point of sale for retail and hospitality',
    category: 'Point of Sale',
    icon: 'ScanLine',
    color: 'from-[#00A8E8] to-[#1d5e3a]',
    image: 'https://images.pexels.com/photos/4212931/pexels-photo-4212931.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary:
      'A modern POS system for retail stores, restaurants, and service points — with offline support and real-time sync to Nexus ERP.',
    description:
      'Nexus Smart Point is a fast, reliable point-of-sale solution designed for retail chains, restaurants, and service businesses. Cashiers serve customers in seconds with an intuitive touchscreen interface, while managers monitor sales in real time across all locations. It works offline and syncs automatically when connectivity returns, and it posts every transaction directly into Nexus ERP for instant inventory and accounting updates.',
    features: [
      {
        title: 'Fast Touchscreen Checkout',
        description:
          'Barcode, search, and category-based checkout that gets customers through the line in seconds.',
        icon: 'Touchpad',
      },
      {
        title: 'Offline-First Operation',
        description:
          'Keep selling even when the internet drops — transactions sync automatically when you reconnect.',
        icon: 'WifiOff',
      },
      {
        title: 'Multi-Store Management',
        description:
          'Centralized control of products, pricing, and promotions across all your locations from one dashboard.',
        icon: 'Store',
      },
      {
        title: 'Inventory Sync',
        description:
          'Every sale instantly updates stock levels and triggers reorder alerts in Nexus ERP — no double entry.',
        icon: 'RefreshCw',
      },
      {
        title: 'Restaurant Mode',
        description:
          'Table management, kitchen order tickets, split billing, and course timing for hospitality operations.',
        icon: 'UtensilsCrossed',
      },
      {
        title: 'Payments & Receipts',
        description:
          'Integrated payment terminals, e-invoicing, and customizable receipt templates with loyalty points.',
        icon: 'CreditCard',
      },
    ],
    benefits: [
      'Serve customers faster with fast checkout',
      'Never stop selling — works offline',
      'Real-time stock across all stores',
      'One dashboard for all locations',
      'Automatic accounting posts to ERP',
      'Loyalty and promotions built in',
    ],
    modules: [
      { name: 'Checkout', description: 'Touchscreen, barcode & search checkout', icon: 'Touchpad' },
      { name: 'Offline Sync', description: 'Sell offline, sync when online', icon: 'WifiOff' },
      { name: 'Multi-Store', description: 'Central pricing, products & reporting', icon: 'Store' },
      { name: 'Restaurant', description: 'Tables, KOTs, split bills & courses', icon: 'UtensilsCrossed' },
      { name: 'Payments', description: 'Terminals, e-invoicing & receipts', icon: 'CreditCard' },
      { name: 'Loyalty', description: 'Points, rewards & customer profiles', icon: 'Award' },
    ],
    faqs: [
      {
        question: 'What happens when the internet goes down?',
        answer:
          'Nexus Smart Point keeps operating offline. All sales are stored locally and automatically sync to the server and Nexus ERP as soon as connectivity is restored.',
      },
      {
        question: 'Can it handle both a retail store and a restaurant?',
        answer:
          'Yes. Retail mode and restaurant mode are both built in — you can run a store with tables, or a pure retail checkout, from the same product.',
      },
      {
        question: 'Does it integrate with payment terminals?',
        answer:
          'Yes. Nexus Smart Point integrates with popular payment terminals and supports e-invoicing compliant with Tunisian requirements.',
      },
    ],
  },
];

export type Industry = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  solutions: string[];
};

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: 'Factory',
    description:
      'Plan production, control costs, and deliver on time with MRP, work orders, and real-time shop-floor visibility.',
    solutions: ['Nexus ERP', 'Production Planning', 'Quality Control'],
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: 'Store',
    description:
      'Unify in-store and online sales with fast POS, real-time inventory, and customer loyalty across all locations.',
    solutions: ['Nexus Smart Point', 'Inventory', 'Loyalty'],
  },
  {
    slug: 'distribution',
    name: 'Distribution',
    icon: 'Truck',
    description:
      'Optimize purchasing, warehouse operations, and route deliveries with end-to-end supply chain control.',
    solutions: ['Nexus ERP', 'Warehouse', 'Route Management'],
  },
  {
    slug: 'construction',
    name: 'Construction',
    icon: 'Building2',
    description:
      'Track projects, budgets, subcontractors, and equipment with project accounting and job costing.',
    solutions: ['Nexus ERP', 'Project Accounting', 'Job Costing'],
  },
  {
    slug: 'wood-industry',
    name: 'Wood Industry',
    icon: 'TreePine',
    description:
      'Maximize yield and control production with cutting optimization, multi-level BOMs, and dimensional stock.',
    solutions: ['Nexus Bois', 'Cutting Optimization', 'Job Costing'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: 'Stethoscope',
    description:
      'Manage clinics and pharmacies with patient records, billing, and compliant inventory control.',
    solutions: ['Custom Software', 'Billing', 'Inventory'],
  },
  {
    slug: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    description:
      'Run schools and training centers with student management, scheduling, fees, and parent portals.',
    solutions: ['Custom Software', 'Student Management', 'Portals'],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    icon: 'Briefcase',
    description:
      'Track projects, billable hours, and client engagements with project accounting and resource planning.',
    solutions: ['Nexus ERP', 'Time & Billing', 'CRM'],
  },
];

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Karim Ben Salah',
    role: 'CEO',
    company: 'Tunisie Plast Industries',
    quote:
      'Nexus ERP transformed how we run our factory. We now have real-time visibility into production and inventory, and our month-end close went from two weeks to three days.',
    rating: 5,
  },
  {
    name: 'Leila Mansour',
    role: 'CFO',
    company: 'Groupe Atlas Distribution',
    quote:
      'The team at Business Software understood our multi-company structure from day one. Consolidated reporting across our entities is now effortless and accurate.',
    rating: 5,
  },
  {
    name: 'Mohamed Trabelsi',
    role: 'Operations Director',
    company: 'Meubles & Bois du Nord',
    quote:
      'Nexus Bois cut our panel waste by nearly 18%. The cutting optimization alone paid for the project in the first year. Exceptional industry expertise.',
    rating: 5,
  },
  {
    name: 'Sonia Gharbi',
    role: 'Retail Manager',
    company: 'Market Plus Stores',
    quote:
      'We rolled out Nexus Smart Point across 14 stores in a month. Offline reliability and instant inventory sync changed how we manage our chain.',
    rating: 5,
  },
  {
    name: 'Hatem Bouzid',
    role: 'IT Director',
    company: 'MediClinic Tunis',
    quote:
      'The custom clinic management system they built is robust and intuitive. Support is responsive and the team truly understands healthcare operations.',
    rating: 5,
  },
  {
    name: 'Ines Khelifi',
    role: 'General Manager',
    company: 'Constructa TN',
    quote:
      'Project accounting and job costing in Nexus ERP gave us control over every construction site. We know our margins in real time, not after the fact.',
    rating: 5,
  },
];

export type Client = {
  name: string;
  industry: string;
  products: string[];
  description: string;
  image: string;
};

export const clients: Client[] = [
  {
    name: 'Tunisie Plast Industries',
    industry: 'Manufacturing',
    products: ['Nexus ERP'],
    image: 'https://images.pexels.com/photos/3823624/pexels-photo-3823624.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A leading plastics manufacturer unified finance, production, and inventory on Nexus ERP across two plants.',
  },
  {
    name: 'Groupe Atlas Distribution',
    industry: 'Distribution',
    products: ['Nexus ERP', 'Nexus CRM'],
    image: 'https://images.pexels.com/photos/6169023/pexels-photo-6169023.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A national distributor consolidated four companies into a single Nexus ERP instance with CRM for its sales teams.',
  },
  {
    name: 'Meubles & Bois du Nord',
    industry: 'Wood Industry',
    products: ['Nexus Bois'],
    image: 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A furniture manufacturer reduced material waste by 18% with Nexus Bois cutting optimization.',
  },
  {
    name: 'Market Plus Stores',
    industry: 'Retail',
    products: ['Nexus Smart Point', 'Nexus ERP'],
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A 14-store retail chain deployed Nexus Smart Point with real-time inventory sync to Nexus ERP.',
  },
  {
    name: 'MediClinic Tunis',
    industry: 'Healthcare',
    products: ['Custom Software'],
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A private clinic group operates on a custom clinic management platform built by our team.',
  },
  {
    name: 'Constructa TN',
    industry: 'Construction',
    products: ['Nexus ERP'],
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A construction company gained real-time project margins with Nexus ERP project accounting.',
  },
  {
    name: 'Ecole Future Plus',
    industry: 'Education',
    products: ['Custom Software'],
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A network of private schools manages students, fees, and parent communication on a tailored platform.',
  },
  {
    name: 'LogiTrans Tunisie',
    industry: 'Distribution',
    products: ['Nexus ERP', 'Nexus Smart Point'],
    image: 'https://images.pexels.com/photos/221060/pexels-photo-221060.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A logistics and wholesale distributor streamlined warehouse and route operations on Nexus ERP.',
  },
];

export const values = [
  {
    title: 'Client Commitment',
    description:
      'A satisfied client is our absolute priority. We measure our success by your results.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Expertise',
    description:
      'Nearly two decades of building business software for Tunisian and international enterprises.',
    icon: 'Award',
  },
  {
    title: 'Innovation',
    description:
      'We continuously invest in new technologies to keep our clients ahead of the curve.',
    icon: 'Lightbulb',
  },
  {
    title: 'Reliability',
    description:
      'Robust, tested software and responsive support you can depend on, day in and day out.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Partnership',
    description:
      'We accompany you at every stage — from design to deployment and long after go-live.',
    icon: 'Users',
  },
  {
    title: 'Tunisian Roots',
    description:
      'Built in Tunisia with deep understanding of local regulations and business culture.',
    icon: 'MapPin',
  },
];

export const timeline = [
  {
    year: '2006',
    title: 'Foundation',
    description:
      'Business Software is founded in Tunis with a mission to build business software for Tunisian enterprises.',
  },
  {
    year: '2009',
    title: 'First Nexus ERP Release',
    description:
      'We launch the first version of Nexus ERP, quickly adopted by manufacturers and distributors.',
  },
  {
    year: '2013',
    title: 'Nexus CRM & Mobile',
    description:
      'We expand the platform with Nexus CRM and native mobile apps for field sales teams.',
  },
  {
    year: '2016',
    title: 'Nexus Bois',
    description:
      'We release Nexus Bois, a specialized ERP for the wood and furniture industry with cutting optimization.',
  },
  {
    year: '2019',
    title: 'Nexus Smart Point',
    description:
      'We launch an offline-first POS for retail and hospitality, integrated with Nexus ERP.',
  },
  {
    year: '2022',
    title: 'Cloud & Digital Transformation',
    description:
      'We introduce cloud deployment and a dedicated digital transformation consulting practice.',
  },
  {
    year: '2024',
    title: '150+ Active Clients',
    description:
      'Today we serve over 150 active clients across 8 industries with a team of 45+ experts.',
  },
];

export const team = [
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
];

export const offices = [
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
];

export const news = [
  {
    slug: 'nexus-erp-2024-release',
    title: 'Nexus ERP 2024 Release Brings New Analytics Suite',
    excerpt:
      'Our latest release introduces powerful business intelligence dashboards and real-time KPI tracking across all modules.',
    date: '2024-09-15',
    category: 'Product',
  },
  {
    slug: 'market-plus-case-study',
    title: 'Market Plus Stores Unifies 14 Locations with Nexus Smart Point',
    excerpt:
      'How a leading Tunisian retail chain standardized its point of sale and inventory across all stores in under a month.',
    date: '2024-06-20',
    category: 'Case Study',
  },
  {
    slug: 'digital-transformation-guide',
    title: '5 Steps to a Successful Digital Transformation in 2024',
    excerpt:
      'A practical guide for Tunisian enterprises beginning their digital transformation journey, from our consulting team.',
    date: '2024-03-10',
    category: 'Insights',
  },
];

export type Faq = {
  question: string;
  answer: string;
  category?: string;
};

export const faqs: Faq[] = [
  {
    question: 'What is Nexus ERP?',
    answer:
      'Nexus ERP is our integrated enterprise resource planning software designed for Tunisian businesses, covering finance, inventory, production, and sales.',
    category: 'General',
  },
  {
    question: 'Can I customize the system for my industry?',
    answer:
      'Yes. We offer customizations and industry-specific modules so Nexus ERP fits your business process while keeping your core data integrated.',
    category: 'Customization',
  },
  {
    question: 'Do you provide local support?',
    answer:
      'Yes. We provide local Tunisian support and training, with dedicated teams for ERP deployment, maintenance, and user adoption.',
    category: 'Support',
  },
];
