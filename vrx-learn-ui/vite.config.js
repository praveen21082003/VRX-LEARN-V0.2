import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },

    }),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  server: {
    allowedHosts: ["tequila-unwrenched-joane.ngrok-free.dev","convolutional-celibatic-shu.ngrok-free.dev", "e610-2406-7400-bb-c33f-65a3-4b98-7bca-998d.ngrok-free.app", "https://e610-2406-7400-bb-c33f-65a3-4b98-7bca-998d.ngrok-free.app"],
    port: 5173,
    open: true,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

})
