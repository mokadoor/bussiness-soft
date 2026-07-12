import { supabaseAdmin } from '@/lib/supabase/admin';
import {
  products,
  services,
  industries,
  clients,
  testimonials,
  team,
  stats,
} from '@/lib/data';

async function seedProducts() {
  for (const p of products) {
    await supabaseAdmin.from('products').upsert(
      {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        category: p.category,
        icon: p.icon,
        summary: p.summary,
        description: p.description,
        features: p.features,
        benefits: p.benefits,
        modules: p.modules,
        faqs: p.faqs,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'slug' }
    );
  }
  console.log(`Seeded ${products.length} products`);
}

async function seedServices() {
  for (const s of services) {
    await supabaseAdmin.from('services').upsert(
      {
        slug: s.slug,
        title: s.title,
        icon: s.icon,
        summary: s.summary,
        description: s.description,
        features: s.features,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'slug' }
    );
  }
  console.log(`Seeded ${services.length} services`);
}

async function seedIndustries() {
  for (const ind of industries) {
    await supabaseAdmin.from('industries').upsert(
      {
        slug: ind.slug,
        name: ind.name,
        icon: ind.icon,
        description: ind.description,
        solutions: ind.solutions,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'slug' }
    );
  }
  console.log(`Seeded ${industries.length} industries`);
}

async function seedClients() {
  for (const c of clients) {
    await supabaseAdmin.from('clients').upsert(
      {
        name: c.name,
        industry: c.industry,
        products: c.products,
        description: c.description,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'name' }
    );
  }
  console.log(`Seeded ${clients.length} clients`);
}

async function seedTestimonials() {
  for (const t of testimonials) {
    await supabaseAdmin.from('testimonials').upsert(
      {
        name: t.name,
        role: t.role,
        company: t.company,
        quote: t.quote,
        rating: t.rating,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'name' }
    );
  }
  console.log(`Seeded ${testimonials.length} testimonials`);
}

async function seedTeam() {
  for (const m of team) {
    await supabaseAdmin.from('team_members').upsert(
      {
        name: m.name,
        role: m.role,
        bio: m.bio,
        initials: m.initials,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'name' }
    );
  }
  console.log(`Seeded ${team.length} team members`);
}

async function seedStats() {
  for (const s of stats) {
    await supabaseAdmin.from('statistics').upsert(
      {
        label: s.label,
        value: s.value,
        suffix: s.suffix,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'label' }
    );
  }
  console.log(`Seeded ${stats.length} statistics`);
}

async function main() {
  await seedProducts();
  await seedServices();
  await seedIndustries();
  await seedClients();
  await seedTestimonials();
  await seedTeam();
  await seedStats();
  console.log('Seed complete!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
