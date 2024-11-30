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
import { SettingSchema, SettingSchemaType } from "@/schemas";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { updatedSettingAction } from "../actions/updateSetting.action";
import { UploadButton } from "../lib/uploadthing";
import { toast } from "sonner";

type SettingFormPropType = {
  name: string;
  email: string;
  image: string;
  username: string;
  about: string;
};

const SettingForm = ({
  name,
  username,
  image,
  email,
  about,
}: SettingFormPropType) => {
  const form = useForm<SettingSchemaType>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      fullName: name,
      username: username,
      email: email,
      image: image,
      about: about || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: SettingSchemaType) => {
    try {
      await updatedSettingAction(values);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className=" max-w-2xl mx-auto">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Settings</CardTitle>
          <div className="mt-2">
            <CardDescription className="text-sm text-muted-foreground">
              Manage your account settings
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="flex gap-4 my-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={form.watch("image")} className="" />
                <AvatarFallback className="text-2xl ">
                  {name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <UploadButton
                  className="ut-button:text-primary ut-button:text-sm ut-button:focus-within:ring-primary ut-button:font-medium ut-button:bg-secondary "
                  endpoint="imageUploader"
                  content={{ button: "Update Profile" }}
                  onClientUploadComplete={(res) => {
                    form.setValue("image", res[0].url);
                    toast.success("Profile updated successfully");
                  }}
                  onUploadError={(error) => {
                    console.log(error);
                    toast.error(error.message);
                  }}
                />
              </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                          className="rounded-l-none border-none p-2 focus-visible:ring-transparent h-9 placeholder:text-sm text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                {isSubmitting ? (
                  <Button disabled className="">
                    <Loader className="size-4 mr-2 animate-spin" />
                    Please wait ...
                  </Button>
                ) : (
                  <Button className="" type="submit">
                    Save Changes
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default SettingForm;
