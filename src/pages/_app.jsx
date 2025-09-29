import React, { useEffect, useState } from 'react'
import styles from '../styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
      
      <Component {...pageProps} />
    </>
  );
}