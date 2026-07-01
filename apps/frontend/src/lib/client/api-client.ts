import { ENV } from "@/constants";
import type { Result } from "@/schemas/api-schema";

export async function clientFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<Result<T>> {
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${ENV.APIURL}/${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 204) {
    return {
      isSuccess: true,
      isFailure: false,
      value: null as T,
      error: null,
    } as unknown as Result<T>;
  }

  const data : Result<T>= await response.json().catch(() => null);

  if (!response.ok) {
    return {
      isSuccess: false,
      isFailure: true,
      value: null as T,
      error: {
        message: data?.error?.message || `خطأ من الخادم بحالة: ${response.status}`,
        type: response.status,
      },
    };
  }
  return data;
}
