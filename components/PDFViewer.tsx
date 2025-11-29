'use client';

import { Download } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  description?: string;
}

export default function PDFViewer({ pdfUrl, description }: PDFViewerProps) {
  return (
    <div className="flex flex-col h-full p-6 space-y-4">
      {description && (
        <div className="prose dark:prose-invert max-w-none">
          <p>{description}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <a
          href={pdfUrl}
          download
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </a>
      </div>
      
      <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 min-h-0">
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title="Resume PDF"
        />
      </div>
    </div>
  );
}
