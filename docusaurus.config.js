// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DryVocal',
  tagline: '专业干声提取 · 影视对白净化 · 单人语音分离',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dryvocal.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DryVocal', // Usually your GitHub org/user name.
  projectName: 'dryvocal-site', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          filename: 'sitemap.xml',
          ignorePatterns: ['/tags/**'],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      metadata: [
        {name: 'keywords', content: 'DryVocal, 干声提取, 影视对白净化, 多说话人分离, 人声分离, 音频降噪, Windows 绿色版, AI 音频处理'},
        {name: 'description', content: 'DryVocal：专业干声提取、影视对白净化、人物语音分离与智能降噪，支持本地处理与Windows绿色版下载。'},
        {property: 'og:title', content: 'DryVocal | 干声提取 · 对白净化 · 分离与降噪'},
        {property: 'og:description', content: '专业级干声提取，影视对白净化，多说话人分离与智能降噪。'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://dryvocal.com'},
        {property: 'og:image', content: 'https://dryvocal.com/img/docusaurus-social-card.jpg'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:title', content: 'DryVocal | 干声提取 · 对白净化 · 分离与降噪'},
        {name: 'twitter:description', content: '专业级干声提取，影视对白净化，多说话人分离与智能降噪。'},
        {name: 'twitter:image', content: 'https://dryvocal.com/img/docusaurus-social-card.jpg'},
      ],
      navbar: {
        title: 'DryVocal',
        logo: {
          alt: 'DryVocal Logo',
          src: 'img/logo.png',
        },
        items: [
          {to: '/features', label: '功能', position: 'left'},
          {to: '/cases', label: '案例', position: 'left'},
          {to: '/faq', label: 'FAQ', position: 'left'},
          {
            href: 'https://dryvocal.com',
            label: '官网',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `联系我们：support@dryvocal.com`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
