import React, { lazy, Suspense } from 'react';

const LazyAlertDetailsModalComponent = lazy(() => import('./AlertDetailsModalComponent'));

const AlertDetailsModalComponent = (props) => (
  <Suspense fallback={null}>
    <LazyAlertDetailsModalComponent {...props} />
  </Suspense>
);

export default AlertDetailsModalComponent;
