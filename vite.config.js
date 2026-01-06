import { defineConfig } from 'vite';

export default defineConfig({
    base: '/emowords/',
    test: {
      environment: 'jsdom',
      globals: true
    }
});