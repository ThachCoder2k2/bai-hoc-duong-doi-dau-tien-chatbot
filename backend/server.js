require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 3001;

// Initialize Gemini API (new SDK)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── Chat Completions (text only, same as before) ───────────────────────────
app.post('/api/v1/chat/completions', async (req, res) => {
  try {
    const { query, action_type } = req.body;
    console.log(`[chat] action_type=${action_type}, query=${query}`);

    let systemInstruction = "Bạn là một gia sư AI môn Ngữ Văn, nhiệt tình và am hiểu văn học Việt Nam. Bạn đang trợ giúp học sinh tìm hiểu bài 'Bài học đường đời đầu tiên' (Dế Mèn phiêu lưu ký - Tô Hoài). Vui lòng trả lời ngắn gọn, súc tích, dễ hiểu và truyền cảm hứng.";

    let prompt;
    if (action_type === 'summary') prompt = `${systemInstruction}\n\nHãy tóm tắt ngắn gọn nội dung đoạn trích này.`;
    else if (action_type === 'explain') prompt = `${systemInstruction}\n\nHãy giải thích nghĩa của các từ khó hoặc đoạn khó hiểu.`;
    else if (action_type === 'suggest') prompt = `${systemInstruction}\n\nHãy gợi ý một số câu hỏi suy ngẫm cho học sinh về đoạn này.`;
    else if (action_type === 'quiz') prompt = `${systemInstruction}\n\nCho một vài câu hỏi trắc nghiệm nhanh về đoạn trích này.`;
    else prompt = `${systemInstruction}\n\nYêu cầu của học sinh: ${query}`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = result.text;
    return res.json({ answer: text });
  } catch (error) {
    console.error('[chat] Error:', error.message);
    return res.status(500).json({ detail: error.message || 'Internal server error' });
  }
});

// ─── Image Generation ───────────────────────────────────────────────────────
app.post('/api/v1/image/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ detail: 'prompt is required' });

    console.log(`[image] Generating image for: ${prompt}`);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    let imageBase64 = null;
    let textResponse = '';

    if (response.candidates && response.candidates[0]) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          textResponse += part.text;
        } else if (part.inlineData) {
          imageBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!imageBase64) {
      return res.json({ text: textResponse || 'Không thể tạo hình ảnh. Hãy thử lại với prompt khác.', image: null });
    }

    return res.json({ image: imageBase64, text: textResponse });
  } catch (error) {
    console.error('[image] Error:', error.message);
    return res.status(500).json({ detail: error.message || 'Image generation failed' });
  }
});

// ─── Text-to-Speech (TTS) ───────────────────────────────────────────────────
app.post('/api/v1/tts/generate', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ detail: 'text is required' });

    console.log(`[tts] Generating audio for: ${text.substring(0, 50)}...`);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-tts',
      contents: text,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Kore',
            },
          },
        },
      },
    });

    let audioBase64 = null;

    if (response.candidates && response.candidates[0]) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          audioBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!audioBase64) {
      return res.status(500).json({ detail: 'Could not generate audio' });
    }

    return res.json({ audio: audioBase64 });
  } catch (error) {
    console.error('[tts] Error:', error.message);
    return res.status(500).json({ detail: error.message || 'TTS generation failed' });
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
