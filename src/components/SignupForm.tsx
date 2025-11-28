import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { signup } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  // password: z.string().min(6, {
  //   message: "Password must be at least 6 characters.",
  // }),
});

export const SignupForm = () => {

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [ "signup" ],
    mutationFn: signup,
    onSuccess: () => {
      navigate("/welcome")
      toast({
        title: "Success",
        variant: "default",
        description: "Welcome to Scriptify !",
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
      username: values.username
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur-sm border-primary/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Join Scriptify to start generating viral scripts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? <LoaderCircle className="h-5 w-5 animate-spin"/> : "Sign Up"}
            </Button>
          </form>
        </Form>
        <br />
        <p className="text-center">Already have an account? <Link to="/signin" className="text-primary font-semibold">Sign In</Link></p>
      </CardContent>
    </Card>
  );
};
