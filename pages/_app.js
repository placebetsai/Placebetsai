// pages/_app.js
import Script from "next/script";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7215975042937417"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
