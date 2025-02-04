import React, { lazy, Suspense } from 'react';

const LazyAlertTableFilterComponent = lazy(() => import('./AlertTableFilterComponent'));

const AlertTableFilterComponent = props => (
  <Suspense fallback={null}>
    <LazyAlertTableFilterComponent {...props} />
  </Suspense>
);

export default AlertTableFilterComponent;
