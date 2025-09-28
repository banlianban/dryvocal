import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';
import Translate, {translate} from '@docusaurus/Translate';

export default function Root({children}) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    // Google Analytics (gtag.js)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YTLK0654HR');
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YTLK0654HR';
    document.head.appendChild(script);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DryVocal',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows',
    description: translate({
      id: 'root.jsonld.description',
      message: 'DryVocal: Professional vocal extraction, dialogue cleanup, speaker separation, and noise reduction. Supports local processing and Windows portable download.',
      description: 'JSON-LD description for software application',
    }),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
      url: 'https://dryvocal.com',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Head>
        {/* Favicon links for different sizes */}
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/img/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/img/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/img/favicon-128x128.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/img/favicon-256x256.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon-256x256.png" />
        
        <meta
          name="description"
          content={translate({
            id: 'root.meta.description',
            message: 'DryVocal: Professional vocal extraction, dialogue cleanup, speaker separation, and noise reduction. Supports local processing and Windows portable download.',
            description: 'Root meta description',
          })}
        />
        <meta
          name="keywords"
          content={translate({
            id: 'root.meta.keywords',
            message: 'DryVocal, vocal extraction, dialogue cleanup, speaker separation, voice separation, noise reduction, Windows portable, AI audio processing',
            description: 'Root meta keywords',
          })}
        />
        <meta property="og:title" content={translate({
          id: 'root.og.title',
          message: 'DryVocal | Vocal Extraction · Dialogue Cleanup · Separation & Noise Reduction',
          description: 'Root OpenGraph title',
        })} />
        <meta
          property="og:description"
          content={translate({
            id: 'root.og.description',
            message: 'Professional vocal extraction, dialogue cleanup, speaker separation, and noise reduction.',
            description: 'Root OpenGraph description',
          })}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dryvocal.com" />
        <meta property="og:image" content="https://dryvocal.com/img/docusaurus-social-card.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={translate({
          id: 'root.twitter.title',
          message: 'DryVocal | Vocal Extraction · Dialogue Cleanup · Separation & Noise Reduction',
          description: 'Root Twitter title',
        })} />
        <meta
          name="twitter:description"
          content={translate({
            id: 'root.twitter.description',
            message: 'Professional vocal extraction, dialogue cleanup, speaker separation, and noise reduction.',
            description: 'Root Twitter description',
          })}
        />
        <meta name="twitter:image" content="https://dryvocal.com/img/docusaurus-social-card.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      {children}
    </>
  );
}


