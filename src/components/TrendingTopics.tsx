import { Instagram, Copy, X, Plus, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingTopic } from "@/pages/Index";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { toast } from "@/hooks/use-toast";
import instagram from "../assets/instagram.png"
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


interface TrendingTopicsProps {
  onTopicSelect: (topic: TrendingTopic) => void;
  isGenerating: boolean;
}

const getTrendings = async () => {

  const url = `https://www.googleapis.com/youtube/v3/videoCategories?maxResults=10&relevanceLanguage=ta&key=AIzaSyD-S38SRgK3IVaBY3AsSDd24RQgow4GfmE&regionCode=IN`;

  const response = await axios.get(url);
  return response.data;
};

const printData = async () => {
  const data = await getTrendings();
  return data;
};

export const TrendingTopics = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const preRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const [trendings, setTrendings] = useState<YouTubeVideoCategory[]>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string[] | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleAddKeyword = () => {
    if(keywords.length >= 10){
      toast({
        title: "Error",
        description: "You can only add 10 keywords",
        variant: "destructive",
      });
    
      return;
    }
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  useEffect(() => {
    const fetchTamilTrends = async () => {
      const data = await printData();
      setTrendings(data.items);
    };

    fetchTamilTrends();
  }, []);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      trending: "",
      language: "தமிழ்",
      style: "Casual",
      length: "15 seconds",
      variations: "3",
      content: "",
      keywords: [

      ]
    },
  });


  const onSubmit = async (data: any) => {
    if(data.trending === "" || data.language === ""  || data.style === "" || data.length === "" || data.variations === "" || data.content === ""){
      toast({
        title: "Error",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    if(keywords.length < 1){
      toast({
        title: "Error",
        description: "Please add at least one keyword",
        variant: "destructive",
      });
      return;
    }
    if(data.content.length >= 300){
      toast({
        title: "Error",
        description: "Content should be less than 250 characters long",
        variant: "destructive",
      })
      return;
    }

    setIsGenerating(true);

    const response = await axios({
      method: "get",
      url: `https://viral-tamil-trends-backend.onrender.com/api/generate?trending=${data.trending}&language=${data.language}&writingStyle=${data.style}&platform=Instagram&videoLength=${data.length}&numberOfVariations=${data.variations}&trendingKeywords=${keywords.join(',')}&content=${data.content}`
    });

    const content = response.data.content
    setGeneratedScript(content)

    setIsGenerating(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `Script copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };


  const variations = watch("variations");


  return (
    <div  className="bg-gradient-to-r from-blue-100 to-pink-100">
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20  min-h-screen">
      <Card className="w-[90%] max-w-5xl rounded-2xl shadow-xl p-6">
        <CardContent>
          <div className="flex flex-col  gap-6">
            <div className="flex items-center gap-2">

              <h2 className="text-xl font-bold">Script Generator for:</h2>
              <div>

                <img src={instagram} className="" alt="" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div>
                  <label className="font-medium text-gray-700">Trendings</label>
                  <Select
                    onValueChange={(val) => setValue("trending", val)}
                    disabled={isGenerating}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {trendings?.map(trends => (
                        <SelectItem key={trends.snippet.title} value={trends.snippet.title}>{trends.snippet.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Language</label>
                  <Select
                    onValueChange={(val) => setValue("language", val)}
                    disabled={isGenerating}
                  // defaultValue="தமிழ்"
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="தமிழ்">தமிழ்</SelectItem>
                      {/* <SelectItem value="हिन्दी">हिन्दी</SelectItem>
                      <SelectItem value="తెలుగు">తెలుగు</SelectItem>
                      <SelectItem value="ಕನ್ನಡ">ಕನ್ನಡ</SelectItem>
                      <SelectItem value="മലയാളം">മലയാളം</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>

                {/* Writing Style */}
                <div>
                  <label className="font-medium text-gray-700">Writing style</label>
                  <Select
                    onValueChange={(val) => setValue("style", val)}
                    defaultValue="Casual"
                    disabled={isGenerating}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Humorous">Humorous</SelectItem>
                      <SelectItem value="Inspirational">Inspirational</SelectItem>
                      <SelectItem value="Informative">Informative</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Witty">Witty</SelectItem>
                      <SelectItem value="Enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="Empathetic">Empathetic</SelectItem>
                      <SelectItem value="Convincing">Convincing</SelectItem>
                      <SelectItem value="Teasing">Teasing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Video Length */}
                <div>
                  <label className="font-medium text-gray-700">Video length</label>
                  <Select
                    onValueChange={(val) => setValue("length", val)}
                    defaultValue="15 seconds"
                    disabled={isGenerating}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15 seconds">15 seconds</SelectItem>
                      <SelectItem value="30 seconds">30 seconds</SelectItem>
                      <SelectItem value="60 seconds">60 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of Variations */}
                <div>
                  <label className="font-medium text-gray-700">Number of variations</label>
                  <RadioGroup
                    className="flex  items-center gap-6 mt-2"
                    value={variations}
                    onValueChange={(val) => setValue("variations", val)}
                    disabled={isGenerating}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id="v1" />
                      <label htmlFor="v1">1</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="3" id="v3" />
                      <label htmlFor="v3">3</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem  disabled value="5" id="v5" />
                      <label htmlFor="v5">5</label>
                    </div>
                   
                  </RadioGroup>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Add your trending keywords</label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a keyword and press Enter..."
                      className="flex-1"
                      disabled={isGenerating}
                    />
                    <Button
                      type="button"
                      onClick={handleAddKeyword}
                      size="icon"
                      disabled={isGenerating || !currentKeyword.trim() || keywords.includes(currentKeyword.trim())}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-2">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="hover:text-destructive focus:outline-none"
                            disabled={isGenerating}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-700">What's your script about?</label>
                <Textarea
                  {...register("content")}
                  placeholder="Add your content here..."
                  className="mt-2 h-40"
                  disabled={isGenerating}
                />
              </div>

              <div className="grid place-items-center w-full">


                <Button disabled={isGenerating} type="submit" className="w-full font-medium md:w-auto text-lg  rounded-sm">
                  {isGenerating ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating
                    <div className="flex gap-2 mt-4">
                      <div className="animate-bounce w-1 h-1 rounded-full bg-white"></div>
                      <div className="animate-bounce w-1 h-1 rounded-full bg-white"></div>
                      <div className="animate-bounce w-1 h-1 rounded-full bg-white"></div>
                    </div></> : "✨ Generate script"}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[90%] max-w-5xl rounded-2xl shadow-xl p-6">
        <CardContent>
          {(generatedScript && !isGenerating)?
            <div>
              <Carousel className="w-full" setApi={setApi}>
                <div className="space-y-4  mb-2">
                  <h2 className="text-2xl font-semibold">Results</h2>
                  <div className="flex gap-2 justify-between">
                    <p className="text font-medium">Variation {current}</p>
                    <p className="text-sm text-gray-400">  {
                      generatedScript
                        ?.map(script => script?.trim()?.split(/\s+/)?.length)
                        ?.reduce((a, b) => a + b, 0)
                    } Words </p>
                  </div>
                </div>
                <CarouselPrevious ref={preRef} className="hidden" />
                <CarouselNext ref={nextRef} className="hidden" />
                <CarouselContent>
                  {generatedScript?.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="p-3 border border-gray-200 rounded-lg ">
                        <p className=" whitespace-pre-line leading-loose">{item}</p>
                      </div>
                      <br />
                      <div>
                        <Button
                          disabled={isGenerating}
                          variant="outline"

                          className="text-gray-700 float-end"
                          onClick={() => copyToClipboard(item)}
                        >
                          <Copy className="mr-2 h-5 w-5" />
                          Copy
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div>
                <Button variant="link" size="icon" onClick={() => preRef.current?.click()}>

                  <ArrowLeft />
                </Button>
                {current}/{count}
                <Button variant="link" size="icon" onClick={() => nextRef.current?.click()}>

                  <ArrowRight />
                </Button>
              </div>
            </div>
          :
         (
            <p className="text-center text-gray-500 mt-6">
              No results generated yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
        <div className="static z-10 bottom-0 text-center font-semibold text-sm mt-12">
        @2025 blackwins Tech Solutions .All rights reserved
      </div>
    </div>
  );

};



// <section className="py-16 px-4">
//   <div className="container mx-auto max-w-6xl">
//     <div className="text-center mb-12 space-y-3">
//       <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold">
//         <TrendingUp className="h-5 w-5" />
//         <span>Live Trending Now</span>
//       </div>
//       <h2 className="text-3xl md:text-4xl font-bold text-foreground">
//         இன்றைய Trending Topics
//       </h2>
//       <p className="text-muted-foreground text-lg">
//         Click any topic to generate a viral Tamil script instantly
//       </p>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {videos?.slice(0, 10)?.map((topic, index) => (
//         <Card
//           key={topic.id}
//           className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
//           style={{
//             animationDelay: `${index * 100}ms`,
//           }}
//           // onClick={() => onTopicSelect(topic)}
//         >
//           <CardContent className="p-6 space-y-4">
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-secondary/20 text-secondary-foreground mb-3">
//                   {topic?.kind}
//                 </span>
//                 <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
//                   {topic?.snippet?.title}
//                 </h3>
//               </div>
//               <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                 <TrendingUp className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
//               </div>
//             </div>

//             <div className="flex items-center justify-between pt-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="group-hover:bg-primary group-hover:text-primary-foreground"
//                 disabled={isGenerating}
//                 onClick={() => onTopicSelect({ id: "", category: "", title: topic?.snippet?.title, views: ""  })}
//               >
//                 Generate
//                 <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   </div>
// </section>
