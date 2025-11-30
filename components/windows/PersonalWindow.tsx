'use client';

import StorySection from '../StorySection';

interface StoryItem {
  id: string;
  image?: string;
  content: string;
  imagePosition?: 'left' | 'right';
}

interface PersonalWindowProps {
  storyData: StoryItem[];
}

export default function PersonalWindow({ storyData }: PersonalWindowProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
        <div className="px-6 py-3 font-medium text-blue-500 relative">
          Story
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {storyData.map((section) => (
            <StorySection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
