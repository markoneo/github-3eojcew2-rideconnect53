import { useEffect } from 'react';
import { trackVisitor } from '../services/visitorTrackingService';

/**
 * Hook to track page views and route changes
 * @param page Optional page name to track
 */
export const useVisitorTracking = (page?: string) => {
  useEffect(() => {
    const trackPage = async () => {
      try {
        await trackVisitor();
      } catch (error) {
        console.error('Error in visitor tracking hook:', error);
      }
    };

    trackPage();
  }, [page]);
};