import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { KPISection } from '@/components/sections/KPISection';
import { FeaturedCaseStudies } from '@/components/sections/FeaturedCaseStudies';
import { TrustLogos } from '@/components/sections/TrustLogos';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Valmik Nahata | Data Science Student & ML Researcher',
  description: 'UC San Diego Data Science student passionate about machine learning, research, and building impactful solutions.',
  openGraph: {
    title: 'Valmik Nahata | Data Science Student & ML Researcher',
    description: 'UC San Diego Data Science student passionate about machine learning and research',
  },
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      
      
      
      
      

    </div>
  );
}
