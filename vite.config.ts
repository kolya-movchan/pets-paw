import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgrPlugin()],
  base: "/pets-paw",

  build: {
    sourcemap: true,
    outDir: 'build',
  },
});
