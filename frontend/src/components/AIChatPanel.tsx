import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  FileText,
  HelpCircle,
  Bot,
  User,
  ListTodo,
  AlertCircle,
  Image as ImageIcon,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { apiChatCompletion, apiGenerateImage } from '@/lib/api';
import { PASSAGE_TEXT } from '@/lib/passage';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  audioUrl?: string;
  timestamp: Date;
};

type AIActionType =
  | 'chat'
  | 'summary'
  | 'explain'
  | 'suggest'
  | 'quiz'
  | 'image'
  | 'tts';

const quickActions: {
  label: string;
  icon: any;
  prompt: string;
  actionType: AIActionType;
}[] = [
  {
    label: 'Tóm tắt',
    icon: FileText,
    prompt: 'Hãy tóm tắt ngắn gọn đoạn văn này.',
    actionType: 'summary',
  },
  {
    label: 'Giải thích',
    icon: Sparkles,
    prompt: 'Giải thích những phần khó hiểu.',
    actionType: 'explain',
  },
  {
    label: 'Gợi ý suy ngẫm',
    icon: HelpCircle,
    prompt: 'Cho tôi vài câu hỏi để suy ngẫm.',
    actionType: 'suggest',
  },
  {
    label: 'Trắc nghiệm',
    icon: ListTodo,
    prompt: 'Tạo một vài câu hỏi trắc nghiệm.',
    actionType: 'quiz',
  },
  {
    label: 'Vẽ minh hoạ',
    icon: ImageIcon,
    prompt:
      'Hãy vẽ một hình ảnh minh hoạ cho đoạn trích "Bài học đường đời đầu tiên".',
    actionType: 'image',
  },
  {
    label: 'Đọc to',
    icon: Volume2,
    prompt: 'Đọc to đoạn trích cho tôi nghe.',
    actionType: 'tts',
  },
];

