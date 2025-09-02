// SEO Helper Functions
export const setMetaTags = (metaTags: Array<{ name: string; content: string }>) => {
  metaTags.forEach(tag => {
    let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
    if (!existingTag) {
      existingTag = document.createElement('meta');
      existingTag.setAttribute('name', tag.name);
      document.head.appendChild(existingTag);
    }
    existingTag.setAttribute('content', tag.content);
  });
};

export const setSocialTags = (socialTags: Array<{ property?: string; name?: string; content: string }>) => {
  socialTags.forEach(tag => {
    const attribute = tag.property ? 'property' : 'name';
    const selector = tag.property ? `meta[property=\"${tag.property}\"]` : `meta[name=\"${tag.name}\"]`;
    let existingTag = document.querySelector(selector);
    if (!existingTag) {
      existingTag = document.createElement('meta');
      existingTag.setAttribute(attribute, tag.property || tag.name || '');
      document.head.appendChild(existingTag);
    }
    existingTag.setAttribute('content', tag.content);
  });
};

export const setViewportMeta = () => {
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    document.head.appendChild(viewport);
  }
};

export const setCanonicalUrl = (url: string) => {
  // Normalize canonical: strip query/hash and prefer configured site origin if provided
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  try {
    const u = new URL(url);
    const site = (import.meta as any).env?.VITE_SITE_URL as string | undefined;
    let base = u.origin;
    if (site) {
      try {
        base = new URL(site).origin;
      } catch {}
    }
    const canonical = `${base}${u.pathname}`;
    canonicalLink.setAttribute('href', canonical);
  } catch {
    canonicalLink.setAttribute('href', url);
  }
};

export const setLanguageAttribute = (lang: string = 'en-US') => {
  document.documentElement.setAttribute('lang', lang);
};

export const setStructuredData = (data: object, dataAttribute?: string) => {
  const selector = dataAttribute ? `script[data-schema="${dataAttribute}"]` : 'script[type="application/ld+json"]';
  let scriptTag = document.querySelector(selector);
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'application/ld+json');
    if (dataAttribute) {
      scriptTag.setAttribute('data-schema', dataAttribute);
    }
    document.head.appendChild(scriptTag);
  }
  scriptTag.textContent = JSON.stringify(data);
};

export const setFavicon = () => {
  const sizes = [16, 32, 48, 64, 128, 192, 512];
  
  // Remove existing favicon links
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => link.remove());
  
  // Prefer SVG heart favicon if available
  const svgIcon = document.createElement('link');
  svgIcon.setAttribute('rel', 'icon');
  svgIcon.setAttribute('type', 'image/svg+xml');
  svgIcon.setAttribute('href', '/favicon.svg');
  document.head.appendChild(svgIcon);
  
  // Set PNG favicons for different sizes (fallbacks if provided)
  sizes.forEach(size => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/png');
    link.setAttribute('sizes', `${size}x${size}`);
    link.setAttribute('href', `/favicon-${size}x${size}.png`);
    document.head.appendChild(link);
  });
  
  // Set Apple touch icons
  const appleTouchIcon = document.createElement('link');
  appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
  appleTouchIcon.setAttribute('sizes', '180x180');
  appleTouchIcon.setAttribute('href', '/apple-touch-icon.png');
  document.head.appendChild(appleTouchIcon);
  
  // Set manifest
  const manifest = document.createElement('link');
  manifest.setAttribute('rel', 'manifest');
  manifest.setAttribute('href', '/manifest.json');
  document.head.appendChild(manifest);
};

export const setDNSPrefetch = (domains: string[]) => {
  domains.forEach(domain => {
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'dns-prefetch');
      link.setAttribute('href', domain);
      document.head.appendChild(link);
    }
  });
};

export const setPreloadLinks = (links: Array<{ href: string; as: string; type?: string }>) => {
  links.forEach(linkData => {
    if (!document.querySelector(`link[rel="preload"][href="${linkData.href}"]`)) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('href', linkData.href);
      link.setAttribute('as', linkData.as);
      if (linkData.type) {
        link.setAttribute('type', linkData.type);
      }
      if (linkData.as === 'style') {
        link.addEventListener('load', () => {
          try { (link as any).rel = 'stylesheet'; } catch {}
        });
      }
      document.head.appendChild(link);
    }
  });
};
