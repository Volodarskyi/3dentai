import { axiosClient } from "@/api/axiosClient";

class ApiClient {
  static async get(url: string) {
    const res = await axiosClient.get(url);
    return res.data;
  }

  static async put(url: string, body?: Record<string, any>) {
    const res = await axiosClient.put(url, body);
    return res.data;
  }

  static async post(url: string, body?: Record<string, any>) {
    const res = await axiosClient.post(url, body);
    return res.data;
  }

  static async patch(url: string, body?: Record<string, any>) {
    const res = await axiosClient.patch(url, body);
    return res.data;
  }

  static async delete(url: string) {
    const res = await axiosClient.delete(url);
    return res.data;
  }

  static async postFile(url: string, file: FormData) {
    const res = await axiosClient.post(
      `${process.env.NEXT_PUBLIC_APP_IMAGE_STORE}/${url}`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log('postFile-RES', res);
    return res.data;
  }

  static async postAnnotation(file: FormData) {
    const res = await axiosClient.post("/api/photo/uploads3", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data; // backend should return { key: string }
  }
}

export const apiClient = ApiClient;
