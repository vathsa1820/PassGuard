import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@vatza/passguard/style.css': path.resolve(__dirname, '../../client/dist/style.css'),
      '@vatza/passguard': path.resolve(__dirname, '../../client/src/index.ts'),
    },
  },
});
