'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageGalleryProps {
  items: Array<{
    id: string;
    image: string;
    title: string;
    description: string;
  }>;
}

export default function ImageGallery({ items }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div className="p-6 text-center text-gray-500">No items to display</div>;
  }

  const selectedItem = items[selectedIndex];

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      {/* Left: Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={selectedItem.image}
            alt={selectedItem.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-video rounded-lg overflow-hidden transition-all ${
                index === selectedIndex
                  ? 'ring-2 ring-blue-500 scale-105'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Right: Description */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {selectedItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
