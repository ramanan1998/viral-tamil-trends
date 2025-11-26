import {  Coins, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="text-2xl font-bold text-black">
        Scriptify
      </div>
      <div className="flex items-center gap-4">
      
        
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
          <Coins className="h-5 w-5 text-yellow-600" />
          <span className="font-semibold text-gray-700">{'1'}</span>
          <p className="text-xs text-gray-500">Credits</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            B
          </div>
          <span className="font-medium text-sm">Bava Bahurdeen</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};
