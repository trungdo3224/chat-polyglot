import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Key, AlertTriangle } from "lucide-react";

interface ApiKeys {
  openai: string;
  gemini: string;
  deepseek: string;
  claude: string;
}

export const ApiKeyManager = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: localStorage.getItem('openai-key') || '',
    gemini: localStorage.getItem('gemini-key') || '',
    deepseek: localStorage.getItem('deepseek-key') || '',
    claude: localStorage.getItem('claude-key') || '',
  });
  
  const [showKeys, setShowKeys] = useState<Record<keyof ApiKeys, boolean>>({
    openai: false,
    gemini: false,
    deepseek: false,
    claude: false,
  });

  const models = [
    {
      id: 'openai' as keyof ApiKeys,
      name: 'OpenAI',
      placeholder: 'sk-...',
      description: 'Your OpenAI API key',
    },
    {
      id: 'gemini' as keyof ApiKeys,
      name: 'Google Gemini',
      placeholder: 'AI...',
      description: 'Your Google AI Studio API key',
    },
    {
      id: 'deepseek' as keyof ApiKeys,
      name: 'DeepSeek',
      placeholder: 'sk-...',
      description: 'Your DeepSeek API key',
    },
    {
      id: 'claude' as keyof ApiKeys,
      name: 'Anthropic Claude',
      placeholder: 'sk-ant-...',
      description: 'Your Anthropic API key',
    },
  ];

  const handleKeyChange = (model: keyof ApiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [model]: value }));
  };

  const handleSaveKey = (model: keyof ApiKeys) => {
    localStorage.setItem(`${model}-key`, apiKeys[model]);
  };

  const toggleShowKey = (model: keyof ApiKeys) => {
    setShowKeys(prev => ({ ...prev, [model]: !prev[model] }));
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in"
      style={{ animationDelay: '200ms' }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Key className="w-5 h-5" />
          API Keys
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert className="border-orange-500/20 bg-orange-500/5">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <AlertDescription className="text-sm">
            Keys are stored locally in your browser. For production use, consider using Supabase for secure storage.
          </AlertDescription>
        </Alert>

        {models.map((model) => (
          <div key={model.id} className="space-y-2">
            <Label htmlFor={model.id} className="text-sm font-medium">
              {model.name}
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id={model.id}
                  type={showKeys[model.id] ? "text" : "password"}
                  value={apiKeys[model.id]}
                  onChange={(e) => handleKeyChange(model.id, e.target.value)}
                  placeholder={model.placeholder}
                  className="pr-10 bg-input border-border"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => toggleShowKey(model.id)}
                >
                  {showKeys[model.id] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveKey(model.id)}
                disabled={!apiKeys[model.id]}
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {model.description}
            </p>
          </div>
        ))}

        <div className="pt-2 text-xs text-muted-foreground">
          API keys are required to use the respective AI models. Visit each provider's website to obtain your keys.
        </div>
      </CardContent>
    </Card>
  );
};