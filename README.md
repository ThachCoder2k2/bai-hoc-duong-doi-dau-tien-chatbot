# 📖 AI Tutor — Bài học đường đời đầu tiên

Ứng dụng đọc văn bản kết hợp trợ giảng AI — giao diện chia đôi màn hình: bên trái hiển thị bài văn "Bài học đường đời đầu tiên" (Dế Mèn phiêu lưu ký — Tô Hoài), bên phải là chatbot AI hỗ trợ học sinh tìm hiểu nội dung.

## ✨ Tính năng chính

- 📖 **Passage Viewer** — Hiển thị bài văn với typography đẹp (font Serif `Lora`/`Playfair Display`, tông màu giấy cũ sepia)
- 🤖 **AI Chat** — Hỏi đáp tự do với gia sư AI, hỗ trợ:
  - Tóm tắt nội dung
  - Giải thích từ khó
  - Gợi ý câu hỏi suy ngẫm
  - Trắc nghiệm nhanh
- 🖼️ **Tạo hình ảnh AI** — Sinh hình minh họa bằng Gemini (gemini-2.5-flash-image)
- 🔊 **Text-to-Speech** — Đọc bài văn thành giọng nói bằng Gemini TTS
- 🎨 **UI/UX Premium** — Glassmorphism, micro-animations (Framer Motion), responsive split-screen

## 🏗️ Kiến trúc

```
linh-chi/
├── frontend/    # React + Vite (TypeScript)
└── backend/     # Node.js Express
```

### Frontend

| Công nghệ | Mô tả |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool |
| Tailwind CSS + shadcn/ui | Styling |
| Framer Motion | Animations |
| React Markdown | Render AI responses |

**Components chính:**
- `PassageViewer` — Hiển thị bài văn với layout prose, typography sepia aesthetic
- `AIChatPanel` — Chatbot panel với glassmorphic UI, hỗ trợ quick actions

### Backend

| Công nghệ | Mô tả |
|---|---|
| Express 5 | Web framework |
| @google/genai | Gemini AI SDK |
| cors | Cross-origin support |
| dotenv | Quản lý biến môi trường |

**API Endpoints:**

| Method | Endpoint | Mô tả |
|---|---|---|
| `POST` | `/api/v1/chat/completions` | Chat AI (tóm tắt, giải thích, gợi ý, trắc nghiệm, hỏi tự do) |
| `POST` | `/api/v1/image/generate` | Tạo hình ảnh AI từ prompt |
| `POST` | `/api/v1/tts/generate` | Chuyển văn bản thành giọng nói |
| `GET`  | `/api/v1/health` | Health check |

## 🚀 Cài đặt & Chạy

### Yêu cầu

- Node.js ≥ 18
- Gemini API Key (Google AI Studio)

### Backend

```bash
cd backend

# Cài dependencies
npm install

# Cấu hình biến môi trường
# Tạo file .env
```

**Biến môi trường (`.env`):**

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=6001
```

```bash
# Chạy server
node server.js
# → http://localhost:6001
```

### Frontend

```bash
cd frontend

# Cài dependencies
npm install

# Cấu hình biến môi trường
# Tạo file .env
```

**Biến môi trường (`.env`):**

```env
VITE_API_BASE_URL=http://localhost:6001/api/v1
```

```bash
# Chạy dev server
npm run dev
# → http://localhost:5173
```

## 📝 Scripts

### Frontend

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production |
| `npm run lint` | Kiểm tra linting |
| `npm run preview` | Preview production build |

## 🎨 Design System

- **Reading Panel**: Font Serif (`Lora` / `Playfair Display`), nền giấy cũ `#FDFBF7`, text `slate-800`, `max-w-prose`, `leading-loose`
- **Chat Panel**: Font `Inter`, glassmorphism (`backdrop-blur`), modern dark UI
- **Separator**: `shadow-sm` + `border-b` giữa hai panels

## 📁 Cấu trúc thư mục

```
frontend/src/
├── components/
│   ├── AIChatPanel.tsx       # Chatbot AI panel
│   ├── PassageViewer.tsx     # Bài văn viewer
│   └── ui/                   # shadcn/ui components
├── lib/                      # Utilities
├── App.tsx                   # Root component
└── main.tsx                  # Entry point

backend/
├── server.js                 # Express server + API routes
├── package.json
└── .env                      # Environment variables
```
