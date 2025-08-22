'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Calendar, Mail, ArrowRight } from 'lucide-react';

export function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding">
      <div className="container-responsive">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Let's discuss your next project. Whether it's risk analytics, trading systems, 
            or ML infrastructure, I'm here to help bring your vision to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center justify-center group"
            >
              <Mail className="mr-2 w-5 h-5" />
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <a
              href="https://calendly.com/valmiknahata/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center group"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book a Call
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          <div className="mt-8 text-slate-400 text-sm">
            <p>Response within 24 hours • Free initial consultation</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
