import React, { lazy, Suspense } from 'react';

const LazyDashboardComponent = lazy(() => import('./DashboardComponent'));

const DashboardComponent = (props) => (
  <Suspense fallback={null}>
    <LazyDashboardComponent {...props} />
  </Suspense>
);

export default DashboardComponent;
