import { PatternConfig } from '@/types/pattern';
import { cn } from '@/lib/utils/cn';
import { Link } from 'react-router-dom';

interface PatternCardProps {
  pattern: PatternConfig;
  index?: number;
}

const categoryColors = {
  chat: 'from-cyan-500 to-blue-500',
  completion: 'from-purple-500 to-pink-500',
  generation: 'from-orange-500 to-red-500',
  canvas: 'from-green-500 to-emerald-500',
  command: 'from-yellow-500 to-amber-500',
  editing: 'from-indigo-500 to-violet-500',
};

const complexityIcons = {
  simple: '○',
  medium: '◐',
  complex: '●',
};

export function PatternCard({ pattern, index = 0 }: PatternCardProps) {
  const isWIP = pattern.status !== 'available';

  return (
    <Link
      to={isWIP ? '#' : `/pattern/${pattern.id}`}
      className={cn(
        'group relative block',
        'fade-in',
        isWIP && 'pointer-events-none'
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={cn(
          'relative h-full',
          'glass rounded-xl p-6',
          'border transition-all duration-300',
          'pattern-card noise-overlay',
          !isWIP && 'glow-hover cursor-pointer',
          isWIP ? 'opacity-50' : 'hover:border-primary/50'
        )}
      >
        {/* Gradient accent bar */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-1 rounded-t-xl',
            'bg-gradient-to-r',
            categoryColors[pattern.category]
          )}
        />

        {/* Status badge */}
        {isWIP && (
          <div className="absolute top-4 right-4">
            <span className="wip-badge">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              WIP
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative space-y-4 pt-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={cn(
                'text-xl font-display font-bold mb-2',
                !isWIP && 'group-hover:gradient-text',
                'transition-all duration-300'
              )}>
                {pattern.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {pattern.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {pattern.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-muted/30 text-xs font-mono text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="font-mono">{complexityIcons[pattern.complexity]}</span>
                <span className="capitalize">{pattern.complexity}</span>
              </span>
              <span className="text-border">•</span>
              <span className="capitalize">{pattern.category}</span>
            </div>

            {!isWIP && (
              <div className="flex items-center gap-1 text-primary text-sm font-medium">
                <span>Explore</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Shimmer effect on hover */}
        {!isWIP && <div className="shimmer opacity-0 group-hover:opacity-100 transition-opacity" />}
      </div>
    </Link>
  );
}
