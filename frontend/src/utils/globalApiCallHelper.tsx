type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type GlobalApiCallHelperProps = {
  api: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
};

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1"
    : process.env.BASE_URL;

export const globalApiCallHelper = async ({
  api,
  method = "GET",
  body = null,
  headers = {},
}: GlobalApiCallHelperProps) => {
  try {
    const response = await fetch(`${baseURL}${api}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error; 
  }
};
