'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { formatNumber } from '@/lib/utils';

const kpis = [
  {
    value: 4,
    suffix: '+',
    label: 'Research Projects',

  },
  {
    value: 6,
    suffix: '+',
    label: 'Competition Wins',

  },
  {
    value: 5,
    suffix: '+',
    label: 'AI Research Areas',

  },
  {
    value: 2,
    suffix: '+',
    label: 'Years Experience',

  },
];

export function KPISection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-16 bg-indigo-800/30 border-y border-slate-700/50">
      <div className="container-responsive">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {kpis.map((kpi, index) => (
            <KPICard
              key={kpi.label}
              kpi={kpi}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface KPICardProps {
  kpi: {
    value: number;
    prefix?: string;
    suffix: string;
    label: string;
    description: string;
  };
  index: number;
  inView: boolean;
}

function KPICard({ kpi, index, inView }: KPICardProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const duration = 2000; // 2 seconds
        const steps = 60; // 60 steps for smooth animation
        const increment = kpi.value / steps;
        let current = 0;
        
        const interval = setInterval(() => {
          current += increment;
          if (current >= kpi.value) {
            setValue(kpi.value);
            clearInterval(interval);
          } else {
            setValue(current);
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, index * 200); // Delay based on index

      return () => clearTimeout(timer);
    }
  }, [inView, kpi.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="mb-2">
        <span className="text-3xl lg:text-4xl font-bold text-gradient">
          {kpi.prefix || ''}
          {formatNumber(value, { maximumFractionDigits: kpi.value < 10 ? 1 : 0 })}
          {kpi.suffix}
        </span>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">{kpi.label}</h3>
      <p className="text-slate-400 text-sm">{kpi.description}</p>
    </motion.div>
  );
}