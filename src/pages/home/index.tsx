import { Header } from '@/components/layout/header';
import { PatternCard } from '@/components/common/pattern-card';
import { PATTERNS } from '@/lib/constants/patterns';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background grid-background">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <h2 className="text-6xl font-display font-bold mb-4 gradient-text">
              Explore LLM Interactions
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated collection of interaction patterns for Large Language Models.
            Learn, experiment, and build better AI experiences.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-6">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">
                {PATTERNS.length}
              </div>
              <div className="text-sm text-muted-foreground">Patterns</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-accent">
                {PATTERNS.filter(p => p.status === 'available').length}
              </div>
              <div className="text-sm text-muted-foreground">Ready</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-secondary">
                {new Set(PATTERNS.map(p => p.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </section>

        {/* Patterns Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold">
              Interaction Patterns
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                Available
              </span>
              <span className="mx-2 text-border">|</span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                Work in Progress
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATTERNS.map((pattern, index) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            Built by{' '}
            <span className="text-primary font-medium">Chihao (Charles) Li</span>
          </p>
          <p className="mt-2">
            Open source • MIT License
          </p>
        </footer>
      </main>
    </div>
  );
}
