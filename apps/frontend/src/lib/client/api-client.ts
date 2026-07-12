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

  const contentType = response.headers.get("Content-Type") ?? "";

  if (!contentType.includes("application/json")) {
    if (!response.ok) {
      return {
        isSuccess: false,
        isFailure: true,
        value: null as T,
        statusCode: response.status,
        errorMessage: "Failed to fetch resource",
      } as unknown as Result<T>;
    }

    const blob = await response.blob();
    return {
      isSuccess: true,
      isFailure: false,
      value: blob as unknown as T,
      error: null,
    } as unknown as Result<T>;
  }

  if (response.status === 204) {
    return {
      isSuccess: true,
      isFailure: false,
      value: null as T,
      error: null,
    } as unknown as Result<T>;
  }

  const data: Result<T> = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      isSuccess: false,
      isFailure: true,
      value: null as T,
      statusCode: 400,
      errorMessage: data?.errorMessage ?? "",
    };
  }
  return data;
}
