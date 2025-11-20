import { Copy, Check, Sparkles, MessageSquare, Hash, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratedScript } from "@/pages/Index";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ScriptDisplayProps {
  script: GeneratedScript | null;
  isLoading: boolean;
}

export const ScriptDisplay = ({ script, isLoading }: ScriptDisplayProps) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      toast({
        title: "Copied!",
        description: `${section} copied to clipboard`,
      });
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full animate-pulse">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Generating your viral script...</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-20 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-40 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-16 bg-muted rounded-lg animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!script) return null;

  const CopyButton = ({ text, section }: { text: string; section: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copyToClipboard(text, section)}
      className="hover:bg-primary/10"
    >
      {copiedSection === section ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold">
            <Sparkles className="h-5 w-5" />
            <span>Script Generated!</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {script.topic}
          </h2>
        </div>

        <Card className="border-border/50 shadow-lg bg-card">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Hook (3-5 sec)</CardTitle>
              </div>
              <CopyButton text={script.hook} section="Hook" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg font-semibold text-card-foreground leading-relaxed">
              {script.hook}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-lg bg-card">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-secondary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle className="text-xl">Full Script (20-30 sec)</CardTitle>
              </div>
              <CopyButton text={script.script} section="Script" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-base text-card-foreground leading-relaxed">
              {script.script}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-lg bg-card">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-accent/5 to-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-xl">CTA / Closing</CardTitle>
              </div>
              <CopyButton text={script.cta} section="CTA" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-base font-semibold text-card-foreground">
              {script.cta}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-lg bg-card">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Hash className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Hashtags & Caption</CardTitle>
              </div>
              <CopyButton 
                text={`${script.caption}\n\n${script.hashtags.join(' ')}`} 
                section="Hashtags & Caption" 
              />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Caption:</h4>
              <p className="text-base text-card-foreground whitespace-pre-line">
                {script.caption}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Hashtags:</h4>
              <div className="flex flex-wrap gap-2">
                {script.hashtags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-6">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            onClick={() => copyToClipboard(
              `${script.hook}\n\n${script.script}\n\n${script.cta}\n\n${script.caption}\n\n${script.hashtags.join(' ')}`,
              "Full Script"
            )}
          >
            <Copy className="mr-2 h-5 w-5" />
            Copy Complete Script
          </Button>
        </div>
      </div>
    </section>
  );
};
