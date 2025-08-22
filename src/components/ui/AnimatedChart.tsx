'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DataPoint {
  x: number;
  y: number;
}

export function AnimatedChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chart dimensions
  const width = 400;
  const height = 200;
  const padding = 20;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  // Generate initial data
  useEffect(() => {
    const initialData: DataPoint[] = Array.from({ length: 50 }, (_, i) => ({
      x: i,
      y: 100 + Math.sin(i * 0.2) * 20 + Math.random() * 10,
    }));
    setData(initialData);
  }, []);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        const newY = lastPoint.y + (Math.random() - 0.5) * 4;
        newData.push({ x: lastPoint.x + 1, y: Math.max(80, Math.min(120, newY)) });
        if (newData.length > 50) {
          newData.shift();
        }
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Create SVG path
  const createPath = (data: DataPoint[]) => {
    if (data.length < 2) return '';
    
    const minY = Math.min(...data.map(d => d.y));
    const maxY = Math.max(...data.map(d => d.y));
    const yRange = maxY - minY;
    
    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((point.y - minY) / yRange) * chartHeight;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const path = createPath(data);

  return (
    <div className="relative w-full h-48">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        className="overflow-visible"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Chart line */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B3A3" />
            <stop offset="100%" stopColor="#2ADBCF" />
          </linearGradient>
        </defs>
        
        {/* Data points */}
        {data.slice(-5).map((point, index) => {
          const minY = Math.min(...data.map(d => d.y));
          const maxY = Math.max(...data.map(d => d.y));
          const yRange = maxY - minY;
          
          const x = padding + ((data.length - 5 + index) / (data.length - 1)) * chartWidth;
          const y = padding + chartHeight - ((point.y - minY) / yRange) * chartHeight;
          
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#2ADBCF"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            />
          );
        })}
        
        {/* Current value indicator */}
        {data.length > 0 && (() => {
          const minY = Math.min(...data.map(d => d.y));
          const maxY = Math.max(...data.map(d => d.y));
          const yRange = maxY - minY;
          
          return (
            <motion.circle
              cx={400 - 20}
              cy={padding + chartHeight - ((data[data.length - 1].y - minY) / yRange) * chartHeight}
              r="6"
              fill="#10B3A3"
              stroke="#2ADBCF"
              strokeWidth="2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })()}
      </svg>
      
      {/* Live indicator */}
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs text-slate-400">Live</span>
      </div>
    </div>
  );
}
