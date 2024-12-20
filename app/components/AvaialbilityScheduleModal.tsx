"use client";

import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScheduleFormValues, scheduleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createNewSchedule,
  updatedSchedule,
} from "../actions/availableSchedules.action";
import { useAvailabilityDialog } from "@/store/availabilityStore";
import { useEffect } from "react";
import { times } from "../lib/times";

const schedule = [
  {
    day: "Sunday",
    isActive: false,
    fromTime: "09:00 AM",
    tillTime: "05:00 PM",
  },
  {
    day: "Monday",
    isActive: true,
    fromTime: "09:00 AM",
    tillTime: "05:00 PM",
  },
  {
    day: "Tuesday",
    isActive: true,
    fromTime: "09:00 AM",
    tillTime: "05:00 PM",
  },
  {
    day: "Wednesday",
    isActive: true,
    fromTime: "09:00 AM",
    tillTime: "05:00 PM",
  },
  {
    day: "Thursday",
    isActive: true,
    fromTime: "09:00 AM",
    tillTime: "05:00 PM",
  },
  {
    day: "Friday",
    isActive: true,
    fromTime: "09:00 AM",
    tillTime: "05:00 PM",
  },
  {
    day: "Saturday",
    isActive: false,
    fromTime: "09:00 AM",
    tillTime: "05:00 PM",
  },
];

const AvaialbilityScheduleModal = () => {
  const { open, handleOpen, handleClose, mode, data } = useAvailabilityDialog();

  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {} as ScheduleFormValues,
  });

  const onSubmit = async (data: ScheduleFormValues) => {
    try {
      if (mode == "NEW") {
        await createNewSchedule(data);
        toast.success("New schedule created");
      } else {
        // console.log(data);
        await updatedSchedule(data);
        toast.success("Schedule updated successfully ");
      }
      form.reset();
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message || "Something went wrong while creating schedule"
        );
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (mode == "EDIT" && data) {
      form.reset({
        id: data.id,
        eventName: data.eventName,
        isDefault: data.isDefault,
        schedule: data.schedule,
      });
    } else {
      form.reset({
        eventName: "",
        isDefault: false,
        schedule: schedule,
      });
    }
  }, [mode, data, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value: boolean) =>
        !value ? handleClose() : handleOpen("NEW")
      }
    >
      <DialogTrigger asChild onClick={() => handleOpen("NEW")}>
        <Button>
          <Plus />
          New
        </Button>
      </DialogTrigger>

      <DialogDescription className="hidden" />
      {open && (
        <DialogContent className="max-w-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-bold text-xl">
              {mode == "EDIT" ? "Update Schedule" : "Add a new schedule"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-12">
                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="Working Hours"
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
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-6">
                      <FormLabel>Set to Default</FormLabel>
                      <FormControl>
                        <Switch
                          className="!mt-0"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                {form.watch("schedule").map((daySchedule, index) => (
                  <div key={index} className="flex items-center gap-2 h-10">
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.isActive`}
                      render={({ field }) => (
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked)
                            }
                          />
                        </FormControl>
                      )}
                    />

                    <div className="flex-1">
                      <label className="text-sm">{daySchedule.day}</label>
                    </div>

                    {daySchedule.isActive && (
                      <div className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name={`schedule.${index}.fromTime`}
                          render={({ field }) => (
                            <FormItem className="w-[150px]">
                              <Select
                                value={field.value} // Assuming timeSlots is an array
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {times.map((item) => (
                                    <SelectItem
                                      key={item.id}
                                      value={item.fromTime}
                                    >
                                      {item.fromTime}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`schedule.${index}.tillTime`}
                          render={({ field }) => (
                            <FormItem className="w-[150px]">
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {times.map((item) => (
                                    <SelectItem
                                      key={item.id}
                                      value={item.tillTime}
                                    >
                                      {item.tillTime}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end">
                <Button size="lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader className="animate-spin " />
                  )}
                  {/* {mode == "EDIT" ? "Update" : "Save"} */}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};
export default AvaialbilityScheduleModal;
