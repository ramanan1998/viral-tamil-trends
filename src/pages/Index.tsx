import { Navbar } from "@/components/Navbar";
import { TrendingTopics } from "@/components/TrendingTopics";
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
      <Navbar />
      <TrendingTopics />
    </div>
  );
};

export default Index;

