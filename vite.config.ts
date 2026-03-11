import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

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
      {
        name: 'dev-api-beta-apply',
        configureServer(server: any) {
          server.middlewares.use('/api/beta-apply', (req: any, res: any, next: any) => {
            if (req.method !== 'POST') return next();

            let body = '';
            req.on('data', (chunk: any) => {
              body += chunk.toString();
            });
            
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const { name, email, profession, experience, organization, source, integrations, useCase } = data;

                if (!name || !email) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: "Name and email are required." }));
                  return;
                }

                const supabaseUrl = env.VITE_SUPABASE_URL || "";
                const supabaseKey = env.VITE_SUPABASE_ANON_KEY || "";
                const supabase = createClient(supabaseUrl, supabaseKey);

                const { error: dbError } = await supabase.from("beta_testers").insert({
                  name,
                  email,
                  profession,
                  experience,
                  organization,
                  referral_source: source,
                  requested_integrations: (integrations && Array.isArray(integrations) && integrations.length > 0) ? integrations : null,
                  use_case: useCase,
                });

                if (dbError) {
                  console.error("Supabase insert error locally:", dbError);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: "Database insert failed." }));
                  return;
                }

                const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: env.EMAIL_USER,
                    pass: env.EMAIL_APP_PASSWORD,
                  },
                  tls: {
                    rejectUnauthorized: false
                  }
                });

                const mailOptions = {
                  from: env.EMAIL_USER,
                  to: ["barnawalraj001@gmail.com", "soumyajit@varticas.com"],
                  subject: "New Varticas Beta User Application (Local Dev)",
                  text: `Name: ${name}\nEmail: ${email}\nProfession: ${profession || "N/A"}\nExperience: ${experience || "N/A"}\nOrganization: ${organization || "N/A"}\nReferral Source: ${source || "N/A"}\nRequested Integrations: ${integrations ? integrations.join(", ") : "N/A"}\nUse Case: ${useCase || "N/A"}`
                };

                await transporter.sendMail(mailOptions);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: "Application submitted successfully." }));
              } catch (error) {
                console.error("Error sending email locally:", error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: "Failed to submit application." }));
              }
            });
          });
        }
      }
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
