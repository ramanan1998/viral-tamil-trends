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

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TrendingTopics />
    </div>
  );
};

export default Index;


// <TrendingTopics onTopicSelect={handleTopicSelect} isGenerating={isGenerating} />
//       {(generatedScript || isGenerating) && (
//         <ScriptDisplay script={generatedScript} isLoading={isGenerating} />
//       )}