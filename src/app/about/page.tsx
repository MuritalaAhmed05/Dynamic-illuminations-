import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Dynamic Illuminations',
  description: 'Learn more about Dynamic Illuminations, a company providing expert lighting and solar solutions across Nigeria.',
};

export default function AboutPage() {
  return <AboutClient />;
}
