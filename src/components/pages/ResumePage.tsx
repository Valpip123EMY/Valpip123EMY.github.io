'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ResumePage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen pt-20">
      <div className="container-responsive py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Resume
          </h1>
          <div className="flex justify-center">
            <a 
              href="components\pages\resume1.pdf" 
              download
              className="btn-primary inline-flex items-center justify-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Resume Content */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          className="glass-card p-8 lg:p-12 max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Valmik Nahata</h2>
            <div className="flex flex-wrap justify-center gap-4 text-slate-300">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>New York City, NY</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>(914) 584-8003</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <a href="mailto:valmik.nahata@gmail.com" className="hover:text-indigo-400 transition-colors">valmik.nahata@gmail.com</a>
              </div>
              <div className="flex items-center">
                <Linkedin className="h-4 w-4 mr-1" />
                <a href="https://linkedin.com/in/valmiknahata" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">valmiknahata</a>
              </div>
              <div className="flex items-center">
                <Github className="h-4 w-4 mr-1" />
                <a href="https://github.com/valmiknahata" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">valmiknahata</a>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2 mb-4">Education</h3>
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">University of California, San Diego</h4>
                  <p className="text-indigo-400">Bachelor of Science in Data Science</p>
                </div>
                <span className="text-slate-300">Sep. 2024 – Present</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Data Structures & Algorithms, Quantitative Methods in Business</li>
                <li>Introduction to Research Methods & Statistical Analysis</li>
                <li>Microeconomics & Macroeconomics, Multivariable Calculus</li>
              </ul>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2 mb-4">Experience</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">Dartmouth-Hitchcock Medical Center</h4>
                  <p className="text-indigo-400">Machine Learning Research Intern</p>
                </div>
                <span className="text-slate-300">Jun. 2024 – Feb. 2025</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Developed memory-efficient RAG system using SLMs for pathology report interpretation, reducing memory usage by 93%+ compared to traditional LLMs while maintaining retrieval accuracy across 9,500+ TCGA reports</li>
                <li>Implemented fusion search architecture integrating BM25 semantic similarity with FAISS quantized vector search to retrieve top-15 most relevant documents using HuggingFace transformers and all-MiniLM-L6-v2 embeddings</li>
                <li>Co-authored research manuscript and designed accompanying conference poster and slide deck presentation</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">Tree-Plenish</h4>
                  <p className="text-indigo-400">Data Automation Intern</p>
                </div>
                <span className="text-slate-300">Jun. 2022 – Sep. 2022</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Developed Python automation pipeline using pandas and Google Sheets API with AWS-hosted SQL database to streamline financial tracking across 300+ partner schools, 3,200+ volunteers and 50,000+ sapling distributions</li>
                <li>Executed market research on New England community colleges and presented strategic outreach framework to executive team, outlining pathway to expand environmental programs to 10+ new institutional partners</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2 mb-4">Projects</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">The Early Economic Impacts of Transformative AI</h4>
                  <p className="text-indigo-400">1st Place – Apart Research Economics of Transformative AI Sprint</p>
                </div>
                <span className="text-slate-300">Apr. 2025 – May 2025</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Co-developed novel temporal coherence framework for AI automation using GPT-4.1-mini to estimate effective time across 450+ O*NET tasks, identifying 8-hour coherence threshold for 80%+ automation</li>
                <li>Conducted literature review and authored discussion sections statistically modeling 2024-2026 automation timeline projections, identifying regulatory constraints, human premium effects, and cost-implementation factors</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">Milwaukee Bucks Fan Engagement Prediction System</h4>
                  <p className="text-indigo-400">3rd Place – Milwaukee Bucks & Modine Manufacturing Business Analytics Hackathon</p>
                </div>
                <span className="text-slate-300">Feb. 2025 – Mar. 2025</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Directed 5-person team developing dual Random Forest models in Python using scikit-learn with Matplotlib and Seaborn visualizations, achieving 81%+ classification accuracy across propensity and churn analyses</li>
                <li>Presented winning solution to franchise executives featuring 3 strategic recommendations including, custom referral programs, IP crossover events, and Figma-prototyped mobile wayfinding app based on model insights</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">A Statistical Analysis of Crab Pulsar Giant Pulse Rates</h4>
                  <p className="text-indigo-400">Co-authored Publication – West Virginia University</p>
                </div>
                <span className="text-slate-300">Feb. 2023 – Jul. 2024</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Implemented seasonal and solar proximity analysis to examine influences on 24,000+ Crab Pulsar giant pulses across 461-day study period in Python using NumPy and Astropy on shared JupyterHub infrastructure</li>
                <li>Conducted 1.55GHz L-band radio observations of Crab Pulsar using Green Bank Observatory's 20m telescope</li>
                <li>Identified irregular giant pulses from supernova SN2023ixf, enabling potential follow-up studies</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">Cover Edge-Based Triangle Counting</h4>
                  <p className="text-indigo-400">Co-authored Manuscript – New Jersey Institute of Technology</p>
                </div>
                <span className="text-slate-300">Jan. 2023 – May 2024</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Integrated 22 sequential and 11 parallel triangle counting algorithms in C++ and collaboratively executed comprehensive benchmarking across 12 real-world SNAP and 12 synthetic Graph500 RMAT datasets</li>
                <li>Standardized 15 algorithms into formal pseudocode with LaTeX, ensuring reproducibility in publication</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">Digital Asset Algorithmic Trading System</h4>
                  <p className="text-indigo-400">Independent Project</p>
                </div>
                <span className="text-slate-300">Aug. 2022 – Jan. 2023</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 mt-2">
                <li>Generated $6,000+ in profit using algorithmic trading strategies for Team Fortress 2 and Counter-Strike 2 digital assets</li>
                <li>Developed Python automation scripts leveraging Backpack.tf and Marketplace.tf APIs to execute 2,400+ strategic transactions with real-time market analysis and price optimization</li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2 mb-4">Technical Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Languages</h4>
                <p className="text-slate-300">Python, R, C++, JavaScript, HTML & CSS, Java, SQL, MATLAB, LaTeX</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Frameworks & Libraries</h4>
                <p className="text-slate-300">pandas, Matplotlib, scikit-learn, NumPy, PyTorch, TensorFlow, Seaborn, React</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Developer Tools</h4>
                <p className="text-slate-300">VS Code, Jupyter Notebook, RStudio, Git, AWS, Firebase, Figma, Excel</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-white mb-2">Interests</h4>
              <p className="text-slate-300">SLMs & LLMs, RAG, NLP, Data Visualization, Statistical Modeling, System Design</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}