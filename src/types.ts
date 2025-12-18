
export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum SectionId {
  HERO = 'hero',
  FAQ = 'faq',
  ABOUT = 'about'
}
