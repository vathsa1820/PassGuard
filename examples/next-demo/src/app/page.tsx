import React from 'react';
import SignupForm from './SignupForm';

export default function Page() {
  return (
    <main style={{ minHeight: '100vh', padding: '40px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', color: '#ffffff' }}>
          PassGuard + Next.js Integration
        </h1>
        <p style={{ color: '#9ca3af', margin: 0 }}>
          Demonstrating client component boundary handling in Next.js App Router
        </p>
      </header>

      <SignupForm />
    </main>
  );
}
