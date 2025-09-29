import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({children}) {
  const {i18n} = useDocusaurusContext();
  const locale = i18n?.currentLocale || 'en';

  const seoByLocale = {
    en: {
      title: 'DryVocal | Vocal Extraction, Dialogue Cleanup, Separation & Denoise',
      description:
        'DryVocal: Pro-grade vocal extraction, dialogue cleanup, speaker separation, and AI denoise for Windows.',
      keywords:
        'DryVocal, vocal extraction, dialogue cleanup, speaker separation, vocal separation, audio denoise, Windows portable, AI audio',
    },
    zh: {
      title: 'DryVocal | 干声提取 · 对白净化 · 分离与降噪',
      description:
        'DryVocal：专业级干声提取、影视对白净化、人物语音分离与智能降噪，支持Windows。',
      keywords:
        'DryVocal, 干声提取, 影视对白净化, 多说话人分离, 人声分离, 音频降噪, Windows 绿色版, AI 音频处理',
    },
    ja: {
      title: 'DryVocal | ボーカル抽出・台詞クリーンアップ・分離・ノイズ低減',
      description:
        'DryVocal：プロレベルのボーカル抽出、台詞クリーンアップ、話者分離、AIノイズ低減（Windows対応）。',
      keywords:
        'DryVocal, ボーカル抽出, 台詞クリーンアップ, 話者分離, ボーカル分離, ノイズ低減, Windows, AI オーディオ',
    },
    ko: {
      title: 'DryVocal | 보컬 추출 · 대사 정리 · 분리 및 노이즈 제거',
      description:
        'DryVocal: 전문가급 보컬 추출, 대사 정리, 화자 분리 및 AI 노이즈 제거(Windows 지원).',
      keywords:
        'DryVocal, 보컬 추출, 대사 정리, 화자 분리, 보컬 분리, 오디오 노이즈 제거, Windows, AI 오디오',
    },
  };

  const seo = seoByLocale[locale] || seoByLocale.en;

  return (
    <>
      <Head>
        <title>{seo.title} | DryVocal</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Head>
      {children}
    </>
  );
}

 
