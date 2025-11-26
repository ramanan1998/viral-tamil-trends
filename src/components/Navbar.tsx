import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Scriptify
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
          <User className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};
