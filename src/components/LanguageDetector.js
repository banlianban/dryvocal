import { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// 语言映射表：浏览器语言代码 -> Docusaurus语言代码
const languageMap = {
  'zh': 'zh-Hans',
  'zh-CN': 'zh-Hans',
  'zh-TW': 'zh-Hans',
  'zh-HK': 'zh-Hans',
  'zh-SG': 'zh-Hans',
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-CA': 'en',
  'en-AU': 'en',
  'ja': 'ja',
  'ja-JP': 'ja',
  'ko': 'ko',
  'ko-KR': 'ko',
};

// 获取浏览器语言
function getBrowserLanguage() {
  if (typeof navigator === 'undefined') return null;
  
  // 获取浏览器语言列表
  const languages = navigator.languages || [navigator.language];
  
  for (const lang of languages) {
    // 尝试完整匹配
    if (languageMap[lang]) {
      return languageMap[lang];
    }
    
    // 尝试语言代码匹配（如 zh-CN -> zh）
    const langCode = lang.split('-')[0];
    if (languageMap[langCode]) {
      return languageMap[langCode];
    }
  }
  
  return null;
}

export default function LanguageDetector() {
  const { i18n } = useDocusaurusContext();
  
  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return;
    
    // 检查是否已经重定向过（避免无限重定向）
    const hasRedirected = sessionStorage.getItem('language-redirected');
    if (hasRedirected) return;
    
    const browserLang = getBrowserLanguage();
    const currentLocale = i18n.currentLocale;
    const currentPath = window.location.pathname;
    
    // 如果浏览器语言是英文，且当前不是英文，则重定向到英文
    if (browserLang === 'en' && currentLocale !== 'en') {
      sessionStorage.setItem('language-redirected', 'true');
      window.location.href = `/en${currentPath}`;
      return;
    }
    
    // 如果浏览器语言是日文，且当前不是日文，则重定向到日文
    if (browserLang === 'ja' && currentLocale !== 'ja') {
      sessionStorage.setItem('language-redirected', 'true');
      window.location.href = `/ja${currentPath}`;
      return;
    }
    
    // 如果浏览器语言是韩文，且当前不是韩文，则重定向到韩文
    if (browserLang === 'ko' && currentLocale !== 'ko') {
      sessionStorage.setItem('language-redirected', 'true');
      window.location.href = `/ko${currentPath}`;
      return;
    }
    
    // 如果浏览器语言是中文，且当前不是中文，则重定向到中文
    if (browserLang === 'zh-Hans' && currentLocale !== 'zh-Hans') {
      sessionStorage.setItem('language-redirected', 'true');
      window.location.href = currentPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
      return;
    }
    
    // 如果浏览器语言不在支持列表中，且当前不是英文，则重定向到英文
    if (!browserLang && currentLocale !== 'en') {
      sessionStorage.setItem('language-redirected', 'true');
      window.location.href = `/en${currentPath}`;
      return;
    }
    
  }, [i18n]);
  
  return null; // 这个组件不渲染任何内容
}
