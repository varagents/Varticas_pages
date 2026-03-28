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
  };
});
