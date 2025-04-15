import { apiClient } from "@/api/apiClient";

const analyzeImage = async (imageUrl: string) => {
  return (
    apiClient
      .post("/api/ai/analyze", {
        imageUrl,
      })
      // TODO refactoring and handler error
      .then((res) => res.data?.choices?.[0]?.message?.content ?? "Error")
      .catch((err) => {
        console.log(err);
        return "";
      })
  );
};

export const aiApiServices = {
  analyzeImage,
};
