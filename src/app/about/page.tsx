import { Metadata } from 'next';
import { AboutPage } from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'UC San Diego Data Science student passionate about machine learning, research, and building impactful solutions.',
  openGraph: {
    title: 'About Valmik Nahata | Data Science Student',
    description: 'Learn about my education, skills, and experience in data science and machine learning',
  },
};

export default function AboutPageWrapper() {
  return <AboutPage />;
}