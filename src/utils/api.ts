export async function submitTourRequest(apiBase: string, payload: unknown) {
  const base = apiBase.replace(/\/$/, '');
  const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || undefined;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (anon) {
    headers['Authorization'] = `Bearer ${anon}`;
    headers['apikey'] = anon;
  }
  const res = await fetch(`${base}/submit-tour`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function submitContactRequest(apiBase: string, payload: unknown) {
  const base = apiBase.replace(/\/$/, '');
  const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || undefined;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (anon) {
    headers['Authorization'] = `Bearer ${anon}`;
    headers['apikey'] = anon;
  }
  const res = await fetch(`${base}/submit-contact`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `Request failed with ${res.status}`);
  }
  return res.json();
}
