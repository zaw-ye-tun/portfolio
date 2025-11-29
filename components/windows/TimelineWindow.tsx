'use client';

import GanttTimeline from '../GanttTimeline';

interface TimelineItem {
  id: string;
  start_date: string;
  end_date?: string;
  title: string;
  description: string;
  company_or_school?: string;
  category: 'education' | 'work';
  color?: string;
}

interface TimelineWindowProps {
  data: TimelineItem[];
}

export default function TimelineWindow({ data }: TimelineWindowProps) {
  return <GanttTimeline items={data} />;
}
