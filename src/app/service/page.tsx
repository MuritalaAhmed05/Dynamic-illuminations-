import type { Metadata } from 'next';
import ServiceClient from './ServiceClient';

export const metadata: Metadata = {
  title: 'Our Services | Dynamic Illuminations',
  description: 'Explore our range of architectural, commercial, solar, CCTV, and smart home lighting services.',
};

export default function ServicePage() {
  return <ServiceClient />;
}
