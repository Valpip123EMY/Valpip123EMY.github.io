'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStockTicker } from '@/hooks/useStockTicker';
import type { StockTickerProps } from '@/types/stock-ticker';

export function StockTicker({
  className,
  width = 400,
  height = 160,
  showControls = true,
  showLiveIndicator = true,
  showGrid = true,
  lineColor = 'url(#stockLineGradient)',
  areaColor = 'url(#areaFillGradient)',
  gridColor = 'rgba(255, 255, 255, 0.1)',
  tickerSymbol = 'STOCK',
  tickerName = 'Stock Ticker',
}: StockTickerProps) {
  const { priceHistory, currentPrice, priceChange, pathData, livePointCoords, isPositive } = 
    useStockTicker(383.45);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(currentPrice);

  const formattedChange = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero',
  }).format(priceChange);

  return (
    <div className={cn('rounded-2xl bg-card p-6 shadow-sm', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <LineChart className="h-5 w-5 text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{tickerSymbol}</span>
            <span className="text-xs text-muted-foreground">{tickerName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {showLiveIndicator && (
            <>
              <motion.div 
                className={cn(
                  'h-2 w-2 rounded-full',
                  isPositive ? 'bg-green-500' : 'bg-red-500'
                )}
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <span className="text-xs text-muted-foreground">Live</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between mb-2">
        <div className="space-y-1">
          <p className="text-2xl font-bold tabular-nums">{formattedPrice}</p>
          <p 
            className={cn(
              'text-sm font-medium',
              isPositive ? 'text-green-500' : 'text-red-500'
            )}
          >
            {formattedChange} ({Math.abs(priceChange / (currentPrice - priceChange) * 100).toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="relative h-40 w-full">
        <svg 
          className="h-full w-full" 
          viewBox={`0 0 ${width} ${height}`} 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="stockLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="areaFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>

            {showGrid && (
              <pattern 
                id="gridPattern" 
                width="20" 
                height="20" 
                patternUnits="userSpaceOnUse"
              >
                <path 
                  d={`M 20 0 L 0 0 0 20`} 
                  fill="none" 
                  stroke={gridColor} 
                  strokeWidth="0.5" 
                />
              </pattern>
            )}
          </defs>

          {showGrid && (
            <rect 
              width="100%" 
              height="100%" 
              fill="url(#gridPattern)" 
              opacity="0.5"
            />
          )}

          {/* Area under curve */}
          {pathData && (
            <>
              <motion.path
                d={`${pathData} L ${width},${height} L 0,${height} Z`}
                fill={areaColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Line */}
              <motion.path
                d={pathData}
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />

              {/* Live point indicator */}
              <motion.circle
                cx={livePointCoords.x}
                cy={livePointCoords.y}
                r="4"
                fill="white"
                stroke="#6366f1"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.5
                }}
              />
              
              <motion.circle
                cx={livePointCoords.x}
                cy={livePointCoords.y}
                r="8"
                fill="#6366f1"
                initial={{ opacity: 0.2, scale: 0 }}
                animate={{ 
                  opacity: [0.2, 0],
                  scale: [0, 1.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeOut'
                }}
              />
            </>
          )}
        </svg>
      </div>

      {showControls && (
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>1D</span>
          <span>1W</span>
          <span className="font-medium text-foreground">1M</span>
          <span>3M</span>
          <span>1Y</span>
          <span>ALL</span>
        </div>
      )}
    </div>
  );
}
