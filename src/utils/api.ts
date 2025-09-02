const getHeaders = () => {
  const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || undefined;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (anon) {
    headers['Authorization'] = `Bearer ${anon}`;
    headers['apikey'] = anon;
  }
  return headers;
};

const withFallback = async (path: string, payload: unknown) => {
  const debug = (import.meta.env.VITE_DEBUG_NOTIFICATIONS as string | undefined) === '1' ? '?debug=1' : '';
  const primary = (import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string | undefined) || '';
  const explicitFallback = (import.meta.env.VITE_SUPABASE_FUNCTIONS_URL_FALLBACK as string | undefined) || '';
  const headers = getHeaders();
  const devMock = (import.meta.env.DEV && ((import.meta.env as any).VITE_DEV_MOCK === '1')) as boolean;

  // Sensible default fallback for local dev when no fallback is defined
  const defaultRemote = 'https://follmsqgovcvloywunax.supabase.co/functions/v1';
  const isLocalHost = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  const fallback = explicitFallback || (isLocalHost ? defaultRemote : '');

  const tryPost = async (base: string) => {
    const urlBase = base.replace(/\/$/, '');
    const res = await fetch(`${urlBase}/${path}${debug}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || `Request failed with ${res.status}`);
    }
    return res.json();
  };

  // In local dev, allow a mock response to keep the UI flowing
  if (devMock) {
    return { ok: true, mocked: true } as any;
  }

  // Try primary first
  if (primary) {
    try {
      return await tryPost(primary);
    } catch (e) {
      if (!fallback) throw e;
      // fall through to fallback
    }
  }
  if (fallback) {
    return await tryPost(fallback);
  }
  throw new Error('Missing VITE_SUPABASE_FUNCTIONS_URL');
};

export async function submitTourRequest(apiBase: string, payload: unknown) {
  // apiBase preserved for backward compatibility but withFallback uses envs
  return withFallback('submit-tour', payload);
}

export async function submitContactRequest(apiBase: string, payload: unknown) {
  return withFallback('submit-contact', payload);
}
