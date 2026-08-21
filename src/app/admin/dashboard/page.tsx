import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Admin Projects Dashboard | Dynamic Illuminations',
  description: 'Manage projects, AI content generation, images, and videos.',
};

export default function AdminDashboardPage() {
  return <DashboardClient />;
}
