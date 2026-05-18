import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const codeServiceProxyTarget =
    env.VITE_CODE_SERVICE_PROXY_TARGET || "https://codeservice.varticas.com";

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/codeservice": {
          target: codeServiceProxyTarget,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/codeservice/, ""),
        configure: (proxy) => {
          proxy.on("error", (err, _req, _res) => {
            console.error("[vite-proxy:/codeservice] upstream error:", err.message);
          });
          proxy.on("proxyReq", (_proxyReq, req) => {
            console.log(
              `[vite-proxy:/codeservice] ${req.method} ${req.url} -> ${codeServiceProxyTarget}`
            );
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              `[vite-proxy:/codeservice] ${req.method} ${req.url} <- ${proxyRes.statusCode}`
            );
          });
        },
      },
      },
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "es2020",
      cssCodeSplit: true,
      sourcemap: false,
      // Raise warning ceiling slightly — main chunk is well-split below
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          // Split heavy vendor libraries into long-lived cached chunks.
          // Drastically improves TTI / LCP after the first visit and is
          // friendlier to Lighthouse performance scoring.
          manualChunks: (id: string) => {
            if (!id.includes("node_modules")) return undefined;
            // Heavy, route-specific deps split out for long-lived caching
            if (id.includes("@supabase")) return "vendor-supabase";
            if (id.includes("three") || id.includes("@react-three"))
              return "vendor-three";
            if (id.includes("recharts")) return "vendor-charts";
            if (
              id.includes("framer-motion") ||
              id.includes("node_modules/motion/") ||
              id.includes("gsap") ||
              id.includes("lenis")
            )
              return "vendor-motion";
            if (
              id.includes("@radix-ui") ||
              id.includes("lucide-react") ||
              id.includes("cmdk") ||
              id.includes("vaul")
            )
              return "vendor-ui";
            // Leave react / react-dom / react-router / shared utils in the
            // default vendor chunk to avoid circular-chunk issues.
            return undefined;
          },
        },
      },
    },
  };
});
