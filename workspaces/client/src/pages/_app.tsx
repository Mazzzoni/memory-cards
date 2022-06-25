import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { SocketManagerProvider } from '@components/websocket/SocketManagerProvider';
import { NotificationsProvider } from '@mantine/notifications';
import { pageView } from '@utils/analytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import '@styles/main.css';
import 'react-toastify/dist/ReactToastify.css';

export default function _App(props: AppProps) {
  const {Component, pageProps} = props;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => pageView(url);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <RecoilRoot>
      <Head>
        <title>Memory Cards</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <meta name="description" content="Memory cards game"/>
        <link rel="icon" href="/cards.svg"/>
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
                      
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{
          key: 'mantine',
          prepend: false,
        }}
        theme={{
          colorScheme: 'dark',
          radius: {
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
          },
        }}
      >
        <NotificationsProvider
          position="top-right"
          limit={15}
        >
          <SocketManagerProvider>
            <Component {...pageProps} />
          </SocketManagerProvider>
        </NotificationsProvider>
      </MantineProvider>
    </RecoilRoot>
  );
}
