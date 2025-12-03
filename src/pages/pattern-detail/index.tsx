import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { getPatternById } from '@/lib/constants/patterns';
import { ChatBot } from '@/components/patterns/chatbot';
import { InlineCompletionDemo } from '@/components/patterns/inline-completion/InlineCompletionDemo';
import { InfiniteCanvasDemo } from '@/components/patterns/canvas/InfiniteCanvasDemo';
import { CopyButton } from '@/components/ui/copy-button';
import { useState } from 'react';

type TabType = 'demo' | 'overview' | 'implementation';

export default function PatternDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pattern = id ? getPatternById(id) : null;
  const [activeTab, setActiveTab] = useState<TabType>('demo');
  const [codeTab, setCodeTab] = useState<'code' | 'prompt'>('code');

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background grid-background">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center backdrop-blur-xl bg-white/5 rounded-xl p-12 border border-white/10">
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
        <div className="backdrop-blur-xl bg-white/5 rounded-xl p-8 border border-white/10 mb-6">
          <h1 className="text-4xl font-display font-bold gradient-text mb-3">
            {pattern.name}
          </h1>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            {pattern.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {pattern.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 text-sm font-mono text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="backdrop-blur-xl bg-white/5 rounded-t-xl border border-white/10 border-b-0">
          <div className="flex gap-1 p-2">
            <button
              onClick={() => setActiveTab('demo')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${activeTab === 'demo'
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }
              `}
            >
              <span className="text-xl">🎮</span>
              <span>Live Demo</span>
            </button>

            {pattern.overview && (
              <button
                onClick={() => setActiveTab('overview')}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${activeTab === 'overview'
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }
                `}
              >
                <span className="text-xl">📝</span>
                <span>Overview</span>
              </button>
            )}

            {(pattern.codeExample || pattern.llmsPrompt) && (
              <button
                onClick={() => setActiveTab('implementation')}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${activeTab === 'implementation'
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }
                `}
              >
                <span className="text-xl">💻</span>
                <span>Implementation</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="backdrop-blur-xl bg-white/5 rounded-b-xl border border-white/10 p-8 min-h-[600px]">

          {/* Live Demo Tab */}
          {activeTab === 'demo' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  Interactive Demo
                </h2>

                {/* Open in new tab for external/both demos */}
                {(pattern.demoType === 'external' || pattern.demoType === 'both') && pattern.externalDemoUrl && (
                  <a
                    href={pattern.externalDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/30 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <span>Open API Demo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Show note if external site may block iframe */}
              {pattern.externalDemoNote && (
                <div className="mb-4 p-4 rounded-lg backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>{pattern.externalDemoNote}</span>
                  </div>
                </div>
              )}

              {/* Render demo based on type */}
              {/* Internal demos */}
              {(pattern.demoType === 'internal' || pattern.demoType === 'both') && (
                <>
                  {pattern.id === 'chatbot' && (
                    <div className="backdrop-blur-md bg-black/20 rounded-lg border border-white/10">
                      <ChatBot />
                    </div>
                  )}
                  {pattern.id === 'inline-completion' && (
                    <div className="backdrop-blur-md bg-black/20 rounded-lg border border-white/10">
                      <InlineCompletionDemo />
                    </div>
                  )}
                  {pattern.id === 'infinite-canvas' && (
                    <div className="backdrop-blur-md bg-black/20 rounded-lg border border-white/10">
                      <InfiniteCanvasDemo />
                    </div>
                  )}
                </>
              )}

              {/* External iframe (only if type is 'external', not 'both') */}
              {pattern.demoType === 'external' && pattern.externalDemoUrl && (
                <iframe
                  src={pattern.externalDemoUrl}
                  className="w-full h-[600px] rounded-lg border border-white/20 backdrop-blur-md bg-white/5"
                  title={`${pattern.name} Demo`}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              )}

              {/* Placeholder for WIP patterns without demos */}
              {!pattern.demoType && pattern.status === 'wip' && (
                <div className="text-center py-20 backdrop-blur-md bg-white/5 rounded-lg border border-white/10">
                  <div className="text-6xl mb-4">🚧</div>
                  <p className="text-xl text-gray-300 mb-2">Coming Soon</p>
                  <p className="text-sm text-gray-400">This pattern is currently under development</p>
                </div>
              )}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && pattern.overview && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold mb-6">
                Pattern Overview
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Use Cases */}
                <div className="backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                    <span>🎯</span>
                    Use Cases
                  </h3>
                  <ul className="space-y-3">
                    {pattern.overview.useCases.map((useCase, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-primary mt-1 flex-shrink-0">→</span>
                        <span className="leading-relaxed">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Features */}
                <div className="backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                    <span>✦</span>
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {pattern.overview.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-primary mt-1 flex-shrink-0">✦</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros */}
                <div className="backdrop-blur-md bg-green-500/5 rounded-lg p-6 border border-green-500/20">
                  <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center gap-2">
                    <span>✓</span>
                    Advantages
                  </h3>
                  <ul className="space-y-3">
                    {pattern.overview.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                        <span className="leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="backdrop-blur-md bg-yellow-500/5 rounded-lg p-6 border border-yellow-500/20">
                  <h3 className="text-lg font-semibold mb-4 text-yellow-400 flex items-center gap-2">
                    <span>⚠</span>
                    Limitations
                  </h3>
                  <ul className="space-y-3">
                    {pattern.overview.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-yellow-400 mt-1 flex-shrink-0">⚠</span>
                        <span className="leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best Practices */}
              {pattern.overview.bestPractices && pattern.overview.bestPractices.length > 0 && (
                <div className="backdrop-blur-md bg-blue-500/5 rounded-lg p-6 border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
                    <span>💡</span>
                    Best Practices
                  </h3>
                  <ul className="space-y-3">
                    {pattern.overview.bestPractices.map((practice, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1 flex-shrink-0">💡</span>
                        <span className="leading-relaxed">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Implementation Tab */}
          {activeTab === 'implementation' && (pattern.codeExample || pattern.llmsPrompt) && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                Implementation Guide
              </h2>

              {/* Sub-tabs for Code and Prompt */}
              <div className="flex gap-2 mb-6">
                {pattern.codeExample && (
                  <button
                    onClick={() => setCodeTab('code')}
                    className={`
                      px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300
                      ${codeTab === 'code'
                        ? 'backdrop-blur-md bg-primary/20 text-primary border border-primary/30'
                        : 'text-gray-400 hover:text-gray-200 backdrop-blur-md bg-white/5 border border-white/10'
                      }
                    `}
                  >
                    Code Example
                  </button>
                )}
                {pattern.llmsPrompt && (
                  <button
                    onClick={() => setCodeTab('prompt')}
                    className={`
                      px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300
                      ${codeTab === 'prompt'
                        ? 'backdrop-blur-md bg-primary/20 text-primary border border-primary/30'
                        : 'text-gray-400 hover:text-gray-200 backdrop-blur-md bg-white/5 border border-white/10'
                      }
                    `}
                  >
                    LLM Prompt (llms.txt)
                  </button>
                )}
              </div>

              {/* Code Example */}
              {codeTab === 'code' && pattern.codeExample && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between backdrop-blur-md bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-300">
                      {pattern.codeExample.description}
                    </p>
                    <CopyButton
                      text={pattern.codeExample.code}
                      label="Copy Code"
                    />
                  </div>
                  <div className="backdrop-blur-md bg-black/40 rounded-lg border border-white/10 overflow-hidden">
                    <pre className="p-6 overflow-x-auto">
                      <code className="text-sm font-mono text-gray-200 leading-relaxed">
                        {pattern.codeExample.code}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* LLM Prompt */}
              {codeTab === 'prompt' && pattern.llmsPrompt && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between backdrop-blur-md bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-300">
                      Copy this prompt to guide LLMs when implementing this pattern
                    </p>
                    <CopyButton
                      text={pattern.llmsPrompt}
                      label="Copy Prompt"
                    />
                  </div>
                  <div className="backdrop-blur-md bg-black/40 rounded-lg border border-white/10 overflow-hidden">
                    <pre className="p-6 overflow-x-auto whitespace-pre-wrap">
                      <code className="text-sm font-mono text-gray-200 leading-relaxed">
                        {pattern.llmsPrompt}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
