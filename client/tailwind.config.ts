import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        passguard: {
          weak: '#ef4444',
          fair: '#f59e0b',
          good: '#3b82f6',
          strong: '#10b981',
        },
      },
    },
  },
  plugins: [],
};

export default config;
