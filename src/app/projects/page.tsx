import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Our Projects | Dynamic Illuminations',
  description: 'Check out some of our amazing lighting and solar projects that have transformed spaces across Nigeria.',
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
