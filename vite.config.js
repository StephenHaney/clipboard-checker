import react from '@vitejs/plugin-react';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: true,
    target: 'es2022',
  },
  esbuild: {
    target: 'es2022',
    treeShaking: true,
  },
};
