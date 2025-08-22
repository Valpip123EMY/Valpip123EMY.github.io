export const HERO_ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      staggerChildren: 0.2 
    } 
  },
};

export const ITEM_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

export const HERO_GRADIENT = 'bg-gradient-to-r from-indigo-600 to-purple-600';
export const HERO_GRADIENT_HOVER = 'hover:from-indigo-700 hover:to-purple-700';

export const BUTTON_STYLES = {
  primary: 'px-8 py-4 text-lg font-semibold text-white rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl',
  secondary: 'px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105',
};
