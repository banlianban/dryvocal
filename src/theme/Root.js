import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';

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
    description:
      'DryVocal：专业干声提取、影视对白净化、人物语音分离与智能降噪，支持本地处理与Windows绿色版下载。',
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
          content="DryVocal：专业干声提取、影视对白净化、人物语音分离与智能降噪，支持本地处理与Windows绿色版下载。"
        />
        <meta
          name="keywords"
          content="DryVocal, 干声提取, 影视对白净化, 多说话人分离, 人声分离, 音频降噪, Windows 绿色版, AI 音频处理"
        />
        <meta property="og:title" content="DryVocal | 干声提取 · 对白净化 · 分离与降噪" />
        <meta
          property="og:description"
          content="专业级干声提取，影视对白净化，多说话人分离与智能降噪。"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dryvocal.com" />
        <meta property="og:image" content="https://dryvocal.com/img/docusaurus-social-card.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DryVocal | 干声提取 · 对白净化 · 分离与降噪" />
        <meta
          name="twitter:description"
          content="专业级干声提取，影视对白净化，多说话人分离与智能降噪。"
        />
        <meta name="twitter:image" content="https://dryvocal.com/img/docusaurus-social-card.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      {children}
    </>
  );
}


