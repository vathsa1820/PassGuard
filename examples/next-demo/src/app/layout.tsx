import React from 'react';

export const metadata = {
  title: 'PassGuard Next.js Integration Demo',
  description: 'Next.js App Router integration example for PassGuard Password Security',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#0b0f19', color: '#f3f4f6', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
