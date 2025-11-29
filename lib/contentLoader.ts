import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true });

const contentDirectory = path.join(process.cwd(), 'content');

// Helper to read all files in a directory
function getFilesInDirectory(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));
}

// Helper to parse markdown file
function parseMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}

// Load Resume Data
export function getResumeData() {
  const resumePath = path.join(contentDirectory, 'resume', 'resume.md');
  
  if (!fs.existsSync(resumePath)) {
    return {
      description: 'Resume not found',
      pdfUrl: '/resume/resume.pdf',
    };
  }

  const { data } = parseMarkdownFile(resumePath);
  
  return {
    description: data.description || '',
    pdfUrl: data.pdfUrl || '/resume/resume.pdf',
  };
}

// Load Hobbies Data
export function getHobbiesData() {
  const hobbiesDir = path.join(contentDirectory, 'hobbies');
  const files = getFilesInDirectory(hobbiesDir);
  
  const hobbies = files.map((filename) => {
    const filePath = path.join(hobbiesDir, filename);
    const { data } = parseMarkdownFile(filePath);
    
    return {
      id: filename.replace('.md', ''),
      title: data.title || '',
      image: data.image || '/photos/placeholder.jpg',
      description: data.description || '',
      order: data.order || 0,
    };
  });
  
  return hobbies.sort((a, b) => a.order - b.order);
}

// Load Professional Data
export function getProfessionalData() {
  const professionalDir = path.join(contentDirectory, 'professional');
  const files = getFilesInDirectory(professionalDir);
  
  const professional = files.map((filename) => {
    const filePath = path.join(professionalDir, filename);
    const { data } = parseMarkdownFile(filePath);
    
    return {
      id: filename.replace('.md', ''),
      title: data.title || '',
      image: data.image || '/photos/placeholder.jpg',
      description: data.description || '',
      order: data.order || 0,
    };
  });
  
  return professional.sort((a, b) => a.order - b.order);
}

// Load Timeline Data
export function getTimelineData() {
  const timelineDir = path.join(contentDirectory, 'timeline');
  const files = getFilesInDirectory(timelineDir);
  
  const timeline = files.map((filename) => {
    const filePath = path.join(timelineDir, filename);
    const { data } = parseMarkdownFile(filePath);
    
    return {
      id: filename.replace('.md', ''),
      start_date: data.start_date || data.date || '',
      end_date: data.end_date || '',
      title: data.title || '',
      description: data.description || '',
      category: data.category || 'work',
      order: data.order || 0,
    };
  });
  
  // Sort by start_date descending (newest first)
  return timeline.sort((a, b) => {
    const dateA = new Date(a.start_date + '-01');
    const dateB = new Date(b.start_date + '-01');
    return dateB.getTime() - dateA.getTime();
  });
}

// Load Personal Story Data
export function getPersonalStoryData() {
  const storyDir = path.join(contentDirectory, 'personal', 'story');
  const files = getFilesInDirectory(storyDir);
  
  const stories = files.map((filename) => {
    const filePath = path.join(storyDir, filename);
    const { data } = parseMarkdownFile(filePath);
    
    return {
      id: filename.replace('.md', ''),
      content: md.render(data.content || ''),
      image: data.image,
      imagePosition: data.imagePosition || 'left',
      order: data.order || 0,
    };
  });
  
  return stories.sort((a, b) => a.order - b.order);
}

// Load Fun Facts Data
export function getFunFactsData() {
  const funFactsDir = path.join(contentDirectory, 'personal', 'funfacts');
  const files = getFilesInDirectory(funFactsDir);
  
  const funFacts = files.map((filename) => {
    const filePath = path.join(funFactsDir, filename);
    const { data } = parseMarkdownFile(filePath);
    
    return {
      id: filename.replace('.md', ''),
      emoji: data.emoji || '✨',
      text: data.text || '',
      color: data.color,
    };
  });
  
  return funFacts;
}

// Load Site Settings
export function getSiteSettings() {
  const settingsPath = path.join(contentDirectory, 'settings.json');
  
  if (!fs.existsSync(settingsPath)) {
    return {
      siteTitle: 'My Portfolio',
      siteDescription: 'Welcome to my portfolio',
      authorName: 'Your Name',
    };
  }
  
  const settingsContent = fs.readFileSync(settingsPath, 'utf8');
  return JSON.parse(settingsContent);
}
