import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1024,
    viewportHeight: 768,
    video: false
  },
  component: {
    viewportWidth: 1024,
    viewportHeight: 768,
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
});
