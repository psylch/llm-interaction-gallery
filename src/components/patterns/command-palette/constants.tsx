import { 
  User, 
  CreditCard, 
  Moon, 
  Search, 
  FileText, 
  LogOut, 
  Copy,
  Code
} from 'lucide-react';
import { CommandGroup } from './types';

// We define a generator function to allow passing actions from the parent component
export const getCommandGroups = (onAction: (actionName: string) => void): CommandGroup[] => [
  {
    id: 'suggestions',
    heading: 'Suggestions',
    items: [
      {
        id: 'search-projects',
        label: 'Search Projects',
        description: 'Find a repository or folder',
        icon: <Search className="w-4 h-4" />,
        shortcut: ['S'],
        keywords: ['find', 'repo', 'folder'],
        action: () => onAction('Search Projects triggered'),
      },
      {
        id: 'open-file',
        label: 'Open File...',
        description: 'Quickly navigate to a file',
        icon: <FileText className="w-4 h-4" />,
        shortcut: ['O'],
        keywords: ['file', 'open', 'read'],
        action: () => onAction('Open File dialog opened'),
      },
    ],
  },
  {
    id: 'settings',
    heading: 'Settings',
    items: [
      {
        id: 'toggle-theme',
        label: 'Toggle Theme',
        description: 'Switch between light and dark mode',
        icon: <Moon className="w-4 h-4" />,
        shortcut: ['Cmd', 'T'],
        keywords: ['dark', 'light', 'mode', 'color'],
        action: () => onAction('Theme toggled'),
      },
      {
        id: 'billing',
        label: 'Billing',
        description: 'Manage subscriptions and payments',
        icon: <CreditCard className="w-4 h-4" />,
        keywords: ['money', 'credit', 'card'],
        action: () => onAction('Navigating to Billing'),
      },
      {
        id: 'account',
        label: 'Account Settings',
        icon: <User className="w-4 h-4" />,
        keywords: ['profile', 'user', 'me'],
        action: () => onAction('Navigating to Account'),
      },
    ],
  },
  {
    id: 'developer',
    heading: 'Developer',
    items: [
      {
        id: 'copy-repo',
        label: 'Copy Repo URL',
        icon: <Copy className="w-4 h-4" />,
        shortcut: ['Cmd', 'C'],
        keywords: ['git', 'clone', 'url'],
        action: () => onAction('Repository URL copied to clipboard'),
      },
      {
        id: 'api-docs',
        label: 'API Documentation',
        icon: <Code className="w-4 h-4" />,
        keywords: ['docs', 'help', 'reference'],
        action: () => onAction('Opening API Docs'),
      },
    ],
  },
  {
    id: 'system',
    heading: 'System',
    items: [
      {
        id: 'logout',
        label: 'Log Out',
        icon: <LogOut className="w-4 h-4" />,
        keywords: ['sign out', 'exit'],
        action: () => onAction('Logging out...'),
      },
    ],
  },
];
