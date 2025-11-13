import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { getPatternById } from '@/lib/constants/patterns';
import { ChatBot } from '@/components/patterns/chatbot';

export default function PatternDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pattern = id ? getPatternById(id) : null;

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background grid-background">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold mb-4">
              Pattern not found
            </h1>
            <Link
              to="/"
              className="text-primary hover:underline"
            >
              Back to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grid-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Gallery
        </Link>

        {/* Pattern Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">
            {pattern.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {pattern.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {pattern.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-muted/30 text-sm font-mono text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div className="glass rounded-xl p-8 border noise-overlay">
          <h2 className="text-2xl font-display font-bold mb-6">
            Live Demo
          </h2>

          {/* Render the specific pattern component */}
          {pattern.id === 'chatbot' && (
            <ChatBot />
          )}

          {/* Placeholder for other patterns */}
          {pattern.id !== 'chatbot' && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg mb-2">Coming Soon</p>
              <p className="text-sm">This pattern is currently under development</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
