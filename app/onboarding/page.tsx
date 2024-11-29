"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Onboarding = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            Welcome to Even<span className="text-primary">tr</span> 👋
          </CardTitle>
          <div className="mt-2">
            <CardDescription className="text-sm text-muted-foreground">
              We just need some basic information to get your profile setup.
            </CardDescription>
            <CardDescription className="text-sm text-muted-foreground">
              You&apos;ll be able to edit this later.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="John Doe"
                        className="placeholder:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <span className="bg-secondary p-2 px-2.5 text-sm text-muted-foreground">
                          eventr.com/
                        </span>
                        <Input
                          placeholder="johndoe11"
                          {...field}
                          className="rounded-l-none border-none p-2 focus-visible:ring-transparent h-9 placeholder:text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Onboarding;
