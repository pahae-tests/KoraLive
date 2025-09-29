import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>KoraLive - {router.pathname === "/" ? "الرئيسية" : router.pathname.replace("/", "").split("?")[0]}</title>
        <meta name="description" content="KoraLive - شاهد المباريات مباشرة على الإنترنت بجودة عالية. موقع عربي لمتابعة كرة القدم مباشرة من أي مكان." />
        <meta name="keywords" content="كورة, مباريات, كرة القدم, مباشر, مشاهدة المباريات, الدوري المغربي, الدوري الإسباني, دوري أبطال أوروبا, كورة لايف, بث مباشر, كرة القدم العربية" />
        <meta name="author" content="Pahae" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.png" type="image/png" />

        <meta property="og:title" content="KoraLive - شاهد المباريات مباشرة على الإنترنت" />
        <meta property="og:description" content="تابع كرة القدم مباشرة على الإنترنت بجودة عالية. بث مباشر لجميع الدوريات والمباريات المهمة." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_MA" />
      </Head>

      {/* Adsterra Popunder */}
      <Script
        strategy="afterInteractive"
        src="//pl27749896.revenuecpmgate.com/4a/21/f3/4a21f35bc7f0c5f33723695f0185a7f8.js"
      />

      {/* Adsterra Social Bar */}
      <Script
        strategy="afterInteractive"
        src="//pl27749901.revenuecpmgate.com/5e/f4/aa/5ef4aa60d5d415dc97cef9e2a09de406.js"
      />

      {/* Adsterra Banner */}
      <Script strategy="afterInteractive">
        {`
          atOptions = {
            'key' : '3dfa7c9016a17fd3ec5de28788a19b0d',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `}
      </Script>
      <Script
        strategy="afterInteractive"
        src="//www.highperformanceformat.com/3dfa7c9016a17fd3ec5de28788a19b0d/invoke.js"
      />

      <Component {...pageProps} />
    </>
  );
}
