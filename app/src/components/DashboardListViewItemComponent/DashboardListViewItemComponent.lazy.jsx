import React, { lazy, Suspense } from 'react';

const LazyDashboardListViewItemComponent = lazy(() => import('./DashboardListViewItemComponent'));

const DashboardListViewItemComponent = (props) => (
  <Suspense fallback={null}>
    <LazyDashboardListViewItemComponent {...props} />
  </Suspense>
);

export default DashboardListViewItemComponent;
