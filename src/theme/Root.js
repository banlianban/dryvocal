import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';

export default function Root({children}) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window._hmt = window._hmt || [];
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?027707e36c7032f97e41b32c9ff8d6f2';
    const s = document.getElementsByTagName('script')[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(hm, s);
    } else {
      document.head.appendChild(hm);
    }
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


