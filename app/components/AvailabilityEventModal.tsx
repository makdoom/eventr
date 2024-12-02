"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { scheduleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

const AvaialbilityEventModal = () => {
  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      eventName: "",
      isDefault: false,
      schedule: [
        {
          day: "Sunday",
          isActive: false,
          fromTime: "9:00am",
          tillTime: "5:00pm",
        },
        {
          day: "Monday",
          isActive: true,
          fromTime: "9:00am",
          tillTime: "5:00pm",
        },
        {
          day: "Tuesday",
          isActive: true,
          fromTime: "9:00am",
          tillTime: "5:00pm",
        },
        {
          day: "Wednesday",
          isActive: true,
          fromTime: "9:00am",
          tillTime: "5:00pm",
        },
        {
          day: "Thursday",
          isActive: true,
          fromTime: "9:00am",
          tillTime: "5:00pm",
        },
        {
          day: "Friday",
          isActive: true,
          fromTime: "9:00am",
          tillTime: "5:00pm",
        },
        {
          day: "Saturday",
          isActive: false,
          fromTime: "9:00am",
          tillTime: "5:00pm",
        },
      ],
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          New
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader className="my-4">
          <DialogTitle className="font-bold text-xl">
            Add a new schedule
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-2 "
            onSubmit={form.handleSubmit((data) => console.log(data))}
          >
            {form.watch("schedule").map((daySchedule, index) => (
              <div key={index} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`schedule.${index}.isActive`}
                  render={({ field }) => (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
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
                              <SelectItem value="9:00am">9:00am</SelectItem>
                              <SelectItem value="10:00am">10:00am</SelectItem>
                              <SelectItem value="11:00am">11:00am</SelectItem>
                              <SelectItem value="12:00am">12:00am</SelectItem>
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
                            value={field.value} // Assuming timeSlots is an array
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="9:00am">9:00am</SelectItem>
                              <SelectItem value="10:00am">10:00am</SelectItem>
                              <SelectItem value="11:00am">11:00am</SelectItem>
                              <SelectItem value="12:00am">12:00am</SelectItem>
                              <SelectItem value="5:00pm">5:00pm</SelectItem>
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

            <Button>Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AvaialbilityEventModal;
