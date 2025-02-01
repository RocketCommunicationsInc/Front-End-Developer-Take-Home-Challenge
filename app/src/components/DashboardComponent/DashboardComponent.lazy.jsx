import React, { lazy, Suspense } from 'react';

const LazyDashboardComponent = lazy(() => import('./DashboardComponent'));

const DashboardComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDashboardComponent {...props} />
  </Suspense>
);

export default DashboardComponent;
