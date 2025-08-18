import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAccessToken, setAccessToken } from "./tokenStore";
import { API_CONFIG } from "./api/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

// 
export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

export const fetchApi = async (
  url: string,
  method: string,
  body?: unknown,
  customToken?: string | null
) => {

  const baseUrl = API_CONFIG.url
  let token = customToken ?? getAccessToken();

  const makeRequest = async (authToken?: string | null) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include", // sends cookies (needed for refresh)
    });

    return response;
  };

  let response = await makeRequest(token);

  // If unauthorized, try refresh
  if (response.status === 401) {
    try {
      const refreshRes = await fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include", // so HttpOnly cookie is sent
      });

      if (!refreshRes.ok) {
        throw new Error("Refresh token expired");
      }

      const { accessToken: newToken } = await refreshRes.json();

      // Save new token to context
      setAccessToken(newToken);
      token = newToken;

      // Retry original request
      response = await makeRequest(newToken);
    } catch (error) {
      throw new Error("Unauthorized - please log in again");
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Request failed");
  }

  return response.json();
};