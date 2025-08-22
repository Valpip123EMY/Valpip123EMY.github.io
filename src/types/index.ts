// Common types used across the application

export type PricePoint = {
  price: number;
  timestamp: number;
  isUp: boolean;
};

export type Slide = {
  id: number;
  content: React.ReactNode;
  title: string;
};

export type HeroVariant = 'hidden' | 'visible';

export interface HeroVariants {
  hidden: {
    opacity: number;
    y?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    transition: {
      duration?: number;
      staggerChildren?: number;
      ease?: string;
    };
  };
}

// Add more types as needed for other components
