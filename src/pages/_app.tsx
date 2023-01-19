import React from 'react';
import type { AppProps } from 'next/app';
import { canUseDom } from '../utilities/canUseDom';
import { globalStyles } from '../styles';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const styles = globalStyles();

  // Remove react-jss false warning
  if (canUseDom) {
    const originalWarn = console.warn;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.warn = (...args: any) => {
      if (
        args[0]
        !== 'Warning: [JSS] Rule is not linked. Missing sheet option "link: true".'
      ) {
        originalWarn(...args);
      }
    };
  }

  return (
    <div className={styles.app}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
