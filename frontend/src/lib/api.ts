const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v1";

export const apiChatCompletion = async (
  query: string,
  actionType: "chat" | "summary" | "explain" | "suggest" | "analyze" | "quiz" | "mindmap" = "chat"
) => {
  const response = await fetch(`${API_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      action_type: actionType,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to generate AI response");
  }

  return response.json();
};

export const apiGenerateImage = async (prompt: string) => {
  const response = await fetch(`${API_BASE_URL}/image/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to generate image");
  }

  return response.json();
};

export const apiGenerateTTS = async (text: string) => {
  const response = await fetch(`${API_BASE_URL}/tts/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to generate audio");
  }

  return response.json();
};
