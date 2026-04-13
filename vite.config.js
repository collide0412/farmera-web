import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/farmera-web/', // Cần thiết để chạy đúng đường dẫn trên GitHub Pages
});
