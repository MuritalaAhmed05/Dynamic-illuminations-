import type { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';

export const metadata: Metadata = {
  title: 'Project Details | Dynamic Illuminations',
  description: 'Explore live installation details, video gallery, and technical specifications.',
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient projectId={params.id} />;
}
