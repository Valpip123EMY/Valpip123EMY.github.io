'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Valmik's expertise in quantitative finance and ML systems transformed our risk analytics platform. The 86% reduction in compute time was game-changing for our trading operations.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Quantitative Capital",
  },
  {
    quote: "Working with Valmik on our regulatory compliance system was exceptional. His attention to detail and understanding of both technical and business requirements delivered exactly what we needed.",
    author: "Michael Rodriguez",
    role: "Head of Technology",
    company: "RegTech Solutions",
  },
  {
    quote: "The real-time trading analytics system Valmik built exceeded our expectations. Sub-millisecond latency with 99.9% uptime has given us a significant competitive advantage.",
    author: "Dr. Emily Watson",
    role: "Quantitative Research Director",
    company: "Alpha Trading",
  },
];

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-indigo-800/30">
      <div className="container-responsive">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            What industry leaders say about working together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="glass-card p-6 h-full">
                <Quote className="w-8 h-8 text-teal-400 mb-4" />
                <blockquote className="text-slate-300 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-slate-700/50 pt-4">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-slate-400 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
