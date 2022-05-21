import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { SocketManagerProvider } from '@components/websocket/SocketManagerProvider';
import { ToastContainer } from 'react-toastify';

import '@styles/main.css';
import 'react-toastify/dist/ReactToastify.css';

export default function _App(props: AppProps) {
  const {Component, pageProps} = props;

  return (
    <RecoilRoot>
      <SocketManagerProvider>
        <Head>
          <title>Memory Cards</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
          <meta name="description" content="Memory cards game"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
          }}
        >
          <Component {...pageProps} />

          <ToastContainer
            newestOnTop
            theme="dark"
          />
        </MantineProvider>
      </SocketManagerProvider>
    </RecoilRoot>
  );
}
