// Utils
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ApolloProvider } from "@apollo/client";
import { ErrorBoundary } from "react-error-boundary";

// Honeybadger
import Honeybadger from '@honeybadger-io/js'
import { HoneyBadgerConfig } from 'config/honeyBadgerConfig'

// Redux
import store from "redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import client from "config/apolloConfig";

// Import Swiper styles
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import ErrorFallback, { handleErrorHandler } from "components/shared/ErrorFallback";

Honeybadger.configure(HoneyBadgerConfig)

// Honeybadger.beforeNotify((notice) => {
//   if ((notice.message = 'ResizeObserver loop limit exceeded')) {
//     return false
//   }
// })

const getLibrary = (provider: any, connector: any): Web3Provider => {
  return new Web3Provider(provider);
};

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleErrorHandler}>
      <ApolloProvider client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </Web3ReactProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
