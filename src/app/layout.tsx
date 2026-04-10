import './globals.css';

import type { Metadata } from 'next';

import AppBar from '@components/app-bar';
import AppClassificationBanner from '@components/app-classification-banner';

import StoreProvider from './store-provider';

export const metadata: Metadata = {
  title: 'GRM Dashboard | Alerts Panel Demo',
  description: 'Ground Resources Management Web Application',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <AppClassificationBanner />
          <AppBar />
          <div id="root">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}
