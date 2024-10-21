import axios from "axios";

// Create an instance of Axios to set base URL
export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_APP_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION
      : process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT,
  headers: {
    "Content-Type": "application/json",
  },
});
