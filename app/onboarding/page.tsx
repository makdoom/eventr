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
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, OnBoardingSchemaType } from "@/schemas";
import { onboardingAction } from "../actions/onboarding.action";
import { Loader } from "lucide-react";

const Onboarding = () => {
  const form = useForm<OnBoardingSchemaType>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: "",
      username: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: OnBoardingSchemaType) => {
    try {
      await onboardingAction(values);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
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
                        className="placeholder:text-sm text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="" />
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
                          className="rounded-l-none border-none p-2 focus-visible:ring-transparent h-9 placeholder:text-sm text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isSubmitting ? (
                <Button disabled className="w-full">
                  <Loader className="size-4 mr-2 animate-spin" />
                  Please wait ...
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Onboarding;
