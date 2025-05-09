import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   base: "./",
//   server: {
//     hmr: true,
//     watch: {
//       usePolling: true,
//     },
//     strictPort: true,
//   },
// });


export default defineConfig({
  plugins: [react()],     
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ Import alias
    },
  },
  base: "./",
  server: {
    hmr: true,
    watch: {
      usePolling: true, // ✅ Ensures Vite detects file changes
    },
    strictPort: true, // ✅ Ensures server restarts properly
  },
});


// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://auth.privy.io",
//         changeOrigin: true,
//         secure: false, // Sometimes needed for HTTPS
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
