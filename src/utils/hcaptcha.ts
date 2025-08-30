declare global {
  interface Window {
    hcaptcha?: any;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load hCaptcha script'));
    document.head.appendChild(s);
  });
}

export async function getHCaptchaToken(sitekey: string): Promise<string> {
  await loadScript('https://js.hcaptcha.com/1/api.js?render=explicit');
  if (!window.hcaptcha) throw new Error('hCaptcha not available');

  // Create (or reuse) an invisible widget container
  let container = document.getElementById('hcaptcha-invisible');
  if (!container) {
    container = document.createElement('div');
    container.id = 'hcaptcha-invisible';
    container.style.display = 'none';
    document.body.appendChild(container);
  }

  const widgetId = window.hcaptcha.render(container, {
    sitekey,
    size: 'invisible',
  });

  // Prefer async execution returning a Promise
  if (typeof window.hcaptcha.execute === 'function') {
    try {
      const maybePromise = window.hcaptcha.execute(widgetId, { async: true });
      if (maybePromise && typeof maybePromise.then === 'function') {
        const token = await maybePromise;
        return token as string;
      }
    } catch {}
  }

  // Fallback to callback pattern
  return new Promise<string>((resolve, reject) => {
    try {
      window.hcaptcha.execute(widgetId, {
        callback: (token: string) => resolve(token),
        'error-callback': () => reject(new Error('hCaptcha failed')),
      });
    } catch (e) {
      reject(e);
    }
  });
}

