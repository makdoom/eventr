import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Schedule } from "@prisma/client";
import { Copy, Ellipsis, Trash } from "lucide-react";

type ScheduleCardPropType = {
  eventName: string;
  isDefault: boolean;
  schedule: Schedule[];
  scheduleTimeList: string[];
};

const ScheduleCard = ({
  eventName,
  isDefault,
  scheduleTimeList,
}: ScheduleCardPropType) => {
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
        <Button size="icon" variant="secondary">
          <DropdownMenuTrigger className="outline-none">
            <Ellipsis className="!size-5" />
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent className="!mr-8 space-y-2">
          <DropdownMenuItem className="cursor-pointer">
            <Copy />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ScheduleCard;
