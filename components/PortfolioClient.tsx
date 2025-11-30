'use client';

import Desktop from './Desktop';
import Window from './Window';
import ResumeWindow from './windows/ResumeWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import HobbiesWindow from './windows/HobbiesWindow';
import ProfessionalWindow from './windows/ProfessionalWindow';
import TimelineWindow from './windows/TimelineWindow';
import PersonalWindow from './windows/PersonalWindow';

interface ResumeSettings {
  googleDocsEmbedUrl: string;
  pdfDownloadUrl: string;
  description?: string;
}

interface ProjectsSettings {
  googleSlidesEmbedUrl: string;
  description?: string;
}

interface PortfolioClientProps {
  resumeSettings: ResumeSettings;
  projectsSettings: ProjectsSettings;
  hobbiesData: any[];
  professionalData: any[];
  timelineData: any[];
  storyData: any[];
}

export default function PortfolioClient({
  resumeSettings,
  projectsSettings,
  hobbiesData,
  professionalData,
  timelineData,
  storyData,
}: PortfolioClientProps) {
  return (
    <Desktop>
      {({ openApp, onClose }) => (
        <>
          <Window
            title="Resume"
            isOpen={openApp === 'resume'}
            onClose={onClose}
            width="1100px"
            height="750px"
          >
            <ResumeWindow settings={resumeSettings} />
          </Window>

          <Window
            title="Projects"
            isOpen={openApp === 'projects'}
            onClose={onClose}
            width="1000px"
            height="700px"
          >
            <ProjectsWindow settings={projectsSettings} />
          </Window>

          <Window
            title="Hobbies"
            isOpen={openApp === 'hobbies'}
            onClose={onClose}
            width="1000px"
            height="650px"
          >
            <HobbiesWindow data={hobbiesData} />
          </Window>

          <Window
            title="Professional Life"
            isOpen={openApp === 'professional'}
            onClose={onClose}
            width="1000px"
            height="650px"
          >
            <ProfessionalWindow data={professionalData} />
          </Window>

          <Window
            title="Timeline"
            isOpen={openApp === 'timeline'}
            onClose={onClose}
            width="950px"
            height="650px"
          >
            <TimelineWindow data={timelineData} />
          </Window>

          <Window
            title="About Me"
            isOpen={openApp === 'personal'}
            onClose={onClose}
            width="1000px"
            height="650px"
          >
            <PersonalWindow storyData={storyData} />
          </Window>
        </>
      )}
    </Desktop>
  );
}
