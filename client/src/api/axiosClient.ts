import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {clearTokens, getAccessToken, getRefreshToken, setTokens} from "@/utils/cookieUtils";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const isPublicRoute = (url?: string): boolean | undefined => {
  return (
      url?.includes("/api/auth/signup") ||
      url?.includes("/api/auth/signin") ||
      url?.includes("/api/auth/forgot") ||
      url?.includes("/api/auth/reset") ||
      url?.includes("/api/auth/refresh")
  );
};

export const axiosClient = axios.create({
  baseURL:
      process.env.NEXT_PUBLIC_APP_ENV === "development"
          ? process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT
          : process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!isPublicRoute(config.url)) {
        const token = getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response Interceptor
axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isPublicRoute(originalRequest.url)
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(axiosClient(originalRequest));
              },
              reject: (err: AxiosError) => reject(err),
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();
          const response = await axios.post(
              `${axiosClient.defaults.baseURL}/api/auth/refresh`,
              { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          setTokens(accessToken, newRefreshToken);

          processQueue(null, accessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          return axiosClient(originalRequest);
        } catch (err) {
          processQueue(err as AxiosError, null);
          clearTokens();
          // Optional: redirect to login page here if needed
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
);
