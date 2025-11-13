import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="relative border-b border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-30 blur transition-opacity" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">
                LLM Interaction Patterns
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                A curated gallery of AI interaction patterns
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="#docs"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
