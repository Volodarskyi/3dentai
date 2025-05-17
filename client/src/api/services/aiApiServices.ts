import { apiClient } from "@/api/apiClient";

const analyzeImage = async (imageUrl: string): Promise<string> => {
    try {
        const res = await apiClient.post("/api/ai/analyze", { imageUrl });
        console.log('analyzeImage-RES:',res)
        return res.data?.analyze?.choices?.[0]?.message?.content ?? "Error: No content"
    } catch (err) {
        console.error("analyzeImage error:", err);
        return "";
    }
};

export const aiApiServices = {
    analyzeImage,
};
