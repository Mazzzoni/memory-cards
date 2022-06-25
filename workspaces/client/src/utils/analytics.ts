// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID as string, {
    page_path: url,
  });
};

export const emitEvent = (event: string) => {
  window.gtag('event', event);
};