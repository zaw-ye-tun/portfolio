'use client';

import { Download } from 'lucide-react';

interface ResumeSettings {
  googleDocsEmbedUrl: string;
  pdfDownloadUrl: string;
  description?: string;
}

interface ResumeWindowProps {
  settings: ResumeSettings;
}

export default function ResumeWindow({ settings }: ResumeWindowProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Top Bar with Download Button */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
        {settings.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{settings.description}</p>
        )}
        <a
          href={settings.pdfDownloadUrl}
          download="Resume.pdf"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg shadow-md transition-all ml-auto"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </a>
      </div>

      {/* Google Docs Iframe */}
      <div className="flex-1 relative">
        <iframe
          src={settings.googleDocsEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          title="Resume - Google Docs"
        />
      </div>
    </div>
  );
}
