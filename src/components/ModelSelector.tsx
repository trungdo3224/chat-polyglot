import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot } from "lucide-react";

interface SelectedModels {
  openai: boolean;
  gemini: boolean;
  deepseek: boolean;
  claude: boolean;
}

interface SelectedModelVersions {
  openai: string;
  gemini: string;
  deepseek: string;
  claude: string;
}

interface ModelSelectorProps {
  selectedModels: SelectedModels;
  onModelChange: (models: SelectedModels) => void;
  selectedModelVersions: SelectedModelVersions;
  onModelVersionChange: (versions: SelectedModelVersions) => void;
}

const models = [
  {
    id: 'openai' as keyof SelectedModels,
    name: 'OpenAI',
    description: 'ChatGPT và GPT models',
    color: 'openai',
    versions: [
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Latest multimodal model' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Fast and powerful' },
      { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and affordable' },
    ]
  },
  {
    id: 'gemini' as keyof SelectedModels,
    name: 'Google Gemini',
    description: 'Google\'s advanced AI model',
    color: 'gemini',
    versions: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Most capable Gemini model' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast and efficient' },
      { id: 'gemini-pro', name: 'Gemini Pro', description: 'Previous generation' },
    ]
  },
  {
    id: 'deepseek' as keyof SelectedModels,
    name: 'DeepSeek',
    description: 'DeepSeek reasoning models',
    color: 'deepseek',
    versions: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat', description: 'General conversation model' },
      { id: 'deepseek-coder', name: 'DeepSeek Coder', description: 'Code-specialized model' },
      { id: 'deepseek-math', name: 'DeepSeek Math', description: 'Math reasoning model' },
    ]
  },
  {
    id: 'claude' as keyof SelectedModels,
    name: 'Anthropic Claude',
    description: 'Claude 3 và Sonnet models',
    color: 'claude',
    versions: [
      { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Latest and most capable' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Most powerful reasoning' },
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', description: 'Fast and efficient' },
    ]
  },
];

export const ModelSelector = ({ 
  selectedModels, 
  onModelChange, 
  selectedModelVersions, 
  onModelVersionChange 
}: ModelSelectorProps) => {
  const handleModelToggle = (modelId: keyof SelectedModels) => {
    onModelChange({
      ...selectedModels,
      [modelId]: !selectedModels[modelId],
    });
  };

  const handleVersionChange = (modelId: keyof SelectedModelVersions, version: string) => {
    onModelVersionChange({
      ...selectedModelVersions,
      [modelId]: version,
    });
  };

  const selectedCount = Object.values(selectedModels).filter(Boolean).length;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Models
          </CardTitle>
          <Badge variant="secondary" className="text-xs animate-pulse-glow">
            {selectedCount} đã chọn
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {models.map((model, index) => (
          <div
            key={model.id}
            className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-glow transform hover:scale-[1.02] ${
              selectedModels[model.id]
                ? `bg-${model.color}-bg border-${model.color} animate-scale-in`
                : 'bg-muted/50 border-border hover:border-primary/50'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleModelToggle(model.id)}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedModels[model.id]}
                onChange={() => handleModelToggle(model.id)}
                className="mt-0.5"
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{model.name}</h3>
                  {selectedModels[model.id] && (
                    <div className={`w-2 h-2 rounded-full bg-${model.color} animate-pulse`} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {model.description}
                </p>
                
                {selectedModels[model.id] && (
                  <div className="animate-slide-in-right">
                    <Select
                      value={selectedModelVersions[model.id]}
                      onValueChange={(value) => handleVersionChange(model.id, value)}
                    >
                      <SelectTrigger className="w-full bg-input border-border text-sm">
                        <SelectValue placeholder="Chọn model version..." />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {model.versions.map((version) => (
                          <SelectItem key={version.id} value={version.id} className="cursor-pointer">
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{version.name}</span>
                              <span className="text-xs text-muted-foreground">{version.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 text-xs text-muted-foreground">
          Chọn nhiều models để so sánh phản hồi từ các AI khác nhau
        </div>
      </CardContent>
    </Card>
  );
};