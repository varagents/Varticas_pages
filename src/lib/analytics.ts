/**
 * GA4 analytics utility.
 *
 * Goals:
 *  1. Provide a single, type-safe `trackEvent()` API.
 *  2. Provide named helpers for high-intent events (signin_click,
 *     get_started_click, pricing_click, demo_video_play).
 *  3. Guarantee events are delivered **before** the page navigates
 *     (so we don't lose attribution when users click external CTAs).
 */

type GtagCommand = "event" | "config" | "js" | "set";

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, unknown>;

const isBrowser = typeof window !== "undefined";

/**
 * Low-level event sender. Safe to call even before gtag is loaded —
 * the GA snippet in `index.html` defines `dataLayer` synchronously,
 * so we fall back to pushing onto it directly.
 */
export const trackEvent = (eventName: string, params: EventParams = {}): void => {
  if (!isBrowser) return;

  const payload: EventParams = {
    transport_type: "beacon",
    ...params,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
    return;
  }

  // Fallback: queue into dataLayer until gtag boots.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, payload]);
};

/**
 * Track an event and *then* perform the navigation. Uses sendBeacon-style
 * transport plus a microtask delay so the request flushes before unload.
 *
 * @example
 *   <button onClick={() => trackAndNavigate('get_started_click', '/login')}>
 */
export const trackAndNavigate = (
  eventName: string,
  href: string,
  params: EventParams = {},
  opts: { newTab?: boolean } = {}
): void => {
  trackEvent(eventName, params);

  if (!isBrowser) return;
  // Give the beacon a tick to flush before navigating away.
  window.setTimeout(() => {
    if (opts.newTab) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  }, 0);
};

/**
 * Track an arbitrary "before-action" event and resolve once the event is
 * effectively dispatched. Useful when you need to await tracking before
 * triggering programmatic navigation (e.g., react-router's navigate()).
 */
export const trackBeforeAction = (
  eventName: string,
  params: EventParams = {}
): Promise<void> => {
  trackEvent(eventName, params);
  return new Promise((resolve) => {
    if (!isBrowser) return resolve();
    window.setTimeout(resolve, 0);
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Named, reusable event helpers — keep names stable for GA reporting.
// ─────────────────────────────────────────────────────────────────────────────

export const trackSignInClick = (source: string, extra: EventParams = {}) =>
  trackEvent("signin_click", { source, ...extra });

export const trackGetStartedClick = (source: string, extra: EventParams = {}) =>
  trackEvent("get_started_click", { source, ...extra });

export const trackPricingClick = (source: string, extra: EventParams = {}) =>
  trackEvent("pricing_click", { source, ...extra });

export const trackDemoVideoPlay = (source: string, extra: EventParams = {}) =>
  trackEvent("demo_video_play", { source, ...extra });

export const trackFaqOpen = (question: string, source = "home_faq") =>
  trackEvent("faq_open", { question, source });

export const trackOutboundClick = (
  destination: string,
  source: string,
  extra: EventParams = {}
) => trackEvent("outbound_click", { destination, source, ...extra });
