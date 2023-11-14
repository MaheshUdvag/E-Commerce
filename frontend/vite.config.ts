import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const config = {
        base: '/',
        plugins: [react()],
        server: {
          proxy: {
            '/api': {
              target: process.env.VITE_API_HOST,
              changeOrigin: true,
            },
          },
        },
      }

    return defineConfig(config);
};