export default function AIChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Chào bạn! Mình là Gia sư AI môn Ngữ Văn. Bạn có câu hỏi nào về đoạn trích này không?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const fetchAiResponse = async (prompt: string, actionType: AIActionType) => {
    setIsTyping(true);
    setErrorMsg('');

    try {
      if (actionType === 'image') {
        // Image generation
        const result = await apiGenerateImage(prompt);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: result.text || 'Đây là hình ảnh minh hoạ:',
            imageUrl: result.image || undefined,
            timestamp: new Date(),
          },
        ]);
      } else if (actionType === 'tts') {
        // Start reading using browser speechSynthesis
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(PASSAGE_TEXT);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.85;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content:
              '🔊 Đang đọc to đoạn trích "Bài học đường đời đầu tiên".\n\nBạn có thể chat:\n- **"tạm dừng"** để tạm dừng\n- **"tiếp tục"** để đọc tiếp\n- **"dừng lại"** để dừng hẳn',
            timestamp: new Date(),
          },
        ]);
      } else {
        // Normal text chat
        const result = await apiChatCompletion(prompt, actionType);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: result.answer || 'Xin lỗi, tôi không thể trả lời lúc này.',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định',
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Detect audio control intent from chat message (keyword-only, no state gating)
  const detectAudioCommand = (
    text: string,
  ): 'pause' | 'resume' | 'stop' | 'play' | null => {
    const lower = text.toLowerCase();

    // PAUSE: "tạm dừng", "pause"
    if (
      lower.includes('tạm dừng') ||
      lower.includes('pause') ||
      (lower.includes('dừng') && lower.includes('tạm'))
    ) {
      return 'pause';
    }

    // RESUME: "tiếp tục", "đọc tiếp", "continue", "resume"
    if (
      lower.includes('tiếp tục') ||
      lower.includes('đọc tiếp') ||
      lower.includes('continue') ||
      lower.includes('resume')
    ) {
      return 'resume';
    }

    // STOP: "dừng lại", "dừng hẳn", "stop", "tắt", "ngừng"
    if (
      lower.includes('dừng lại') ||
      lower.includes('dừng hẳn') ||
      lower.includes('stop') ||
      lower.includes('tắt') ||
      lower.includes('ngừng')
    ) {
      return 'stop';
    }

    // Generic "dừng" (without "tạm") → stop
    if (lower.includes('dừng') && !lower.includes('tạm')) {
      return 'stop';
    }

    // PLAY: "đọc to", "đọc cho", "đọc bài", "read"
    if (
      lower.includes('đọc to') ||
      lower.includes('đọc cho') ||
      lower.includes('đọc bài') ||
      lower.includes('read aloud')
    ) {
      return 'play';
    }

    return null;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    const prompt = input;
    setInput('');

    // Check if user wants to control audio via chat
    const audioCmd = detectAudioCommand(prompt);
    if (audioCmd) {
      const synth = window.speechSynthesis;
      let response = '';
      switch (audioCmd) {
        case 'pause':
          synth.pause();
          response = '⏸️ Đã tạm dừng đọc! Gõ **"tiếp tục"** để đọc tiếp.';
          break;
        case 'resume':
          synth.resume();
          response = '▶️ Đang tiếp tục đọc!';
          break;
        case 'stop':
          synth.cancel();
          response = '⏹️ Đã dừng đọc hoàn toàn!';
          break;
        case 'play':
          fetchAiResponse(prompt, 'tts');
          return;
      }
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        },
      ]);
      return;
    }

    // Auto-detect if user wants an image
    const lowerInput = prompt.toLowerCase();
    if (
      lowerInput.includes('vẽ') ||
      lowerInput.includes('hình ảnh') ||
      lowerInput.includes('minh hoạ') ||
      lowerInput.includes('draw') ||
      lowerInput.includes('image')
    ) {
      fetchAiResponse(prompt, 'image');
    } else {
      fetchAiResponse(prompt, 'chat');
    }
  };

  const handleQuickAction = (prompt: string, actionType: AIActionType) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    fetchAiResponse(prompt, actionType);
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-[-4px_0_24px_-8px_rgba(0,0,0,0.05)] border-l z-20">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-white/80 backdrop-blur-sm z-10 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-[15px] text-slate-800">
              Gia Sư AI
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Sẵn sàng giải đáp thắc mắc
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 h-8 bg-slate-50/50 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all border-slate-200 justify-start"
              onClick={() =>
                handleQuickAction(action.prompt, action.actionType)
              }
            >
              <action.icon className="w-3.5 h-3.5" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-5 bg-[#fafafa]" ref={scrollRef}>
        <div className="space-y-6 pb-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white border border-slate-200 text-primary'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm prose-slate max-w-none [&_p]:leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-slate-900">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>

                      {/* Render Image */}
                      {msg.imageUrl && (
                        <div className="mt-3">
                          <img
                            src={msg.imageUrl}
                            alt="AI generated illustration"
                            className="rounded-lg max-w-full border border-slate-200 shadow-sm"
                            style={{ maxHeight: '300px', objectFit: 'contain' }}
                          />
                        </div>
                      )}

                      {/* Render Audio Player */}
                      {msg.audioUrl && (
                        <div className="mt-3">
                          <audio
                            controls
                            className="w-full"
                            style={{ maxWidth: '100%' }}
                          >
                            <source src={msg.audioUrl} />
                            Trình duyệt không hỗ trợ phát âm thanh.
                          </audio>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="leading-relaxed">{msg.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3.5 h-[42px] flex items-center">
                <div className="flex gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2 items-center text-rose-500 text-xs mt-2 bg-rose-50 p-3 rounded-lg border border-rose-100"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>Lỗi: {errorMsg}</p>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Đặt câu hỏi..."
            className="flex-1 bg-slate-50/50 border-slate-200 text-sm focus-visible:ring-primary/20 pr-12 h-11 rounded-xl shadow-inner"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 ml-0.5" />
          </Button>
        </form>
        <div className="text-center mt-3">
          <p className="text-[10px] text-slate-400">
            AI có thể đưa ra thông tin không chính xác. Hãy kiểm chứng.
          </p>
        </div>
      </div>
    </div>
  );
}
