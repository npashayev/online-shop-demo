import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      components: path.resolve(__dirname, 'src', 'components'),
      pages: path.resolve(__dirname, 'src', 'components', 'pages'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      store: path.resolve(__dirname, 'src', 'store'),
      services: path.resolve(__dirname, 'src', 'services'),
      contexts: path.resolve(__dirname, 'src', 'contexts'),
      styles: path.resolve(__dirname, 'src', 'styles'),
    },
  },
});
