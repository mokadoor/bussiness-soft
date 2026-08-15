import fs from 'fs';
import { chromium } from 'playwright';

// Configure base URL and routes to test
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const ROUTES = ['/', '/about', '/products', '/services', '/industries', '/references', '/contact'];
const LOCALES = ['en', 'fr', 'ar'];
const OUTPUT = 'locale-switch-results.json';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const target = locale === 'en' ? `${BASE}${route}` : `${BASE}/${locale}${route === '/' ? '' : route}`;
      const start = Date.now();
      try {
        const response = await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 });
        const end = Date.now();
        const status = response ? response.status() : null;

        // Collect navigation timing from the page where available
        const navTiming = await page.evaluate(() => {
          const nav = performance.getEntriesByType('navigation')[0] || null;
          if (!nav) return null;
          return {
            domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
            loadEvent: Math.round(nav.loadEventEnd - nav.startTime),
            duration: Math.round(nav.duration),
          };
        });

        // Sum of transferred bytes for main page requests
        const requests = await page.context().routes ? [] : [];

        results.push({
          route,
          locale,
          target,
          status,
          gotoMs: end - start,
          navTiming,
          timestamp: new Date().toISOString(),
        });

        console.log(`OK ${locale} ${route} -> ${end - start}ms status=${status}`);
      } catch (e) {
        const end = Date.now();
        console.log(`ERR ${locale} ${route} -> ${end - start}ms`, e.message);
        results.push({ route, locale, target, error: e.message, gotoMs: end - start, timestamp: new Date().toISOString() });
      }
    }
  }

  await browser.close();

  fs.writeFileSync(OUTPUT, JSON.stringify({ base: BASE, results }, null, 2));
  console.log(`Results saved to ${OUTPUT}`);
})();
