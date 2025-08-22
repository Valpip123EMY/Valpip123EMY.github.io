'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, Database, Code, LineChart } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

// ====== Animation Variants ======
const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ====== Visual 1: Real-Time Stock Ticker ======
function MinimalLine() {
  interface PricePoint {
    price: number;
    timestamp: number;
    isUp: boolean;
  }
  
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState(383.45);
  const [isMarketUp, setIsMarketUp] = useState(true);

  // Generate realistic intraday stock movement
  const generateNextPrice = (prevPrice: number) => {
    // Realistic stock volatility - smaller moves most of the time
    const baseVolatility = prevPrice * 0.002; // 0.2% base volatility
    
    // 80% chance of small moves, 20% chance of larger moves
    const isLargeMove = Math.random() < 0.2;
    const volatilityMultiplier = isLargeMove ? 3 : 1;
    
    // Random walk with slight mean reversion
    const randomMove = (Math.random() - 0.5) * baseVolatility * volatilityMultiplier;
    
    // Add some momentum (trend continuation)
    const momentum = isMarketUp ? 0.0005 : -0.0005;
    
    // Occasional trend reversals
    if (Math.random() < 0.05) {
      setIsMarketUp(prev => !prev);
    }
    
    const newPrice = prevPrice + randomMove + (prevPrice * momentum);
    
    // Keep price within reasonable bounds (300-450 range)
    return Math.max(300, Math.min(450, newPrice));
  };

  // Add new price tick every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = generateNextPrice(currentPrice);
      setCurrentPrice(newPrice);
      
      setPriceHistory(prev => {
        const newHistory = [...prev, {
          price: newPrice,
          timestamp: Date.now(),
          isUp: newPrice > currentPrice
        }];
        
        // Keep only last 60 points for smooth rendering
        return newHistory.slice(-60);
      });
    }, 500); // One tick every 500ms

    return () => clearInterval(interval);
  }, [currentPrice]);

  // Initialize with some starting data
  useEffect(() => {
    const initialHistory = [];
    let price = 383.45;
    
    for (let i = 0; i < 30; i++) {
      price = generateNextPrice(price);
      initialHistory.push({
        price: price,
        timestamp: Date.now() - (30 - i) * 500,
        isUp: Math.random() > 0.5
      });
    }
    
    setPriceHistory(initialHistory);
    setCurrentPrice(price);
  }, []);

  // Generate SVG path from price history
  const pathData = useMemo(() => {
    if (priceHistory.length < 2) return '';
    
    const width = 400;
    const height = 160;
    
    // Get price range for scaling
    const prices = priceHistory.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    // Add padding to the range
    const padding = priceRange * 0.1;
    const scaledMin = minPrice - padding;
    const scaledMax = maxPrice + padding;
    const scaledRange = scaledMax - scaledMin;
    
    const stepX = width / (priceHistory.length - 1);
    
    return priceHistory.map((point, i) => {
      const x = i * stepX;
      const y = height - ((point.price - scaledMin) / scaledRange) * height;
      return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
    }).join(' ');
  }, [priceHistory]);

  // Get live point coordinates - precisely at the actual line end
  const livePointCoords = useMemo(() => {
    if (priceHistory.length < 2) return { x: 0, y: 80 };
    
    const prices = priceHistory.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    const padding = priceRange * 0.1;
    const scaledMin = minPrice - padding;
    const scaledMax = maxPrice + padding;
    const scaledRange = scaledMax - scaledMin;
    
    // Position exactly at the end of the line path
    const stepX = 400 / (priceHistory.length - 1);
    const x = (priceHistory.length - 1) * stepX;
    const y = 160 - ((currentPrice - scaledMin) / scaledRange) * 160;
    
    return { x, y };
  }, [priceHistory, currentPrice]);

  // Calculate price change from previous tick
  const priceChange = useMemo(() => {
    if (priceHistory.length < 2) return 0;
    const prev = priceHistory[priceHistory.length - 2]?.price || currentPrice;
    return currentPrice - prev;
  }, [priceHistory, currentPrice]);

  const isPositive = priceChange >= 0;

  return (
    <div className="w-full h-[300px] sm:h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg overflow-hidden relative">
      {/* Subtle grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 160" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#grid)" />
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <LineChart className="w-5 h-5 text-blue-400" />
          <div className="flex flex-col">
            <span className="text-slate-200 text-sm font-medium">Activity</span>
            <span className="text-xs text-slate-400">Real-time</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div 
            className={`w-2 h-2 rounded-full ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`}
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-slate-400">live</span>
        </div>
      </div>

      {/* Main chart */}
      <div className="relative z-10 h-[200px] w-full">
        <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stockLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="areaFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          {pathData && (
            <motion.path
              d={`${pathData} L 400,160 L 0,160 Z`}
              fill="url(#areaFill)"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Main price line */}
          {pathData && (
            <motion.path
              d={pathData}
              fill="none"
              stroke="url(#stockLine)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ 
                filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.4))',
                vectorEffect: 'non-scaling-stroke'
              }}
            />
          )}

          {/* Live indicator - perfectly attached to line end */}
          <g>
            {/* Pulsing outer ring */}
            <motion.circle
              cx={livePointCoords.x}
              cy={livePointCoords.y}
              r={6}
              fill="none"
              stroke={isPositive ? '#10b981' : '#ef4444'}
              strokeWidth="1.5"
              opacity="0.5"
              animate={{ 
                r: [5, 9, 5],
                opacity: [0.5, 0.15, 0.5],
                strokeWidth: [1.5, 1, 1.5]
              }}
              transition={{ 
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Main live dot */}
            <motion.circle
              cx={livePointCoords.x}
              cy={livePointCoords.y}
              r={3}
              fill={isPositive ? '#10b981' : '#ef4444'}
              stroke="#ffffff"
              strokeWidth="1.5"
              animate={{ 
                cx: livePointCoords.x,
                cy: livePointCoords.y,
                fill: isPositive ? '#10b981' : '#ef4444'
              }}
              transition={{ 
                duration: 0.2,
                ease: 'easeOut'
              }}
              style={{ 
                filter: `drop-shadow(0 0 6px ${isPositive ? 'rgba(16,185,129,0.8)' : 'rgba(239,68,68,0.8)'})`
              }}
            />
            
            {/* Inner core */}
            <motion.circle
              cx={livePointCoords.x}
              cy={livePointCoords.y}
              r={1}
              fill="#ffffff"
              animate={{ 
                cx: livePointCoords.x,
                cy: livePointCoords.y,
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 0.2,
                ease: 'easeOut',
                opacity: { duration: 1, repeat: Infinity }
              }}
            />
          </g>
        </svg>
      </div>

      {/* Simple progress indicator */}
      <div className="absolute bottom-4 right-4">
        <motion.div 
          className="w-2 h-2 rounded-full bg-white/30"
          animate={{ 
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}


// ====== Visual 2: Research Stack (fitted cards) ======
function ResearchStack() {
  const rows = [
    { tag: 'Manuscript', progress: 0.72 },
    { tag: 'Experiment Notes', progress: 0.45 },
    { tag: 'Overview', progress: 0.88 },
  ];

  return (
    <div className="w-full h-[300px] sm:h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg overflow-hidden flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-violet-300" />
        <span className="text-slate-200 text-sm font-medium">Research</span>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-3">
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-[calc(33%-0.5rem)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-200 text-sm font-medium">{r.tag}</span>
              <span className="text-[11px] text-slate-400">in progress</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-indigo-400"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(r.progress * 100)}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
// ====== Visual 3: Dashboard (fixed fit) ======
function CalmDashboard() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 120);
    return () => clearInterval(id);
  }, []);

  const N = 60;
  const series = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => {
        const y = 40 + 20 * Math.sin((i + t) * 0.15) + 8 * Math.cos((i + t) * 0.05);
        return y;
      }),
    [t]
  );

  const pathD = useMemo(() => {
    const w = 400, h = 80, step = w / (N - 1);
    return `M 0,${h - series[0]} ` + series.map((y, i) => (i === 0 ? '' : `L ${i * step},${h - y}`)).join(' ');
  }, [series]);

  const tags = ['Accuracy', 'Loss', 'Precision', 'Recall'];

  return (
    <div className="w-full h-[300px] sm:h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-lg flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-300" />
          <span className="text-slate-200 text-sm font-medium">Dashboard</span>
        </div>
        <span className="text-xs text-slate-400">metrics</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {tags.map((t, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-16">
            <div className="text-xs text-slate-400 mb-2">{t}</div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
                animate={{ width: ['35%', '75%', '50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 flex-1 min-h-0">
        <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dash" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <motion.path d={pathD} fill="none" stroke="url(#dash)" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

// ====== Visual 4: ML Pipeline (fixed to fit without scroll) ======
function CalmMLPipeline() {
  const lines = [
    'import pandas as pd',
    'from sklearn.ensemble import RandomForestClassifier',
    'from sklearn.model_selection import train_test_split',
    '',
    '# Load and preprocess data',
    'data = pd.read_csv("dataset.csv")',
    'X = data.drop("target", axis=1)',
    'y = data["target"]',
    '',
    '# Train model',
    'model = RandomForestClassifier()',
    'model.fit(X_train, y_train)',
    '',
    '# Evaluate',
    'accuracy = model.score(X_test, y_test)',
    'print(f"Accuracy: {accuracy:.3f}")',
  ];
  
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLine < lines.length) {
        setDisplayedLines(prev => [...prev, lines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      } else {
        // Reset animation after showing all lines
        setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLine(0);
        }, 2500);
      }
    }, 800);

    return () => clearInterval(timer);
  }, [currentLine, lines.length]);

  return (
    <div className="w-full h-[300px] sm:h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-5 h-5 text-purple-300" />
        <span className="text-slate-200 text-sm font-medium">ML Pipeline</span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 font-mono flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center mb-3">
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-xs text-slate-400 ml-3">ml_pipeline.py</span>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="space-y-1">
            {displayedLines.map((line, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="text-slate-200 text-xs leading-relaxed flex items-start"
              >
                <span className="text-slate-500 mr-3 select-none inline-block w-6 text-right flex-shrink-0">
                  {line.trim() === '' ? ' ' : (i + 1)}
                </span>
                <span className={`flex-1 ${
                  line.startsWith('import') || line.startsWith('from') ? 'text-purple-400' :
                  line.startsWith('#') ? 'text-green-400' :
                  line.includes('pd.') || line.includes('RandomForestClassifier') ? 'text-yellow-400' :
                  line.includes('model.') ? 'text-cyan-400' :
                  line.includes('print') ? 'text-orange-400' :
                  line.includes('"') ? 'text-emerald-400' :
                  'text-slate-200'
                }`}>
                  {line || ' '}
                  {i === displayedLines.length - 1 && line.trim() !== '' && (
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ duration: 0.8, repeat: Infinity }} 
                      className="ml-1 text-white"
                    >
                      |
                    </motion.span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ====== Slides ======
const slides = [
  { id: 1, content: <MinimalLine />, title: 'Analytics' },
  { id: 2, content: <ResearchStack />, title: 'Research' },
  { id: 3, content: <CalmDashboard />, title: 'Dashboard' },
  { id: 4, content: <CalmMLPipeline />, title: 'ML Pipeline' },
];


// ====== Main Hero ======
export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 9000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-900" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 200 200" preserveAspectRatio="none">
        <defs>
          <pattern id="bggrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bggrid)" />
      </svg>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={heroVariants} initial="hidden" animate="visible" className="text-center lg:text-left">
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Valmik Nahata
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-slate-300 block mt-4">
                Data Science Student & ML Researcher
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              UC San Diego Data Science student passionate about machine learning, research, and building impactful solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 hover:border-white/40 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative flex flex-col items-center">
            <div className="relative w-full max-w-2xl">
              <motion.div
                key={slides[current].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full"
              >
                {slides[current].content}
              </motion.div>
            </div>

            <div className="flex items-center gap-6 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={prevSlide}
                className="px-5 py-3 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
                aria-label="Previous slide"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </motion.button>

              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-white/80 w-8' : 'bg-white/30 w-2.5 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextSlide}
                className="px-5 py-3 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div key={current} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-3 text-center">
              <span className="text-white/80 text-sm font-medium bg-white/5 px-5 py-1.5 rounded-full border border-white/10">
                {slides[current].title}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="w-6 h-10 border-2 border-white/15 rounded-full flex justify-center items-start">
          <motion.div className="w-1 h-3 bg-white/50 rounded-full mt-2" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}
