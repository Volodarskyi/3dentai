import axios from "axios";

export const axiosClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_APP_ENV === "development"
      ? process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT
      : process.env.NEXT_PUBLIC_APP_BASE_URL_PRODUCTION,
  headers: {
    "Content-Type": "application/json",
  },
});
