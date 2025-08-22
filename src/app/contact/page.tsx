import { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact | Get in Touch',
  description: 'Get in touch with Valmik Nahata - UC San Diego Data Science student and ML researcher.',
  openGraph: {
    title: 'Contact - Valmik Nahata',
    description: 'Connect with me about research opportunities, collaborations, or questions',
  },
};

export default function ContactIndexPage() {
  return <ContactPage />;
}
