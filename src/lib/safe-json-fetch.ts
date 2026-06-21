export type SafeFetchResult<T> = {
  ok: boolean;
  status: number;
  error: string | null;
  code: string | null;
  data: T | null;
};

export const safeJsonFetch = async <T>(url: string, options?: RequestInit): Promise<SafeFetchResult<T>> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options?.headers ?? {})
      }
    });
    const text = await response.text();
    let payload: { ok?: boolean; error?: string | null; code?: string | null; data?: T } | null = null;

    try {
      payload = text ? JSON.parse(text) as { ok?: boolean; error?: string | null; code?: string | null; data?: T } : null;
    } catch {
      payload = { ok: false, error: text || 'The server returned an invalid response.', code: 'INVALID_JSON' };
    }

    if (!response.ok || !payload?.ok) {
      return {
        ok: false,
        status: response.status,
        error: payload?.error ?? `Request failed with status ${response.status}`,
        code: payload?.code ?? 'REQUEST_FAILED',
        data: payload?.data ?? null
      };
    }

    return { ok: true, status: response.status, error: null, code: null, data: payload.data ?? null };
  } catch {
    return { ok: false, status: 0, error: 'Unable to reach the server. Check your connection and try again.', code: 'NETWORK_ERROR', data: null };
  }
};
