import { useState, useEffect, useMemo, useCallback } from 'react';
import { PricePoint } from '@/types';

export const useStockTicker = (initialPrice = 383.45) => {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(initialPrice);
  const [isMarketUp, setIsMarketUp] = useState<boolean>(true);

  // Generate realistic intraday stock movement
  const generateNextPrice = useCallback((prevPrice: number): number => {
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
  }, [isMarketUp]);

  // Initialize with starting data
  useEffect(() => {
    const initialHistory: PricePoint[] = [];
    let price = initialPrice;
    
    for (let i = 0; i < 30; i++) {
      price = generateNextPrice(price);
      initialHistory.push({
        price,
        timestamp: Date.now() - (30 - i) * 500,
        isUp: Math.random() > 0.5
      });
    }
    
    setPriceHistory(initialHistory);
    setCurrentPrice(price);
  }, [generateNextPrice, initialPrice]);

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
    }, 500);

    return () => clearInterval(interval);
  }, [currentPrice, generateNextPrice]);

  // Calculate price change from previous tick
  const priceChange = useMemo(() => {
    if (priceHistory.length < 2) return 0;
    const prev = priceHistory[priceHistory.length - 2]?.price || currentPrice;
    return currentPrice - prev;
  }, [priceHistory, currentPrice]);

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
    const scaledRange = (maxPrice + padding) - scaledMin;
    
    const stepX = width / (priceHistory.length - 1);
    
    return priceHistory.map((point, i) => {
      const x = i * stepX;
      const y = height - ((point.price - scaledMin) / scaledRange) * height;
      return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
    }).join(' ');
  }, [priceHistory]);

  // Get live point coordinates
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

  return {
    priceHistory,
    currentPrice,
    priceChange,
    pathData,
    livePointCoords,
    isPositive: priceChange >= 0
  };
};
