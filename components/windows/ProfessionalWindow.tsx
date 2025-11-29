'use client';

import ImageGallery from '../ImageGallery';

interface ProfessionalItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface ProfessionalWindowProps {
  data: ProfessionalItem[];
}

export default function ProfessionalWindow({ data }: ProfessionalWindowProps) {
  return <ImageGallery items={data} />;
}
