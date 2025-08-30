import React, { Suspense } from 'react';
import { ComponentSkeleton } from './LazyLoader';

const LazyLoaded = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<ComponentSkeleton />}>
    {children}
  </Suspense>
);

export default LazyLoaded;
