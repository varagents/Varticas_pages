import { Play, Command, Sparkles } from "lucide-react";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfGPktKklvIE6gO0_Ln4YE3DJiJVPfEmmDUDI6dRlowr4YuQw/viewform";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 bg-[#07080A]">

      {/* Aurora/Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FF3B30] rounded-full blur-[150px] opacity-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-[#FF6B47] rounded-full blur-[120px] opacity-25 animate-[pulse_6s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-[#FF4D45] rounded-full blur-[180px] opacity-20 animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-[#FF9E5E] rounded-full blur-[100px] opacity-15 animate-[pulse_7s_ease-in-out_infinite_0.5s]" />

        {/* RODS with Disappear/Shine Animation */}
        <div className="absolute inset-0" style={{ transform: 'rotate(25deg)' }}>
          <div className="absolute top-[5%] left-[-20%] w-[140%] h-[3px] bg-gradient-to-r from-transparent via-[#FF9E5E] to-transparent rounded-full animate-[glow_6s_ease-in-out_infinite]" />
          <div className="absolute top-[18%] left-[-20%] w-[140%] h-[4px] bg-gradient-to-r from-transparent via-[#FF6B47] to-transparent rounded-full animate-[glow_8s_ease-in-out_infinite_1s]" />
          <div className="absolute top-[32%] left-[-20%] w-[140%] h-[3px] bg-gradient-to-r from-transparent via-[#FF9E5E] to-transparent rounded-full animate-[glow_7s_ease-in-out_infinite_2s]" />
          <div className="absolute top-[48%] left-[-20%] w-[140%] h-[3px] bg-gradient-to-r from-transparent via-[#FF6B47] to-transparent rounded-full animate-[glow_9s_ease-in-out_infinite_0.5s]" />
          <div className="absolute top-[62%] left-[-20%] w-[140%] h-[4px] bg-gradient-to-r from-transparent via-[#FF9E5E] to-transparent rounded-full animate-[glow_6.5s_ease-in-out_infinite_3s]" />
          <div className="absolute top-[78%] left-[-20%] w-[140%] h-[3px] bg-gradient-to-r from-transparent via-[#FF6B47] to-transparent rounded-full animate-[glow_8.5s_ease-in-out_infinite_1.5s]" />
          <div className="absolute top-[92%] left-[-20%] w-[140%] h-[3px] bg-gradient-to-r from-transparent via-[#FF9E5E] to-transparent rounded-full animate-[glow_7.5s_ease-in-out_infinite_4s]" />
        </div>

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Grain Texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#07080A_70%)]" />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0; filter: blur(2px); }
          50% { opacity: 0.6; filter: blur(0px); }
        }
        @keyframes border-shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-4 text-center">

        {/* Beta Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 backdrop-blur-md mb-8 animate-fade-in-up hover:bg-brand-red/20 transition-colors cursor-pointer group">
          <Sparkles className="w-3.5 h-3.5 text-brand-red" />
          <span className="text-sm font-semibold text-brand-red">Beta Coming Soon</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-8 animate-fade-in-up [animation-delay:200ms]">
          LLM Thinks<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">Varticas Executes</span>
        </h1>

        <div className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 animate-fade-in-up [animation-delay:400ms] font-light leading-relaxed">
          <p>
            An autonomous agent that researches, navigates, and executes.
          </p>
          <p>
            Combined with an <strong className="text-white font-semibold">MCP-powered workflow engine</strong>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-6 animate-fade-in-up [animation-delay:600ms]">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#E6E6E6] hover:bg-white text-[#2F3031] rounded-lg font-bold text-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-3"
            >
              Download for Chrome
            </a>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#E6E6E6] hover:bg-white text-[#2F3031] rounded-lg font-bold text-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-3"
            >
              Download for Mac
            </a>
          </div>

          {/* Watch Video Button - Transparent with Animated Border */}
          <button
            className="relative px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium text-lg transition-all flex items-center gap-2 overflow-hidden group"
            style={{
              border: '1px solid transparent',
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)), linear-gradient(90deg, transparent 0%, transparent 30%, #FF9E5E 45%, #FF6B47 50%, #FF9E5E 55%, transparent 70%, transparent 100%)`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              backgroundSize: '100% 100%, 300% 100%',
              animation: 'border-shine 4s linear infinite'
            }}
          >
            <Play className="w-5 h-5 fill-current" />
            Watch video
          </button>
        </div>
      </div>

      {/* Floating Window Mockup with Video */}
      <div className="relative w-full max-w-6xl mt-24 px-4 animate-fade-in-up [animation-delay:800ms] perspective-1000">
        <div className="relative rounded-2xl border border-white/10 bg-[#0F1012] shadow-2xl overflow-hidden aspect-[16/9] transform hover:rotate-x-1 transition-transform duration-700 ease-out group">

          {/* Window Controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>

          {/* Input Bar */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl z-20">
            <div className="h-16 bg-[#1A1B1E]/90 backdrop-blur-sm rounded-xl border border-white/5 shadow-2xl flex items-center px-6 gap-4">
              <Command className="w-6 h-6 text-gray-500" />
              <div className="h-6 w-[2px] bg-brand-red animate-pulse" />
              <span className="text-xl text-gray-400 font-light">Research competitor pricing...</span>
              <div className="ml-auto flex gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-500 font-mono">AI Agent</span>
              </div>
            </div>
          </div>

          {/* Video Player - Local video file */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/demo.mp4"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-[#07080A]/50 pointer-events-none z-10" />
        </div>

        {/* Glow effect */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-brand-red/15 blur-[100px] -z-10 rounded-full" />
      </div>
    </div>
  );
}
