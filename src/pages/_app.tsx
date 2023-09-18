import type { AppProps } from "next/app";

import "@/styles/index.scss";
import AppProvider from "@/lib/SiteContext";

export default function App({ Component, pageProps }: AppProps) {
   return (
      <AppProvider>
         <Component {...pageProps} />
      </AppProvider>
   );
}
