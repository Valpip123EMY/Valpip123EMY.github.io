'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';

const featuredProjects = [
  {
    id: 'rag-pathology-system',
    title: 'Memory-Efficient RAG System for Pathology Reports',
    summary: 'Developed memory-efficient RAG system using SLMs for pathology report interpretation, reducing memory usage by 93%+ compared to traditional LLMs',
    impact: {
      metric: '93%',
      label: 'Memory reduction',
      improvement: 'vs traditional LLMs',
    },
    thumbnail: '/images/projects/rag-system.jpg',
    category: 'Machine Learning',
    tech: ['Python', 'HuggingFace', 'FAISS', 'SLMs'],
    featured: true,
  },
  {
    id: 'transformative-ai-economics',
    title: 'The Early Economic Impacts of Transformative AI',
    summary: 'Co-developed novel temporal coherence framework for AI automation using GPT-4.1-mini to estimate effective time across 450+ O*NET tasks',
    impact: {
      metric: '1st Place',
      label: 'Apart Research Sprint',
      improvement: 'Economics of AI',
    },
    thumbnail: '/images/projects/ai-economics.jpg',
    category: 'Research',
    tech: ['Python', 'GPT-4.1-mini', 'Statistical Modeling', 'O*NET'],
    featured: true,
  },
  {
    id: 'milwaukee-bucks-analytics',
    title: 'Milwaukee Bucks Fan Engagement Prediction System',
    summary: 'Directed 5-person team developing dual Random Forest models achieving 81%+ classification accuracy across propensity and churn analyses',
    impact: {
      metric: '3rd Place',
      label: 'Business Analytics Hackathon',
      improvement: '81% accuracy',
    },
    thumbnail: '/images/projects/bucks-analytics.jpg',
    category: 'Data Science',
    tech: ['Python', 'scikit-learn', 'Matplotlib', 'Seaborn'],
    featured: true,
  },
];

export function FeaturedCaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Research projects and achievements with measurable impact
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CaseStudyCard study={project} />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
                          <Link
                  href="/case-studies"
                  className="btn-secondary inline-flex items-center group"
                >
                  View All Projects
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
        </motion.div>
      </div>
    </section>
  );
}
