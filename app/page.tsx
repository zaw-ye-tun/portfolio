import PortfolioClient from '@/components/PortfolioClient';
import {
  getResumeData,
  getHobbiesData,
  getProfessionalData,
  getTimelineData,
  getPersonalStoryData,
  getFunFactsData,
} from '@/lib/contentLoader';

export default function Home() {
  // Load all data server-side
  const resumeData = getResumeData();
  const hobbiesData = getHobbiesData();
  const professionalData = getProfessionalData();
  const timelineData = getTimelineData();
  const storyData = getPersonalStoryData();
  const funFactsData = getFunFactsData();

  return (
    <PortfolioClient
      resumeData={resumeData}
      hobbiesData={hobbiesData}
      professionalData={professionalData}
      timelineData={timelineData}
      storyData={storyData}
      funFactsData={funFactsData}
    />
  );
}
