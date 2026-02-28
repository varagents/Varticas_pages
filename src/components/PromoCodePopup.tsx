import { useEffect, useState, type FormEvent } from "react";
import { X, Sparkles, Ticket } from "lucide-react";

interface PromoCodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void | Promise<void>;
}

export default function PromoCodePopup({ isOpen, onClose, onSubmit }: PromoCodePopupProps) {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCode("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(code.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scaleIn 0.3s ease-out" }}
      >
        <div
          className="p-[1px] rounded-2xl"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #FF9E5E 0%, #FF6B47 25%, #FF3B30 50%, #FF6B47 75%, #FF9E5E 100%)",
            backgroundSize: "300% 300%",
            animation: "gradient-shift 4s ease infinite",
          }}
        >
          <div className="relative bg-[#0F1012] rounded-2xl p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="Close access code popup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B47]/20 to-[#FF3B30]/20 border border-[#FF6B47]/20 flex items-center justify-center">
                <Ticket className="w-7 h-7 text-[#FF6B47]" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-2">Enter Access Code</h2>
            <p className="text-gray-400 text-center text-sm mb-8">
              Have an access code? Enter it below to unlock your experience.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. VARTICAS2026"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-lg tracking-widest font-mono focus:outline-none focus:border-[#FF6B47]/50 focus:bg-white/[0.07] transition-all"
                  autoFocus
                  disabled={isSubmitting}
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#FF6B47] transition-colors" />
              </div>

              <button
                type="submit"
                disabled={!code.trim() || isSubmitting}
                className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-[#FF6B47] to-[#FF3B30] hover:from-[#FF7B57] hover:to-[#FF4B40] text-white shadow-[0_0_30px_rgba(255,59,48,0.3)] hover:shadow-[0_0_40px_rgba(255,59,48,0.5)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
