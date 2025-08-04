import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  model?: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const modelColors = {
  openai: 'openai',
  gemini: 'gemini',
  deepseek: 'deepseek',
  claude: 'claude',
};

const modelNames = {
  openai: 'OpenAI',
  gemini: 'Gemini',
  deepseek: 'DeepSeek',
  claude: 'Claude',
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  const modelColor = message.model ? modelColors[message.model as keyof typeof modelColors] : null;
  const modelName = message.model ? modelNames[message.model as keyof typeof modelNames] : null;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-300`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : modelColor 
              ? `bg-${modelColor}-bg border border-${modelColor}` 
              : 'bg-muted text-muted-foreground'
        }`}>
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1">
          {!isUser && modelName && (
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="secondary" 
                className={`text-xs bg-${modelColor}-bg text-${modelColor} border-${modelColor}/30`}
              >
                {modelName}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
          
          <Card className={`${
            isUser 
              ? 'bg-primary text-primary-foreground border-primary' 
              : modelColor
                ? `bg-${modelColor}-bg border-${modelColor}/30`
                : 'bg-card border-border'
          }`}>
            <CardContent className="p-3">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </CardContent>
          </Card>
          
          {isUser && (
            <div className="text-xs text-muted-foreground mt-1 text-right">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};