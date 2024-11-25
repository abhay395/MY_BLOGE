import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with '/auth' to your backend server
      '/auth': {
        target: 'https://server-for-mybloge-git-main-abhay395s-projects.vercel.app', // Backend server URL
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: false, // Disable SSL verification (useful for self-signed certificates)
        rewrite: (path) => path.replace(/^\/auth/, ''), // Optional: Rewrite path if needed
      },
    },
  },
});
