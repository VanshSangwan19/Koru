const API_BASE = import.meta.env.VITE_API_URL || "/api";

const TOKEN_KEY = "koru_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage unavailable — cookie auth still works same-origin
  }
}

async function request(path, { method = "GET", body, headers = {}, isForm } = {}) {
  const options = {
    method,
    credentials: "include",
    headers: { ...headers },
  };

  const token = getToken();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (body && !isForm) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, options);

  let data = null;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }

  if (!res.ok) {
    if (res.status === 401 && token) {
      setToken(null);
    }
    const error = new Error(data?.message || "Something went wrong");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body, opts) => request(path, { method: "POST", body, ...opts }),
  put: (path, body, opts) => request(path, { method: "PUT", body, ...opts }),
  del: (path) => request(path, { method: "DELETE" }),
};