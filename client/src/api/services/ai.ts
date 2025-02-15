import DataFetcher from "@/api/dataFetcher";

const analyzeImage = async (imageUrl: string) => {
  return (
    DataFetcher.post("/api/ai/analyze", {
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

export default {
  analyzeImage,
};
