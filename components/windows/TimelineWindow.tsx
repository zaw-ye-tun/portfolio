'use client';

import Timeline from '../Timeline';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'education' | 'work' | 'achievement' | 'personal';
}

interface TimelineWindowProps {
  data: TimelineItem[];
}

export default function TimelineWindow({ data }: TimelineWindowProps) {
  return <Timeline items={data} />;
}
