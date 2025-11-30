import PortfolioClient from '@/components/PortfolioClient';
import {
  getResumeSettings,
  getProjectsSettings,
  getHobbiesData,
  getProfessionalData,
  getTimelineData,
  getPersonalStoryData,
} from '@/lib/contentLoader';

export default function Home() {
  // Load all data server-side
  const resumeSettings = getResumeSettings();
  const projectsSettings = getProjectsSettings();
  const hobbiesData = getHobbiesData();
  const professionalData = getProfessionalData();
  const timelineData = getTimelineData();
  const storyData = getPersonalStoryData();

  return (
    <PortfolioClient
      resumeSettings={resumeSettings}
      projectsSettings={projectsSettings}
      hobbiesData={hobbiesData}
      professionalData={professionalData}
      timelineData={timelineData}
      storyData={storyData}
    />
  );
}
