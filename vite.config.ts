
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Muat env variables berdasarkan mode (development/production)
  // Fix: Cast process to any to access cwd() since it might not be recognized by the current TypeScript environment types
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Pastikan process.env.API_KEY tersedia di browser sesuai permintaan SDK Gemini
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
