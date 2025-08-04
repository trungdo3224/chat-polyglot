import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Settings } from "lucide-react";
import { ModelSelector } from "./ModelSelector";
import { ChatMessage } from "./ChatMessage";
import { ApiKeyManager } from "./ApiKeyManager";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  model?: string;
  timestamp: Date;
}

interface SelectedModels {
  openai: boolean;
  gemini: boolean;
  deepseek: boolean;
  claude: boolean;
}

export const ChatGateway = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModels, setSelectedModels] = useState<SelectedModels>({
    openai: true,
    gemini: false,
    deepseek: false,
    claude: false,
  });
  const [showApiKeys, setShowApiKeys] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Get responses from selected models
    const selectedModelNames = Object.entries(selectedModels)
      .filter(([_, selected]) => selected)
      .map(([model, _]) => model);

    // Simulate API calls for now
    for (const model of selectedModelNames) {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const response: Message = {
        id: `${Date.now()}-${model}`,
        content: `This is a response from ${model.toUpperCase()} model. I understand you asked: "${userMessage.content}". This is a simulated response until API keys are configured.`,
        sender: "assistant",
        model,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, response]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-main">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Chat Gateway</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiKeys(!showApiKeys)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            API Keys
          </Button>
        </div>
      </div>

      <div className="flex-1 flex max-w-6xl mx-auto w-full gap-4 p-4">
        {/* Sidebar */}
        <div className="w-80 space-y-4">
          <ModelSelector
            selectedModels={selectedModels}
            onModelChange={setSelectedModels}
          />
          
          {showApiKeys && (
            <ApiKeyManager />
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col bg-card/50 backdrop-blur-sm border-border shadow-glow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Multi-LLM Chat
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 pb-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Select your AI models and start chatting!</p>
                      <p className="text-sm mt-2">Choose from OpenAI, Gemini, DeepSeek, and Claude</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))
                  )}
                  
                  {isLoading && (
                    <div className="flex justify-center py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                        AI models are thinking...
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-6 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask multiple AI models anything..."
                    className="flex-1 bg-input border-border"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim() || !Object.values(selectedModels).some(Boolean)}
                    size="icon"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {!Object.values(selectedModels).some(Boolean) && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Select at least one AI model to start chatting
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};