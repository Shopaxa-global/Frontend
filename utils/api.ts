const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error: ${response.status} ${response.statusText}. ${errorBody}`
    );
  }

  return response.json();
};
