import { useEffect } from 'react';
import { useLocation } from '../router';
import { CONTACT_PATH, HOME_PATH, PRIVACY_PATH, findServiceByPath } from '../routes';
import { HOME_PAGE, servicePage } from '../pageMetadata';

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

    const service = findServiceByPath(currentPath);
    const isHome = currentPath === HOME_PATH;
    const noIndex = !isHome && currentPath !== CONTACT_PATH && currentPath !== PRIVACY_PATH && !service;
    setMetaContent('meta[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow');
    const image = isHome ? HOME_PAGE.image : service && servicePage(service).image;
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      document.querySelector(selector)?.remove();
    }
    setMetaContent('meta[name="twitter:card"]', 'summary');

    const baseUrl = import.meta.env.VITE_SITE_URL;
    if (!baseUrl) return;

    const canonicalUrl = new URL(currentPath, baseUrl).toString();
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
