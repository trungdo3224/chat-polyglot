import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Briefcase, Lightbulb, Heart, Gamepad2, Calculator, Globe, Shield } from "lucide-react";

export interface Topic {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  prompts: {
    openai: string;
    gemini: string;
    deepseek: string;
    claude: string;
  };
}

interface TopicSelectorProps {
  selectedTopic: Topic | null;
  onTopicChange: (topic: Topic) => void;
}

export const topics: Topic[] = [
  {
    id: 'general',
    name: 'Tổng quát',
    icon: <Globe className="w-4 h-4" />,
    description: 'Trò chuyện đa năng về mọi chủ đề',
    prompts: {
      openai: 'You are a helpful and knowledgeable AI assistant. Provide clear, accurate, and comprehensive answers to user questions.',
      gemini: 'You are an intelligent assistant with broad knowledge. Give thoughtful and well-structured responses.',
      deepseek: 'You are a reasoning-focused AI. Provide logical, step-by-step analysis and clear explanations.',
      claude: 'You are a thoughtful AI assistant. Provide nuanced, balanced responses with careful consideration of different perspectives.'
    }
  },
  {
    id: 'programming',
    name: 'Lập trình',
    icon: <Code className="w-4 h-4" />,
    description: 'Hỗ trợ code, debug và tư vấn kỹ thuật',
    prompts: {
      openai: 'You are an expert software developer. Help with coding problems, provide clean code examples, explain best practices, and assist with debugging.',
      gemini: 'You are a programming specialist. Focus on code quality, performance optimization, and modern development practices.',
      deepseek: 'You are a technical expert focused on algorithmic thinking. Provide efficient solutions with detailed explanations of logic and complexity.',
      claude: 'You are a senior software engineer. Emphasize code readability, maintainability, and software engineering principles.'
    }
  },
  {
    id: 'business',
    name: 'Kinh doanh',
    icon: <Briefcase className="w-4 h-4" />,
    description: 'Tư vấn chiến lược, marketing và quản lý',
    prompts: {
      openai: 'You are a business consultant with expertise in strategy, operations, and growth. Provide actionable business advice.',
      gemini: 'You are a business strategist. Focus on market analysis, competitive positioning, and scalable business solutions.',
      deepseek: 'You are a business analyst. Provide data-driven insights, logical frameworks, and strategic thinking for business problems.',
      claude: 'You are an experienced business advisor. Consider ethical implications, stakeholder impacts, and sustainable business practices.'
    }
  },
  {
    id: 'creative',
    name: 'Sáng tạo',
    icon: <Lightbulb className="w-4 h-4" />,
    description: 'Viết lách, thiết kế và ý tưởng sáng tạo',
    prompts: {
      openai: 'You are a creative assistant specializing in writing, storytelling, and creative ideation. Help generate original and engaging content.',
      gemini: 'You are a creative expert with focus on innovative thinking, artistic expression, and imaginative solutions.',
      deepseek: 'You are a structured creative thinker. Combine logical frameworks with creative processes to generate novel ideas.',
      claude: 'You are a thoughtful creative collaborator. Balance creativity with practical considerations and cultural sensitivity.'
    }
  },
  {
    id: 'education',
    name: 'Giáo dục',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Học tập, giảng dạy và kiến thức học thuật',
    prompts: {
      openai: 'You are an educational assistant. Explain concepts clearly, provide learning resources, and adapt explanations to different learning levels.',
      gemini: 'You are an expert educator. Focus on comprehensive understanding, multiple learning approaches, and knowledge retention.',
      deepseek: 'You are an academic specialist. Provide detailed explanations with logical progression, examples, and critical thinking exercises.',
      claude: 'You are a thoughtful teacher. Encourage curiosity, provide balanced perspectives, and promote deep learning.'
    }
  },
  {
    id: 'health',
    name: 'Sức khỏe',
    icon: <Heart className="w-4 h-4" />,
    description: 'Thông tin sức khỏe và lối sống lành mạnh',
    prompts: {
      openai: 'You are a health information assistant. Provide general wellness advice while emphasizing the importance of consulting healthcare professionals.',
      gemini: 'You are a wellness expert. Focus on evidence-based health information, preventive care, and holistic well-being.',
      deepseek: 'You are a health researcher. Provide scientific explanations of health concepts with emphasis on evidence and methodology.',
      claude: 'You are a health educator. Provide balanced health information while being mindful of individual differences and limitations of general advice.'
    }
  },
  {
    id: 'entertainment',
    name: 'Giải trí',
    icon: <Gamepad2 className="w-4 h-4" />,
    description: 'Game, phim ảnh và hoạt động giải trí',
    prompts: {
      openai: 'You are an entertainment expert. Provide recommendations, reviews, and insights about games, movies, books, and other entertainment.',
      gemini: 'You are a media and entertainment specialist. Focus on trends, cultural impact, and diverse entertainment options.',
      deepseek: 'You are an entertainment analyst. Provide structured analysis of entertainment content, mechanics, and user experience.',
      claude: 'You are a thoughtful entertainment advisor. Consider diverse tastes, cultural context, and the broader impact of entertainment choices.'
    }
  },
  {
    id: 'math',
    name: 'Toán học',
    icon: <Calculator className="w-4 h-4" />,
    description: 'Giải toán và giải thích khái niệm toán học',
    prompts: {
      openai: 'You are a mathematics tutor. Solve problems step-by-step, explain concepts clearly, and help with mathematical reasoning.',
      gemini: 'You are a math expert. Provide comprehensive mathematical solutions with multiple approaches and practical applications.',
      deepseek: 'You are a mathematical reasoning specialist. Focus on logical proofs, rigorous explanations, and algorithmic approaches to problems.',
      claude: 'You are a patient math educator. Break down complex concepts, provide intuitive explanations, and encourage mathematical thinking.'
    }
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: <Shield className="w-4 h-4" />,
    description: 'Bảo mật, hacking đạo đức và an ninh mạng',
    prompts: {
      openai: 'You are a cybersecurity expert specializing in ethical hacking, penetration testing, and security best practices. Provide educational information about security vulnerabilities, defense strategies, and responsible disclosure practices.',
      gemini: 'You are a security researcher with expertise in threat analysis, malware analysis, and security architecture. Focus on comprehensive security solutions and emerging threats.',
      deepseek: 'You are a technical security analyst specializing in vulnerability research, exploit development (for educational purposes), and security tool development. Provide detailed technical explanations.',
      claude: 'You are an ethical security consultant. Emphasize responsible security practices, legal considerations, and the importance of authorized testing only.'
    }
  }
];

export const TopicSelector = ({ selectedTopic, onTopicChange }: TopicSelectorProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Chủ đề trò chuyện
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Select
          value={selectedTopic?.id || ''}
          onValueChange={(value) => {
            const topic = topics.find(t => t.id === value);
            if (topic) onTopicChange(topic);
          }}
        >
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Chọn chủ đề..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {topics.map((topic) => (
              <SelectItem key={topic.id} value={topic.id} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  {topic.icon}
                  <span>{topic.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedTopic && (
          <div className="space-y-3 p-3 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              {selectedTopic.icon}
              <h3 className="font-medium text-foreground">{selectedTopic.name}</h3>
              <Badge variant="secondary" className="text-xs">
                Đang chọn
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedTopic.description}
            </p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Mỗi chủ đề có prompt được tối ưu riêng cho từng AI model
        </div>
      </CardContent>
    </Card>
  );
};