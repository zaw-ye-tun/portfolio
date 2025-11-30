'use client';

interface ProjectsSettings {
  googleSlidesEmbedUrl: string;
  description?: string;
}

interface ProjectsWindowProps {
  settings: ProjectsSettings;
}

export default function ProjectsWindow({ settings }: ProjectsWindowProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Description (if provided) */}
      {settings.description && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">{settings.description}</p>
        </div>
      )}

      {/* Iframe Container */}
      <div className="flex-1 relative">
        <iframe
          src={settings.googleSlidesEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          title="Projects Portfolio - Google Slides"
        />
      </div>
    </div>
  );
}
