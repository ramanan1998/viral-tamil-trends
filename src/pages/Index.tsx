import { useState } from "react";
import { Hero } from "@/components/Hero";
import { TrendingTopics } from "@/components/TrendingTopics";
import { ScriptDisplay } from "@/components/ScriptDisplay";
import axios from "axios";

export type TrendingTopic = {
  id: string;
  title: string;
  category: string;
  views?: string;
};

export type GeneratedScript = {
  topic: string;
  hook: string;
  script: string;
  cta: string;
  hashtags: string[];
  caption: string;
};

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState<TrendingTopic | null>(null);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);


  const handleTopicSelect = async (topic: TrendingTopic) => {
    setSelectedTopic(topic);
    setIsGenerating(true);

    const response = await axios({
      method: "get",
      url: `https://viral-tamil-trends-backend.onrender.com/api/generate?query=${topic.title}`
    });

    const content = response.data.content[0]
    
    // Simulate AI generation - replace with real API call later
    setGeneratedScript({
      topic: content.topic,
      hook: content.hook,
      script: content.script,
      cta: content.cta,
      hashtags: content.hashtags,
      caption: content.caption
    });
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TrendingTopics onTopicSelect={handleTopicSelect} isGenerating={isGenerating} />
      {(generatedScript || isGenerating) && (
        <ScriptDisplay script={generatedScript} isLoading={isGenerating} />
      )}
    </div>
  );
};

export default Index;
