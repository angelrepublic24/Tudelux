import { Api } from "@/shared/global/Global";

export const AIAgentChat = async (prompt: string) => {
  try {
    const { data } = await Api.post('/ai-agent/ask', { prompt });
    return data;
  } catch (error) {
    console.error("❌ Error in AIAgentChat:", error);
    throw error;
  }
};
