import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

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
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        id: 'home.meta.title',
        message: 'DryVocal | 干声提取与对白净化',
        description: 'Homepage meta title',
      })}
      description={translate({
        id: 'home.meta.description',
        message: 'DryVocal：专业级干声提取、影视对白净化、人物语音分离与降噪',
        description: 'Homepage meta description',
      })}
    >
      <Head>
        <meta
          name="keywords"
          content={translate({
            id: 'home.meta.keywords',
            message: 'DryVocal, 干声提取, 影视对白净化, 多说话人分离, 人声分离, 音频降噪, Windows 绿色版, AI 音频处理',
            description: 'Homepage meta keywords',
          })}
        />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
