import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';
import LanguageDetector from '@site/src/components/LanguageDetector';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const downloadLinks = siteConfig?.customFields?.downloadLinks || {};
  const currentLocale = i18n?.currentLocale || 'en';
  const currentDownload = downloadLinks[currentLocale] || downloadLinks['en'] || {
    url: 'https://drive.google.com/file/d/1pTm3gN38GfyaJP0LHHYzDBSyD0FrEBx1/view?usp=drive_link',
    text: 'Download Windows Portable',
  };
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="home.title" description="Homepage title">
            DryVocal
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="home.tagline" description="Homepage tagline">
            专业干声提取 · 影视对白净化 · 单人语音分离
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            href={currentDownload.url}
            target="_blank"
            rel="noopener noreferrer">
            {currentDownload.text}
          </Link>
          {/* 移除多余按钮，避免右侧空白热区 */}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
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
    <Layout title={seo.title} description={seo.description}>
      <LanguageDetector />
      <Head>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
