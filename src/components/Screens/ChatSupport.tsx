import { useState, useRef, useEffect } from 'react';
import { X, Send, Minimize2, Maximize2, User, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: Date;
}

interface ChatSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSupport({ isOpen, onClose }: ChatSupportProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'support',
      text: 'Olá! Sou o consultor do AgroDetect. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll 
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulando mensagem de suporte
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        text: 'Obrigado pela sua mensagem! Nossa equipe está analisando sua solicitação e retornará em breve com as informações necessárias.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 shadow-2xl border-emerald-200">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="mb-0">Suporte AgroDetect</h3>
                <p className="text-emerald-50 text-sm">Online agora</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            <ScrollArea ref={scrollAreaRef} className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.sender === 'support'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700'
                        }
                      >
                        {message.sender === 'support' ? 'CS' : <User className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 ${
                        message.sender === 'user' ? 'items-end' : 'items-start'
                      } flex flex-col`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.sender === 'support'
                            ? 'bg-emerald-50 text-emerald-950'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                      <span className="text-xs text-emerald-600 mt-1">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-emerald-100 p-4 bg-gray-50">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
                <Button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-emerald-600 mt-2">
                Tempo médio de resposta: 10-15 minutos
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
