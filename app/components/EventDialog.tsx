"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { generateEventURL } from "@/lib/utils";
import { eventFormSchema, EventFormValues } from "@/schemas";
import { useEvent } from "@/store/eventStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createNewEvent } from "../actions/events.action";

const videoCallOption = [
  { label: "Google Meet", value: "Google Meet" },
  { label: "Zoom", value: "Zoom" },
  { label: "Microsoft Teams", value: "Microsoft Teams" },
];

const defaultValues: Partial<EventFormValues> = {
  title: "",
  url: "",
  description: "",
  duration: 15,
  isActive: false,
  videoCallSoftware: "Google Meet",
};

const EventDialog = () => {
  const { open, handleOpen, handleClose } = useEvent();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      await createNewEvent(data);
      form.reset();
      handleClose();
      toast.success("New event created");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const title = form.watch("title");

  useEffect(() => {
    if (title) {
      const url = generateEventURL(title);
      form.setValue("url", url, { shouldValidate: true });
    }
  }, [title, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) =>
        !isOpen ? handleClose() : handleOpen("NEW")
      }
    >
      <DialogTrigger asChild onClick={() => handleOpen("NEW")}>
        <Button>
          <Plus className="h-4 w-4" /> New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new event type</DialogTitle>
          <DialogDescription>
            Create a new event type for people to book times with.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="30 Minute Meeting"
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
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <span className="bg-secondary p-2 px-2.5 text-sm text-muted-foreground">
                        https://eventr.com/makdoomjs/
                      </span>
                      <Input
                        disabled
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your event type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Active this event so the users can see it
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <ButtonGroup
              fullWidth
              options={videoCallOption}
              value={form.watch("videoCallSoftware")}
              onChange={(value) => form.setValue("videoCallSoftware", value)}
              variant="outline"
            />

            <div className="flex gap-4 !mt-8">
              <Button variant="secondary" className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
                Create Event
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EventDialog;
