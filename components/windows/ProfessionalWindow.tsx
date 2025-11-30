'use client';

import AlternatingSectionCard from '../AlternatingSectionCard';

interface ProfessionalItem {
  id: string;
  image: string;
  title: string;
  description: string;
  additionalImages?: string[];
  order?: number;
}

interface ProfessionalWindowProps {
  data: ProfessionalItem[];
}

export default function ProfessionalWindow({ data }: ProfessionalWindowProps) {
  // Sort by order if available
  const sortedData = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No professional experiences to display
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-h-full overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        💼 Professional Life
      </h2>
      
      {sortedData.map((item, index) => (
        <AlternatingSectionCard
          key={item.id}
          title={item.title}
          description={item.description}
          mainImage={item.image}
          additionalImages={item.additionalImages}
          index={index}
        />
      ))}
    </div>
  );
}
