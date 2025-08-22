'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Filter, X, Calendar, MapPin, Award } from 'lucide-react';

const allExperience = [
  {
    id: 'dartmouth-medical-intern',
    title: 'Machine Learning Research Intern',
    organization: 'Dartmouth-Hitchcock Medical Center',
    date: 'Jun 2024 – Feb 2025',
    dateSort: new Date('2025-02-01'),
    summary: 'Developed memory-efficient RAG system using SLMs for pathology report interpretation, reducing memory usage by 93%+ compared to traditional LLMs while maintaining retrieval accuracy across 9,500+ TCGA reports. Implemented fusion search architecture integrating BM25 semantic similarity with FAISS quantized vector search to retrieve top-15 most relevant documents using HuggingFace transformers and all-MiniLM-L6-v2 embeddings. Co-authored research manuscript and designed accompanying conference poster and slide deck presentation.',
    tech: ['Python', 'HuggingFace', 'FAISS', 'SLMs', 'Machine Learning'],
    category: 'Research'
  },
  {
    id: 'tree-plenish-intern',
    title: 'Data Automation Intern',
    organization: 'Tree-Plenish',
    date: 'Jun 2022 – Sep 2022',
    dateSort: new Date('2022-09-01'),
    summary: 'Developed Python automation pipeline using pandas and Google Sheets API with AWS-hosted SQL database to streamline financial tracking across 300+ partner schools, 3,200+ volunteers and 50,000+ sapling distributions. Executed market research on New England community colleges and presented strategic outreach framework to executive team, outlining pathway to expand environmental programs to 10+ new institutional partners.',
    tech: ['Python', 'pandas', 'Google Sheets API', 'AWS', 'SQL'],
    category: 'Independent'
  },
  {
    id: 'robotics-tutor',
    title: 'Volunteer Robotics Tutor',
    organization: 'New Providence School District',
    date: 'Sep 2021 – Jun 2024',
    dateSort: new Date('2024-06-01'),
    summary: 'Designed comprehensive robotics curriculum for annual outreach program, teaching fundamental programming and engineering concepts to 100+ elementary school students through hands-on VEX robotics activities. Organized summer STEM camps and mentored middle school VEX robotics competition teams, providing technical guidance on robot design, programming strategies, and competitive preparation.',
    tech: ['VEX Robotics', 'Programming', 'Engineering', 'Curriculum Design'],
    category: 'Independent'
  }
];

