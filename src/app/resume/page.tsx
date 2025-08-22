import { Metadata } from 'next';
import { ResumePage } from '@/components/pages/ResumePage';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'View Valmik Nahata\'s resume - Data Science student at UC San Diego with experience in machine learning research and data automation.',
  openGraph: {
    title: 'Resume | Valmik Nahata',
    description: 'View Valmik Nahata\'s resume - Data Science student at UC San Diego',
  },
};

export default function ResumePageWrapper() {
  return <ResumePage />;
}