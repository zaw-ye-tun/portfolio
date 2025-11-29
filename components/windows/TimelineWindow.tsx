'use client';

import Timeline from '../Timeline';

interface TimelineItem {
  id: string;
  start_date: string;
  end_date?: string;
  title: string;
  description: string;
  category: 'education' | 'work';
}

interface TimelineWindowProps {
  data: TimelineItem[];
}

export default function TimelineWindow({ data }: TimelineWindowProps) {
  return <Timeline items={data} />;
}
