'use client';

import React from 'react';
import { NetflixIcon, HuluIcon, AmazonPrimeVideoIcon, DisneyPlusIcon, MaxIcon, AppleTvIcon } from './platform-icons';

export const rottenTomatoesIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 fill-current text-red-600"><path d="M10.3 2.2c-.1-.3-.4-.5-.8-.5s-.7.2-.8.5L4 8.3c-.2.3-.2.7 0 1l4.9 6.3c.2.2.5.3.8.3s.6-.1.8-.3l4.9-6.3c.2-.3.2-.7 0-1L10.3 2.2Z"/><path d="m9.2 2.6 4.9 6.3c.2.3.2.7 0 1L9.2 16.2"/><path d="M4.4 8.8 9.2 2.6"/><path d="m15.6 8.8-4.9-6.3"/></svg>;
export const imdbIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 fill-current text-yellow-500"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;


const streamingServices: Record<string, React.ComponentType> = {
  'netflix': NetflixIcon,
  'hulu': HuluIcon,
  'amazon prime video': AmazonPrimeVideoIcon,
  'disney+': DisneyPlusIcon,
  'max': MaxIcon,
  'apple tv+': AppleTvIcon,
};

export const getStreamingIcon = (platform: string): React.ComponentType | null => {
  const lowerCasePlatform = platform.toLowerCase();
  for (const key in streamingServices) {
    if (lowerCasePlatform.includes(key)) {
      return streamingServices[key];
    }
  }
  return null;
};
