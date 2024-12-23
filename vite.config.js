import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Ensures the output is placed in the 'dist' folder
  },
  base: '/Crypto_Place/', // Correct base URL for GitHub Pages
});
