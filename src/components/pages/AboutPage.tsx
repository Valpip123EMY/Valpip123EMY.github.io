'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const affiliations = [
  'University of California, San Diego',
  'Dartmouth-Hitchcock Medical Center',
  'West Virginia University',
  'New Jersey Institute of Technology',
  'Tree-Plenish',
  'Apart Research',
  'Milwaukee Bucks',
  'Green Bank Observatory',
  'Modine Manufacturing',
  'Kean University',
  'The College of New Jersey'
];

function TrustLogos() {
  return (
    <section className="py-12 bg-indigo-800/20">
      <div className="container-responsive">
        <div className="text-center mb-8">
          <p className="text-slate-400 text-sm font-medium">
            Projects, competitions, and research affiliations
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex space-x-16 animate-marquee">
            {[...affiliations, ...affiliations].map((affiliation, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors duration-300 font-medium text-lg whitespace-nowrap"
              >
                {affiliation}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export function AboutPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen pt-20">
      <div className="container-responsive py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-8">About Me</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Computer Science student with a focus on building efficient, scalable solutions. 
              I combine academic rigor with practical experience to deliver quality software.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mb-6 mt-12">Education</h2>
            
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-baseline mb-2">
                <h3 className="text-xl font-semibold text-white">[University Name]</h3>
                <span className="text-indigo-400 font-medium">[Year] – Present</span>
              </div>
              <p className="text-lg text-slate-200 mb-3">Bachelor of Science in Computer Science</p>
              <p className="text-slate-300">
                Coursework: Data Structures & Algorithms, Software Engineering, Database Systems, Web Development
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mb-6 mt-12">Technical Skills</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Languages</h3>
                <p className="text-slate-300">Python, JavaScript, Java, C++, HTML/CSS</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                <p className="text-slate-300">React, Node.js, Git, AWS, Next.js</p>
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mb-6 mt-12">Current Focus</h2>
            <div className="mb-8">
              <p className="text-slate-300 mb-2">• Full-stack web development with React and Next.js</p>
              <p className="text-slate-300 mb-2">• Machine learning and data science with Python</p>
              <p className="text-slate-300 mb-2">• Cloud computing and scalable architectures</p>
              <p className="text-slate-300">• Mobile application development</p>
            </div>

            <div className="border-t border-slate-700 pt-6 mt-8">
              <p className="text-slate-300">
                Open to collaborating on innovative projects and exploring new technologies. 
                Let's connect and build something great together.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Logos Section */}
      <TrustLogos />
    </div>
  );
}