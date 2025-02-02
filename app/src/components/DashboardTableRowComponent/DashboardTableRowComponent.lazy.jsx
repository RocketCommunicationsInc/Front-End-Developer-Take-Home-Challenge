import React, { lazy, Suspense } from 'react';

const LazyDashboardTableRowComponent = lazy(() => import('./DashboardTableRowComponent'));

const DashboardTableRowComponent = (props) => (
  <Suspense fallback={null}>
    <LazyDashboardTableRowComponent {...props} />
  </Suspense>
);

export default DashboardTableRowComponent;
