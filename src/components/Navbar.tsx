import {  Coins, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

  const { token, clearAuthData } = useAuth();
  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [ "getUser" ],
    queryFn: () => getUser({ token }),
    enabled: Boolean(token),
    select: (data) => data.data
  });

  const logout = () => {
    clearAuthData();
    navigate("/signin", { replace: true })
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="text-2xl font-bold text-black">
        Scriptify
      </div>
      <div className="flex items-center gap-4">
      
        {isSuccess ?
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
            <Coins className="h-5 w-5 text-yellow-600" />
            <span className="font-semibold text-gray-700">{data.credits}</span>
            <p className="text-xs text-gray-500">Credits</p>
          </div> : 
          <Skeleton className="w-32 h-10 bg-slate-200"/>
        }

        {isSuccess ? 
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              {data.username[0]}
            </div>
            <span className="font-medium text-sm">{data.username}</span>
          </div>:
          <Skeleton className="w-32 h-10 bg-slate-200"/>
        }

        <Button onClick={logout} variant="ghost" size="icon" className="rounded-full hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};
