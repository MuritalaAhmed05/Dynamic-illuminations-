import type { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ | Dynamic Illuminations',
  description: 'Find answers to frequently asked questions about our lighting, solar, and automation services.',
};

export default function FaqPage() {
  return <FaqClient />;
}
