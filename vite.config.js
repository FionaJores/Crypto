import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Check if we're in production (GitHub Pages)
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // or 'dist', based on your setup
  },
  base: isProduction ? '/Crypto_Place/' : '/', // Use '/' in development, '/Crypto_Place/' in production
});
