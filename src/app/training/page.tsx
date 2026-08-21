import type { Metadata } from 'next';
import TrainingClient from './TrainingClient';

export const metadata: Metadata = {
  title: 'Lighting Training | Dynamic Illuminations',
  description: 'Join our professional training sessions to learn about advanced lighting design, smart automation, and event lighting.',
};

export default function TrainingPage() {
  return <TrainingClient />;
}
