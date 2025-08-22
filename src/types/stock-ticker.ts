export interface StockDataPoint {
  price: number;
  timestamp: number;
  isUp: boolean;
}

export interface UseStockTickerProps {
  initialPrice?: number;
  maxDataPoints?: number;
  updateInterval?: number;
}

export interface UseStockTickerReturn {
  priceHistory: StockDataPoint[];
  currentPrice: number;
  priceChange: number;
  pathData: string;
  livePointCoords: { x: number; y: number };
  isPositive: boolean;
}

export interface StockTickerProps {
  className?: string;
  width?: number;
  height?: number;
  showControls?: boolean;
  showLiveIndicator?: boolean;
  showGrid?: boolean;
  lineColor?: string;
  areaColor?: string;
  gridColor?: string;
  tickerSymbol?: string;
  tickerName?: string;
}
