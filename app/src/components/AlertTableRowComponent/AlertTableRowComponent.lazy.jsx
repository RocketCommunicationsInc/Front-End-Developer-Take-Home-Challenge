import React, { lazy, Suspense } from 'react';

const LazyAlertTableRowComponent = lazy(() => import('./AlertTableRowComponent'));

const AlertTableRowComponent = (props) => (
  <Suspense fallback={null}>
    <LazyAlertTableRowComponent {...props} />
  </Suspense>
);

export default AlertTableRowComponent;
