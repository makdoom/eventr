import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Schedule } from "@prisma/client";
import { Copy, Ellipsis, Sparkle, Trash } from "lucide-react";
import {
  copyAvailabilityEvent,
  deleteAvailabilityEvent,
  updateDefaultEvent,
} from "../actions/availableTimes.action";
import { toast } from "sonner";

type ScheduleCardPropType = {
  id: string;
  eventName: string;
  isDefault: boolean;
  schedule: Schedule[];
  scheduleTimeList: string[];
};

const ScheduleCard = ({
  id,
  eventName,
  isDefault,
  scheduleTimeList,
}: ScheduleCardPropType) => {
  const onDelete = async () => {
    try {
      await deleteAvailabilityEvent(id);
      toast.success("Event deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const onCopy = async () => {
    try {
      await copyAvailabilityEvent(id);
      toast.success("Event copied successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const onUpdateDefault = async () => {
    try {
      await updateDefaultEvent(id);
      toast.success("Event updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="p-4 border rounded-md flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-4">
          <h3 className="font-medium">{eventName} </h3>
          {isDefault ? (
            <Badge className="text-xs rounded-sm">Default</Badge>
          ) : (
            ""
          )}
        </div>
        <div className="space-y-1 !mt-2">
          {scheduleTimeList.map((item, index) => (
            <p className="text-sm text-muted-foreground" key={index}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none bg-secondary p-3 rounded-md">
          <Ellipsis className="!size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="!mr-8 space-y-2">
          <DropdownMenuItem className="cursor-pointer">
            <form action={onUpdateDefault}>
              <button className="flex items-center gap-2">
                <Sparkle />
                Set as default
              </button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <form action={onCopy}>
              <button className="flex items-center gap-2">
                <Copy />
                Copy
              </button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <form action={onDelete}>
              <button className="flex items-center gap-2">
                <Trash />
                Delete
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ScheduleCard;
