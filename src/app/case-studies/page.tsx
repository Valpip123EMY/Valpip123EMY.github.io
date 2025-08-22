import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Projects | ML Research & Data Science',
  description: 'Explore my academic projects in machine learning, data science, and research including published papers and competition wins.',
  openGraph: {
    title: 'Academic Projects - Valmik Nahata',
    description: 'Academic projects in ML research, data science, and publications',
  },
};

import { ProjectsPage } from '@/components/pages/ProjectsPage';

export default function ProjectsIndexPage() {
  return <ProjectsPage />;
}
