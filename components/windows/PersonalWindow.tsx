'use client';

import { useState } from 'react';
import StorySection from '../StorySection';
import FunFactBubble from '../FunFactBubble';

interface StoryItem {
  id: string;
  image?: string;
  content: string;
  imagePosition?: 'left' | 'right';
}

interface FunFact {
  id: string;
  emoji: string;
  text: string;
  color?: string;
}

interface PersonalWindowProps {
  storyData: StoryItem[];
  funFactsData: FunFact[];
}

export default function PersonalWindow({ storyData, funFactsData }: PersonalWindowProps) {
  const [activeTab, setActiveTab] = useState<'story' | 'facts'>('story');

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
        <button
          onClick={() => setActiveTab('story')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'story'
              ? 'text-blue-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Story
          {activeTab === 'story' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transition-all" />
          )}
        </button>
        
        <button
          onClick={() => setActiveTab('facts')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'facts'
              ? 'text-blue-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Fun Facts
          {activeTab === 'facts' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transition-all" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'story' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {storyData.map((section) => (
              <StorySection key={section.id} section={section} />
            ))}
          </div>
        )}

        {activeTab === 'facts' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {funFactsData.map((fact) => (
                <FunFactBubble key={fact.id} fact={fact} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
