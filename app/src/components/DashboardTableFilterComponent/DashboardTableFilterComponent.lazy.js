import React, { lazy, Suspense } from 'react';

const LazyDashboardTableFilterComponent = lazy(() => import('./DashboardTableFilterComponent'));

const DashboardTableFilterComponent = props => (
  <Suspense fallback={null}>
    <LazyDashboardTableFilterComponent {...props} />
  </Suspense>
);

export default DashboardTableFilterComponent;
