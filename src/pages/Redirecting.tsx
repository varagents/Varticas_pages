import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirectToProductWithSession } from "@/lib/codeService";
import { toast } from "sonner";

export default function Redirecting() {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Preparing your experience");

  useEffect(() => {
    let isActive = true;

    // Cycle through messages for a more dynamic feel
    const messages = ["Setting up workspace", "Verifying access", "Finalizing details"];
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      setLoadingText(messages[msgIndex]);
    }, 2500);

    const runRedirect = async () => {
      try {
        // Kept the delay and redirect logic exactly as requested
        await new Promise((resolve) => setTimeout(resolve, 3500));
        if (!isActive) return;
        await redirectToProductWithSession();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to continue.";
        toast.error(message);
        navigate("/login", { replace: true });
      }
    };

    runRedirect();

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#F4F7FA]">
      {/* Immersive background inspired by your screenshot */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#FFFFFF_0%,#E2E8F0_100%)] opacity-70" />
        
        {/* Subtle ambient 3D shape (Diamond from screenshot) */}
        <div className="absolute left-[15%] top-[25%] h-32 w-32 rounded-[2rem] bg-white shadow-[20px_20px_60px_rgba(0,0,0,0.03),-10px_-10px_40px_rgba(255,255,255,0.8)] [transform:rotateX(45deg)_rotateZ(45deg)] animate-soft-float" />
        
        {/* Soft light diffusion */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-100/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-12 flex flex-col items-center">
          <div className="relative mb-6">
            <img 
              src="/vartics.svg" 
              alt="Varticas logo" 
              className="h-16 w-auto object-contain drop-shadow-2xl" 
            />
            {/* Subtle pulse behind logo */}
            <div className="absolute inset-0 -z-10 bg-black/5 blur-xl rounded-full scale-125 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1F2B] font-sans sm:text-3xl">
            Varticas
          </h1>
        </div>

        {/* Modern Wave Loader */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-end gap-1.5 h-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-[#1A1F2B]"
                style={{
                  height: '100%',
                  animation: `modernWave 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest animate-pulse">
            {loadingText}
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
        Enterprise Cloud Infrastructure
      </div>

      <style>{`
        @keyframes modernWave {
          0%, 100% { height: 8px; opacity: 0.2; }
          50% { height: 32px; opacity: 1; }
        }
        @keyframes soft-float {
          0%, 100% { transform: rotateX(45deg) rotateZ(45deg) translateY(0); }
          50% { transform: rotateX(45deg) rotateZ(45deg) translateY(-20px); }
        }
        .font-sans {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
      `}</style>
    </div>
  );
}