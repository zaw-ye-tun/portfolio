'use client';

import ImageGallery from '../ImageGallery';

interface HobbyItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface HobbiesWindowProps {
  data: HobbyItem[];
}

export default function HobbiesWindow({ data }: HobbiesWindowProps) {
  return <ImageGallery items={data} />;
}
