import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Admin Login | Dynamic Illuminations',
  description: 'Admin Portal Login for Dynamic Illuminations management.',
};

export default function AdminLoginPage() {
  return <LoginClient />;
}
