import { TrendingUp, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingTopic } from "@/pages/Index";
import axios from "axios";
import { useEffect, useState } from "react";
// Mock data - replace with real API data later
export interface YouTubeVideoCategory {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    assignable: boolean;
    channelId: string;
  };
}

const mockTrendingTopics: TrendingTopic[] = [
  { id: "1", title: "IPL 2025 Updates", category: "Sports", views: "2.3M" },
  {
    id: "2",
    title: "Tamil Movie Reviews",
    category: "Entertainment",
    views: "1.8M",
  },
  { id: "3", title: "Tech Tips Tamil", category: "Technology", views: "1.5M" },
  { id: "4", title: "Cooking Recipes", category: "Food", views: "1.2M" },
  { id: "5", title: "Travel Vlog Ideas", category: "Travel", views: "980K" },
  { id: "6", title: "Fitness Motivation", category: "Health", views: "850K" },
  {
    id: "7",
    title: "Tamil Comedy Trends",
    category: "Entertainment",
    views: "750K",
  },
  { id: "8", title: "Business Tips", category: "Education", views: "620K" },
];

interface TrendingTopicsProps {
  onTopicSelect: (topic: TrendingTopic) => void;
  isGenerating: boolean;
}

const tendiings = async () => {
  const API_KEY = "AIzaSyD-S38SRgK3IVaBY3AsSDd24RQgow4GfmE";

  const url = `https://www.googleapis.com/youtube/v3/videoCategories?maxResults=10&relevanceLanguage=ta&key=AIzaSyD-S38SRgK3IVaBY3AsSDd24RQgow4GfmE&regionCode=IN`;

  const response = await axios.get(url);
  return response.data;
};
const printData = async () => {
  const data = await tendiings();
  return data;
};

export const TrendingTopics = ({
  onTopicSelect,
  isGenerating,
}: TrendingTopicsProps) => {
  const [videos, setVideos] = useState<YouTubeVideoCategory[]>();

  useEffect(() => {
    const fetchTamilTrends = async () => {
      const data = await printData();
      setVideos(data.items);
    };

    fetchTamilTrends();
  }, []);

  console.log(videos);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold">
            <TrendingUp className="h-5 w-5" />
            <span>Live Trending Now</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            இன்றைய Trending Topics
          </h2>
          <p className="text-muted-foreground text-lg">
            Click any topic to generate a viral Tamil script instantly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos?.slice(0, 10)?.map((topic, index) => (
            <Card
              key={topic.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              // onClick={() => onTopicSelect(topic)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-secondary/20 text-secondary-foreground mb-3">
                      {topic?.kind}
                    </span>
                    <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {topic?.snippet?.title}
                    </h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <TrendingUp className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {/* {topic?.views} */}
                       views
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                    disabled={isGenerating}
                  >
                    Generate
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
