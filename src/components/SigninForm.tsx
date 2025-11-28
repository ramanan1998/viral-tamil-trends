import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { signin } from "@/lib/api";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const SigninForm = () => {

  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
      mutationKey: [ "signin" ],
      mutationFn: signin,
      onSuccess: (res) => {
        setAuthData({ token: res.data.authToken, userId: res.data.userId });
        navigate("/");
        toast({
          title: "Success",
          variant: "default",
          description: "Welcome back !",
        });
      },
      onError: (error: AxiosError<any>) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.response.data,
        });
      }
    })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email: values.email,
      password: values.password
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur-sm border-primary/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? <LoaderCircle className="h-5 w-5 animate-spin"/> : "Sign In"}
            </Button>
          </form>
        </Form>
        <br />
        <p className="text-center">Don't have an account? <Link to="/signup" className="text-primary font-semibold">Sign Up</Link></p>
      </CardContent>
    </Card>
  );
};
