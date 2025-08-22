'use client';

import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // Simple privacy-friendly analytics
    const trackPageView = () => {
      // You can integrate with Plausible, Fathom, or other privacy-friendly analytics here
      console.log('Page view tracked');
    };

    trackPageView();
  }, []);

  return null;
}
