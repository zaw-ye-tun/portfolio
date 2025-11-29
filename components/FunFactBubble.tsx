'use client';

interface FunFact {
  id: string;
  emoji: string;
  text: string;
  color?: string;
}

interface FunFactBubbleProps {
  fact: FunFact;
}

const defaultColors = [
  'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
];

export default function FunFactBubble({ fact }: FunFactBubbleProps) {
  const colorClass = fact.color || defaultColors[Math.floor(Math.random() * defaultColors.length)];

  return (
    <div className={`fun-fact-bubble ${colorClass}`}>
      <span className="text-xl">{fact.emoji}</span>
      <span className="font-medium">{fact.text}</span>
    </div>
  );
}
