'use client';

import { useEffect, useRef, useState } from 'react';

interface StorySection {
  id: string;
  image?: string;
  content: string;
  imagePosition?: 'left' | 'right';
}

interface StorySectionProps {
  section: StorySection;
}

export default function StorySection({ section }: StorySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const hasImage = !!section.image;
  const imageOnLeft = section.imagePosition === 'left';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="glass-effect rounded-2xl p-6 md:p-8">
        {hasImage ? (
          <div className={`grid md:grid-cols-2 gap-6 items-center ${imageOnLeft ? '' : 'md:flex-row-reverse'}`}>
            {imageOnLeft && (
              <div className="rounded-xl overflow-hidden">
                <img
                  src={section.image}
                  alt="Story"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}
            
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
            
            {!imageOnLeft && (
              <div className="rounded-xl overflow-hidden">
                <img
                  src={section.image}
                  alt="Story"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        )}
      </div>
    </div>
  );
}
