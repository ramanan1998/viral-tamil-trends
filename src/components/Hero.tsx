import { Sparkles, TrendingUp, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCA1NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4Ni02LTYtNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-primary-foreground/10 p-3 rounded-full backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="bg-primary-foreground/10 p-3 rounded-full backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="bg-primary-foreground/10 p-3 rounded-full backdrop-blur-sm">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Tamil Viral Script
            <br />
            <span className="text-accent-foreground">Generator</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
            Trending topics-ல இருந்து viral Tamil scripts உடனே generate பண்ணுங்க! 🚀
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-primary-foreground/80 pt-4">
            <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Zap className="h-4 w-4" />
              <span>25-sec Scripts</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <TrendingUp className="h-4 w-4" />
              <span>Tamil Trends</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Instant Generate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