const allProjects = [
  {
    id: 'transformative-ai-economics',
    title: 'The Early Economic Impacts of Transformative AI',
    summary: 'Co-developed novel temporal coherence framework for AI automation using GPT-4.1-mini to estimate effective time across 450+ O*NET tasks, identifying 8-hour coherence threshold for 80%+ automation. Conducted literature review and authored discussion sections statistically modeling 2024-2026 automation timeline projections, identifying regulatory constraints, human premium effects, and cost-implementation factors.',
    impact: {
      metric: '1st Place',
      label: 'Apart Research Sprint',
      improvement: 'Economics of AI',
    },
    thumbnail: '/images/projects/ai-economics.jpg',
    category: 'Competitions',
    tech: ['Python', 'GPT-4.1-mini', 'Statistical Modeling', 'O*NET'],
    featured: true,
    date: 'Apr 2025 – May 2025',
    dateSort: new Date('2025-05-01'),
    organization: 'Apart Research',
    role: '1st Place – Apart Research Economics of Transformative AI Sprint',
  },
  {
    id: 'milwaukee-bucks-analytics',
    title: 'Milwaukee Bucks Fan Engagement Prediction System',
    summary: 'Directed 5-person team developing dual Random Forest models in Python using scikit-learn with Matplotlib and Seaborn visualizations, achieving 81%+ classification accuracy across propensity and churn analyses. Presented winning solution to franchise executives featuring 3 strategic recommendations including custom referral programs, IP crossover events, and Figma-prototyped mobile wayfinding app based on model insights.',
    impact: {
      metric: '3rd Place',
      label: 'Business Analytics Hackathon',
      improvement: '81% accuracy',
    },
    thumbnail: '/images/projects/bucks-analytics.jpg',
    category: 'Competitions',
    tech: ['Python', 'scikit-learn', 'Matplotlib', 'Seaborn'],
    featured: true,
    date: 'Feb 2025 – Mar 2025',
    dateSort: new Date('2025-03-01'),
    organization: 'Milwaukee Bucks & Modine Manufacturing',
    role: '3rd Place – Milwaukee Bucks & Modine Manufacturing Business Analytics Hackathon',
  },
  {
    id: 'rag-pathology-system',
    title: 'Memory-Efficient RAG System for Pathology Reports',
    summary: 'Developed memory-efficient RAG system using SLMs for pathology report interpretation, reducing memory usage by 93%+ compared to traditional LLMs while maintaining retrieval accuracy across 9,500+ TCGA reports. Implemented fusion search architecture integrating BM25 semantic similarity with FAISS quantized vector search to retrieve top-15 most relevant documents using HuggingFace transformers and all-MiniLM-L6-v2 embeddings. Co-authored research manuscript and designed accompanying conference poster and slide deck presentation.',
    impact: {
      metric: '93%',
      label: 'Memory reduction',
      improvement: 'vs traditional LLMs',
    },
    thumbnail: '/images/projects/rag-system.jpg',
    category: 'Research',
    tech: ['Python', 'HuggingFace', 'FAISS', 'SLMs'],
    featured: false,
    date: 'Jun 2024 – Feb 2025',
    dateSort: new Date('2025-02-01'),
    organization: 'Dartmouth-Hitchcock Medical Center',
    role: 'Machine Learning Research Intern',
  },
  {
    id: 'crab-pulsar-analysis',
    title: 'A Statistical Analysis of Crab Pulsar Giant Pulse Rates',
    summary: 'Implemented seasonal and solar proximity analysis to examine influences on 24,000+ Crab Pulsar giant pulses across 461-day study period in Python using NumPy and Astropy on shared JupyterHub infrastructure. Conducted 1.55GHz L-band radio observations of Crab Pulsar using Green Bank Observatory\'s 20m telescope. Identified irregular giant pulses from supernova SN2023ixf, enabling potential follow-up studies.',
    impact: {
      metric: '24,000+',
      label: 'Giant pulses analyzed',
      improvement: '461-day study period',
    },
    thumbnail: '/images/projects/crab-pulsar.jpg',
    category: 'Research',
    tech: ['Python', 'NumPy', 'Astropy', 'JupyterHub', 'Radio Astronomy'],
    featured: false,
    date: 'Feb 2023 – Jul 2024',
    dateSort: new Date('2024-07-01'),
    organization: 'West Virginia University',
    role: 'Co-authored Publication – West Virginia University',
  },
  {
    id: 'triangle-counting-algorithms',
    title: 'Cover Edge-Based Triangle Counting',
    summary: 'Integrated 22 sequential and 11 parallel triangle counting algorithms in C++ and collaboratively executed comprehensive benchmarking across 12 real-world SNAP and 12 synthetic Graph500 RMAT datasets. Standardized 15 algorithms into formal pseudocode with LaTeX, ensuring reproducibility in publication.',
    impact: {
      metric: '33',
      label: 'Algorithms integrated',
      improvement: '24 datasets benchmarked',
    },
    thumbnail: '/images/projects/triangle-counting.jpg',
    category: 'Research',
    tech: ['C++', 'SNAP', 'Graph500 RMAT', 'LaTeX', 'Algorithm Design'],
    featured: false,
    date: 'Jan 2023 – May 2024',
    dateSort: new Date('2024-05-01'),
    organization: 'New Jersey Institute of Technology',
    role: 'Co-authored Manuscript – New Jersey Institute of Technology',
  },
  {
    id: 'iot-environmental-monitoring',
    title: 'IoT Environmental Monitoring System',
    summary: 'Developed real-time environmental monitoring system using Particle Boron development board and IoT sensors within 6-hour competition timeframe, implementing MATLAB data processing for live heat index, dew point, and barometric pressure displays.',
    impact: {
      metric: '1st Place',
      label: 'Hack-Io-Thon',
      improvement: '6-hour timeframe',
    },
    thumbnail: '/images/projects/iot-monitoring.jpg',
    category: 'Competitions',
    tech: ['MATLAB', 'Particle Boron', 'IoT Sensors', 'Real-time Data Processing'],
    featured: false,
    date: 'Mar 2023',
    dateSort: new Date('2023-03-01'),
    organization: 'The College of New Jersey',
    role: '1st Place – The College of New Jersey Hack-Io-Thon',
  },
  {
    id: 'pathfinding-visualization',
    title: 'Pathfinding Algorithm Visualization Tool',
    summary: 'Implemented optimized pathfinding algorithms in Python integrated with Godot Engine to create interactive shortest-path visualization application for user-defined node networks. Delivered technical presentation demonstrating real-world applications and algorithmic complexity analysis.',
    impact: {
      metric: '2nd Place',
      label: 'HackKean',
      improvement: 'Interactive visualization',
    },
    thumbnail: '/images/projects/pathfinding.jpg',
    category: 'Competitions',
    tech: ['Python', 'Godot Engine', 'Algorithm Design', 'Data Visualization'],
    featured: false,
    date: 'Nov 2022',
    dateSort: new Date('2022-11-01'),
    organization: 'Kean University',
    role: '2nd Place – Kean University HackKean',
  },
  {
    id: 'digital-asset-trading',
    title: 'Digital Asset Algorithmic Trading System',
    summary: 'Generated $6,000+ in profit using algorithmic trading strategies for Team Fortress 2 and Counter-Strike 2 digital assets. Developed Python automation scripts leveraging Backpack.tf and Marketplace.tf APIs to execute 2,400+ strategic transactions with real-time market analysis and price optimization.',
    impact: {
      metric: '$6,000+',
      label: 'Profit generated',
      improvement: '2,400+ transactions',
    },
    thumbnail: '/images/projects/trading-system.jpg',
    category: 'Independent',
    tech: ['Python', 'Backpack.tf API', 'Marketplace.tf API', 'Market Analysis'],
    featured: false,
    date: 'Aug 2022 – Jan 2023',
    dateSort: new Date('2023-01-01'),
    organization: 'Independent Project',
    role: 'Independent Project',
  },
  {
    id: 'tree-plenish-automation',
    title: 'Tree-Plenish Data Automation Pipeline',
    summary: 'Developed Python automation pipeline using pandas and Google Sheets API with AWS-hosted SQL database to streamline financial tracking across 300+ partner schools, 3,200+ volunteers and 50,000+ sapling distributions. Executed market research on New England community colleges and presented strategic outreach framework to executive team, outlining pathway to expand environmental programs to 10+ new institutional partners.',
    impact: {
      metric: '300+',
      label: 'Partner schools managed',
      improvement: '50,000+ saplings tracked',
    },
    thumbnail: '/images/projects/tree-plenish.jpg',
    category: 'Independent',
    tech: ['Python', 'pandas', 'Google Sheets API', 'AWS', 'SQL'],
    featured: false,
    date: 'Jun 2022 – Sep 2022',
    dateSort: new Date('2022-09-01'),
    organization: 'Tree-Plenish',
    role: 'Data Automation Intern',
  },
];

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = ['All', 'Research', 'Competitions', 'Independent'];

  // Combine experience and projects, sort chronologically (most recent first)
  const sortedItems = useMemo(() => {
    const allItems = [...allExperience, ...allProjects];
    return allItems.sort((a, b) => {
      const aDate = a.dateSort instanceof Date ? a.dateSort.getTime() : new Date(a.dateSort).getTime();
      const bDate = b.dateSort instanceof Date ? b.dateSort.getTime() : new Date(b.dateSort).getTime();
      return bDate - aDate;
    });
  }, []);

  const filteredItems = useMemo(() => {
    return sortedItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [sortedItems, searchTerm, selectedCategory]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Experience & Projects
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Showcasing my professional experience and academic projects in machine learning, data science, and research. 
            From internships to hackathon wins, each entry demonstrates practical applications of cutting-edge technology with measurable impact.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {category}
              </button>
            ))}
            
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Experience & Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300 flex flex-col"
            >
              {/* Item Header */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.category === 'Research' ? 'bg-green-500/20 text-green-300' :
                    item.category === 'Competitions' ? 'bg-purple-500/20 text-purple-300' :
                    item.category === 'Independent' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-orange-500/20 text-orange-300'
                  }`}>
                    {item.category}
                  </span>
                  {allExperience.includes(item) && (
                    <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium">
                      Experience
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                
                <div className="space-y-2 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{item.organization}</span>
                  </div>
                  {(item as any).role && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="font-medium text-teal-300">{(item as any).role}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Item Description */}
              <div className="mb-4 flex-1">
                <p className="text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-white font-semibold mb-2 text-sm">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs border border-slate-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <p className="text-slate-400 text-lg mb-4">No experience or projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}