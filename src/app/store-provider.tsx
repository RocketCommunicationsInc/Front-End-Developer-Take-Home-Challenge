'use client';
import { useState } from 'react';
import { Provider } from 'react-redux';

import { makeStore } from '@store/index';

interface Props {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: Readonly<Props>) {
  const [store] = useState(() => makeStore());
  return <Provider store={store}>{children}</Provider>;
}
