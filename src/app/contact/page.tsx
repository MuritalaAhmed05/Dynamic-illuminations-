import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Dynamic Illuminations',
  description: 'Get in touch with Dynamic Illuminations for all your lighting, solar, and electrical inquiries in Lagos, Nigeria.',
};

export default function ContactPage() {
  return <ContactClient />;
}
