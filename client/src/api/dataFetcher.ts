import axiosFetcher from "./axiosFetcher";

class DataFetcher {
  static async get(url: string) {
    const res = await axiosFetcher.get(url);
    return res.data;
  }

  static async put(url: string, body?: Record<string, any>) {
    const res = await axiosFetcher.put(url, body);
    return res.data;
  }

  static async post(url: string, body?: Record<string, any>) {
    const res = await axiosFetcher.post(url, body);
    return res.data;
  }

  static async patch(url: string, body?: Record<string, any>) {
    const res = await axiosFetcher.patch(url, body);
    return res.data;
  }

  static async delete(url: string) {
    const res = await axiosFetcher.delete(url);
    return res.data;
  }

  static async postFile(url: string, file: FormData) {
    const res = await axiosFetcher.post(
      `${process.env.NEXT_PUBLIC_APP_IMAGE_STORE}/${url}`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.url;
  }
}

export default DataFetcher;
