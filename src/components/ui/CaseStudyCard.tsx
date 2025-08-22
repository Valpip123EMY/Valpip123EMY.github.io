'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  impact: {
    metric: string;
    label: string;
    improvement: string;
  };
  thumbnail: string;
  category: string;
  tech: string[];
  featured?: boolean;
}

interface CaseStudyCardProps {
  study: CaseStudy;
  className?: string;
}

export function CaseStudyCard({ study, className }: CaseStudyCardProps) {
  return (
    <motion.div
      className={cn('group', className)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link href={`/case-studies/${study.id}`}>
        <div className="glass-card overflow-hidden h-full card-hover">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-indigo-900 font-bold text-xl">
                    {study.category.split(' ')[0][0]}
                  </span>
                </div>
                <p className="text-slate-300 text-sm font-medium">{study.category}</p>
              </div>
            </div>
            
            {/* Glare effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/[0.15] to-transparent skew-x-12 animate-glare" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-teal-300 transition-colors duration-200">
              {study.title}
            </h3>
            
            <p className="text-slate-300 text-sm mb-4 line-clamp-3">
              {study.summary}
            </p>

            {/* Impact Metrics */}
            <div className="mb-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gradient">
                  {study.impact.metric}
                </span>
                <span className="text-green-400 text-sm font-medium">
                  {study.impact.improvement}
                </span>
              </div>
              <p className="text-slate-400 text-xs">{study.impact.label}</p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {study.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
                >
                  {tech}
                </span>
              ))}
              {study.tech.length > 3 && (
                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md border border-slate-600/50">
                  +{study.tech.length - 3}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between">
              <span className="text-teal-400 text-sm font-medium group-hover:text-teal-300 transition-colors duration-200">
                Read Case Study
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
