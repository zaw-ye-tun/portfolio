'use client';

import PDFViewer from '../PDFViewer';

interface ResumeData {
  description: string;
  pdfUrl: string;
}

interface ResumeWindowProps {
  data: ResumeData;
}

export default function ResumeWindow({ data }: ResumeWindowProps) {
  return (
    <PDFViewer
      pdfUrl={data.pdfUrl}
      description={data.description}
    />
  );
}
