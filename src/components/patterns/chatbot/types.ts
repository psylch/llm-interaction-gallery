import { Message } from '@/types/message';

export interface ChatBotProps {
  initialMessages?: Message[];
  streaming?: boolean;
  className?: string;
}

export interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}

export interface MessageItemProps {
  message: Message;
  className?: string;
}

export interface InputAreaProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}
