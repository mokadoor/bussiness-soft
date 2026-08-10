'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, DollarSign, Package, BarChart3 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation';

export function HomeHero() {
  const dictionary = useTranslation();
  const home = dictionary.home.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background">
      <div className="absolute inset-0 bg-grid opacity-[0.35] mask-fade-b" aria-hidden="true" />
      <div
        className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 top-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24 xl:py-28">
          {/* Left: copy */}
          <div className="flex flex-col items-start gap-6">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {home.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {home.title}{' '}
              <span className="gradient-text">Nexus ERP</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
            >
              {home.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg" className="h-12 bg-primary px-7 text-base hover:bg-primary/90">
                <Link href="/contact">
                  {home.requestDemo}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-border bg-background/60 px-7 text-base backdrop-blur hover:bg-secondary"
              >
                <Link href="/products">
                  <Play className="mr-2 h-4 w-4" />
                  {home.exploreProducts}
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {home.stats.expertise}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {home.stats.clients}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {home.stats.compliance}
              </span>
            </motion.div>
          </div>

          {/* Right: dashboard illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <DashboardIllustration />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function DashboardIllustration() {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

      {/* main dashboard card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl border border-border/80 bg-background/95 p-5 shadow-2xl backdrop-blur"
      >
        {/* window chrome */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Nexus ERP · Dashboard</span>
          <div className="h-4 w-12" />
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Revenue', value: '€1.2M', change: '+12%', icon: DollarSign, color: 'text-emerald-500' },
            { label: 'Orders', value: '847', change: '+8%', icon: Package, color: 'text-primary' },
            { label: 'Active', value: '1,204', change: '+5%', icon: Users, color: 'text-accent' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-border bg-secondary/40 p-3">
              <div className="flex items-center justify-between">
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                <span className="text-[10px] font-semibold text-emerald-500">{kpi.change}</span>
              </div>
              <p className="mt-2 text-lg font-bold tracking-tight">{kpi.value}</p>
              <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* chart */}
        <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold">Monthly Performance</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-500">
              <TrendingUp className="h-3 w-3" /> Trending up
            </span>
          </div>
          <div className="flex h-28 items-end gap-2">
            {[40, 55, 42, 68, 52, 78, 64, 88, 72, 95, 82, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-accent"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* floating mini cards */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -left-8 top-24 rounded-xl border border-border bg-background/95 p-3 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <BarChart3 className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-bold">+18% Efficiency</p>
            <p className="text-[10px] text-muted-foreground">vs last quarter</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-6 bottom-16 rounded-xl border border-border bg-background/95 p-3 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Package className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-xs font-bold">Stock Synced</p>
            <p className="text-[10px] text-muted-foreground">12 warehouses</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
