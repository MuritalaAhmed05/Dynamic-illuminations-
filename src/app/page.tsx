import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Home | Dynamic Illuminations',
  description: 'Welcome to Dynamic Illuminations. Explore our expert lighting services, solar solutions, and projects in Nigeria.',
};

export default function HomePage() {
  return <HomeClient />;
}
