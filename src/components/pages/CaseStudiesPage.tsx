'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';

const allProjects = [
  {
    id: 'rag-pathology-system',
    title: 'Memory-Efficient RAG System for Pathology Reports',
    summary: 'Developed memory-efficient RAG system using SLMs for pathology report interpretation, reducing memory usage by 93%+ compared to traditional LLMs while maintaining retrieval accuracy across 9,500+ TCGA reports',
    impact: {
      metric: '93%',
      label: 'Memory reduction',
      improvement: 'vs traditional LLMs',
    },
    thumbnail: '/images/projects/rag-system.jpg',
    category: 'Machine Learning',
    tech: ['Python', 'HuggingFace', 'FAISS', 'all-MiniLM-L6-v2'],
    featured: true,
  },
  // Other projects would be here
];

export default function CaseStudiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Machine Learning', 'Data Science', 'Research', 'Academic Publications'];

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen pt-20">
      <div className="container-responsive py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">Academic & Research Projects</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Showcasing my work in machine learning, data science, and research. 
            From published papers to hackathon wins, each project demonstrates practical 
            applications of cutting-edge technology.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
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
          <div className="flex flex-wrap gap-3">
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
                className="btn-secondary"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}