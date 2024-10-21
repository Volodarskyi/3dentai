import axios from "axios";

// Create an instance of Axios to set base URL
export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_APP_ENV === "development"
      ? process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT
      : process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION,
  headers: {
    "Content-Type": "application/json",
  },
});
