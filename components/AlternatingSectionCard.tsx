'use client';

import { useEffect, useRef, useState } from 'react';

interface AlternatingSectionCardProps {
  title: string;
  description: string;
  mainImage?: string;
  additionalImages?: string[];
  index: number;
}

export default function AlternatingSectionCard({
  title,
  description,
  mainImage,
  additionalImages = [],
  index,
}: AlternatingSectionCardProps) {
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

  // Determine image position based on index (even = left, odd = right)
  const imageOnLeft = index % 2 === 0;
  const hasImage = !!mainImage;

  // Get the display image (main image or first additional image)
  const displayImage = mainImage || (additionalImages.length > 0 ? additionalImages[0] : null);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="glass-effect rounded-2xl p-6 md:p-8">
        {displayImage ? (
          <div className={`flex flex-col ${imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}>
            {/* Image Section */}
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
              <img
                src={displayImage}
                alt={title}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>

              {/* Additional Images Thumbnails (if any) */}
              {additionalImages && additionalImages.length > 0 && (
                <div className="pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">More photos:</p>
                  <div className="flex flex-wrap gap-2">
                    {additionalImages.slice(0, 4).map((img, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`${title} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {additionalImages.length > 4 && (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          +{additionalImages.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* No Image - Text Only */
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
