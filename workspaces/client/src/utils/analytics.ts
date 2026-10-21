export const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
export const plausibleUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_URL?.trim().replace(/\/+$/, '');
export const analyticsEnabled = Boolean(plausibleDomain && plausibleUrl);

type EventOptions = {
  props?: Record<string, string | number | boolean>;
};

type Plausible = {
  (name: string, options?: EventOptions): void;
  q?: [string, EventOptions?][];
};

declare global {
  interface Window {
    plausible?: Plausible;
  }
}

export const trackEvent = (name: string, props?: EventOptions['props']) => {
  if (!analyticsEnabled || typeof window === 'undefined') {
    return;
  }

  // The tracking script drains this queue if an action happens before it loads.
  if (!window.plausible) {
    const queuedPlausible: Plausible = (eventName, options) => {
      (queuedPlausible.q = queuedPlausible.q || []).push([eventName, options]);
    };
    window.plausible = queuedPlausible;
  }

  window.plausible(name, props ? { props } : undefined);
};
