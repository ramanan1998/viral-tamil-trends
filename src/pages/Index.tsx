import { useState } from "react";
import { Hero } from "@/components/Hero";
import { TrendingTopics } from "@/components/TrendingTopics";
import { ScriptDisplay } from "@/components/ScriptDisplay";

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
    
    // Simulate AI generation - replace with real API call later
    setTimeout(() => {
      setGeneratedScript({
        topic: topic.title,
        hook: `${topic.title}னா என்ன தெரியுமா? இது தான் உண்மை! 🔥`,
        script: `நண்பர்களே, ${topic.title} பத்தி நீங்க தெரிஞ்சுக்கணும். இது ரொம்ப important. Social media-ல இப்போ viral ஆகுது. என்னோட experience-ல இது ரொம்ப useful-ஆ இருந்துச்சு. நீங்களும் try பண்ணி பாருங்க!`,
        cta: "உங்க thoughts comment-ல share பண்ணுங்க! 💬",
        hashtags: ["#TamilContent", "#ViralShorts", "#TrendingNow", "#TamilYouTube", "#ReelsIndia"],
        caption: `${topic.title} - Full breakdown! 🎯\n\nஇன்னைக்கு trending-ல இருக்கிற ${topic.title} பத்தி complete-ஆ பார்க்கலாம். Comment-ல உங்க opinion சொல்லுங்க! ⬇️`
      });
      setIsGenerating(false);
    }, 1500);
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
