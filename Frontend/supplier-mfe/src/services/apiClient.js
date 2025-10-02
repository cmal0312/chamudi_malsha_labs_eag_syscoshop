import API_BASE_URL from "../config";

export const apiClient = async (endpoint, options = {}) => {
  const url = endpoint === "/auth/me"
      ? `${API_BASE_URL.replace(/\/api$/, "")}${endpoint}` 
      : `${API_BASE_URL}${endpoint}`;

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    credentials : "include",
  };
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

