const API_BASE_URL = process.env.API_BASE_URL;

async function apiFetch(path: string, init?: RequestInit) {
  if (!API_BASE_URL) throw new Error("API_BASE_URL is not configured");

  const res = await fetch(`${API_BASE_URL}${path}`, init);

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}

export function searchDj(name: string) {
  return apiFetch(`/api/dj/search?name=${encodeURIComponent(name)}`);
}
