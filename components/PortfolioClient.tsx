'use client';

import Desktop from './Desktop';
import Window from './Window';
import ResumeWindow from './windows/ResumeWindow';
import HobbiesWindow from './windows/HobbiesWindow';
import ProfessionalWindow from './windows/ProfessionalWindow';
import TimelineWindow from './windows/TimelineWindow';
import PersonalWindow from './windows/PersonalWindow';

interface PortfolioClientProps {
  resumeData: any;
  hobbiesData: any[];
  professionalData: any[];
  timelineData: any[];
  storyData: any[];
  funFactsData: any[];
}

export default function PortfolioClient({
  resumeData,
  hobbiesData,
  professionalData,
  timelineData,
  storyData,
  funFactsData,
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
            <ResumeWindow data={resumeData} />
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
            <PersonalWindow storyData={storyData} funFactsData={funFactsData} />
          </Window>
        </>
      )}
    </Desktop>
  );
}
