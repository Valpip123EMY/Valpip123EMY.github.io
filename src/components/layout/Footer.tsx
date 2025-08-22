'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const currentYear = new Date().getFullYear();

const footerLinks = {
  explore: [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/case-studies' },
    { name: 'About', href: '/about' },
    { name: 'Resume', href: '/resume' },
  ],
  projects: [
    { name: 'Machine Learning', href: '/case-studies?category=Machine Learning' },
    { name: 'Data Science', href: '/case-studies?category=Data Science' },
    { name: 'Research', href: '/case-studies?category=Research' },
    { name: 'Web Development', href: '/case-studies?category=Web Development' },
  ],
  education: [
    { name: 'UC San Diego', href: '/about#education' },
    { name: 'Coursework', href: '/about#education' },
    { name: 'Skills', href: '/about#skills' },
    { name: 'Research Interests', href: '/about#interests' },
  ],
  connect: [
    { name: 'Contact', href: '/contact' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/valmiknahata', external: true },
    { name: 'GitHub', href: 'https://github.com/valmiknahata', external: true },
    { name: 'Email', href: 'mailto:valmik.nahata@gmail.com', external: true },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/valmiknahata', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/valmiknahata', icon: Github },
  { name: 'Email', href: 'mailto:valmik.nahata@gmail.com', icon: Mail },
  { name: 'Phone', href: 'tel:9145848003', icon: Mail },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-indigo-800/50 border-t border-slate-700/50">
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      <div className="relative">
        <div className="container-responsive py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Explore */}
            <div>
              <h3 className="text-white font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h3 className="text-white font-semibold mb-4">Projects</h3>
              <ul className="space-y-2">
                {footerLinks.projects.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-white font-semibold mb-4">Education</h3>
              <ul className="space-y-2">
                {footerLinks.education.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                {footerLinks.connect.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright and legal */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-400">
                <span>© {currentYear} Valmik Nahata. All rights reserved.</span>
                <div className="flex items-center space-x-4">
                  <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-white transition-colors duration-200">
                    Terms of Use
                  </Link>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 text-xs text-slate-500 text-center max-w-2xl mx-auto">
              <p>
                Content is for demonstration purposes only. This is not financial advice. 
                Past performance does not guarantee future results. All data and analysis 
                presented are for educational and portfolio showcase purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 text-indigo-900 shadow-e2 hover:shadow-e3 transition-all duration-300 z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  );
}
