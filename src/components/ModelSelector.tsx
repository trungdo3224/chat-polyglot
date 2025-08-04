import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface SelectedModels {
  openai: boolean;
  gemini: boolean;
  deepseek: boolean;
  claude: boolean;
}

interface ModelSelectorProps {
  selectedModels: SelectedModels;
  onModelChange: (models: SelectedModels) => void;
}

const models = [
  {
    id: 'openai' as keyof SelectedModels,
    name: 'OpenAI GPT',
    description: 'ChatGPT and GPT-4 models',
    color: 'openai',
  },
  {
    id: 'gemini' as keyof SelectedModels,
    name: 'Google Gemini',
    description: 'Google\'s advanced AI model',
    color: 'gemini',
  },
  {
    id: 'deepseek' as keyof SelectedModels,
    name: 'DeepSeek',
    description: 'DeepSeek reasoning models',
    color: 'deepseek',
  },
  {
    id: 'claude' as keyof SelectedModels,
    name: 'Anthropic Claude',
    description: 'Claude 3 and Sonnet models',
    color: 'claude',
  },
];

export const ModelSelector = ({ selectedModels, onModelChange }: ModelSelectorProps) => {
  const handleModelToggle = (modelId: keyof SelectedModels) => {
    onModelChange({
      ...selectedModels,
      [modelId]: !selectedModels[modelId],
    });
  };

  const selectedCount = Object.values(selectedModels).filter(Boolean).length;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Models</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {selectedCount} selected
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {models.map((model) => (
          <div
            key={model.id}
            className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-glow ${
              selectedModels[model.id]
                ? `bg-${model.color}-bg border-${model.color}`
                : 'bg-muted/50 border-border hover:border-primary/50'
            }`}
            onClick={() => handleModelToggle(model.id)}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedModels[model.id]}
                onChange={() => handleModelToggle(model.id)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{model.name}</h3>
                  {selectedModels[model.id] && (
                    <div className={`w-2 h-2 rounded-full bg-${model.color}`} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {model.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 text-xs text-muted-foreground">
          Select multiple models to compare their responses
        </div>
      </CardContent>
    </Card>
  );
};