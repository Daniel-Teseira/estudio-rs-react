import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Data from '../json/Data.json';
import serviceSlug from '../utils/serviceSlug';

const setMetaContent = (selector, content) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [attribute, value] = selector.match(/\[(name|property)="([^"]+)"\]/).slice(1);
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const usePageMetadata = (title, description) => {
  const { pathname: currentPath } = useLocation();
  useEffect(() => {
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const service = Data.find((item) => currentPath === `/servicios/${serviceSlug(item.title)}`);
    const isHome = currentPath === '/' || currentPath === '/home';
    const noIndex = !isHome && currentPath !== '/contact' && !service;
    setMetaContent('meta[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow');
    const image = isHome ? '/images/home/justice-gavel-1920.webp' : service?.picture;
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      document.querySelector(selector)?.remove();
    }
    setMetaContent('meta[name="twitter:card"]', 'summary');

    const baseUrl = import.meta.env.VITE_SITE_URL;
    if (!baseUrl) return;

    const pathname = isHome ? '/' : currentPath;
    const canonicalUrl = new URL(pathname, baseUrl).toString();
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    if (image) {
      const imageUrl = new URL(image, baseUrl).toString();
      setMetaContent('meta[property="og:image"]', imageUrl);
      setMetaContent('meta[name="twitter:image"]', imageUrl);
      setMetaContent('meta[name="twitter:card"]', 'summary_large_image');
    }
  }, [title, description, currentPath]);
};

export default usePageMetadata;
