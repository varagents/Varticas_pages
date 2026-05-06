type GtagCommand = "event" | "config" | "js" | "set";

declare global {
  interface Window {
    gtag?: (command: GtagCommand, targetIdOrEventName: string, params?: Record<string, unknown>) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  window.gtag?.("event", eventName, params);
};

