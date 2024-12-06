"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { EventFormValues } from "@/schemas";
import {
  Clock,
  Copy,
  Ellipsis,
  Link as LinkIcon,
  Pencil,
  SquareArrowOutUpRight,
  Trash,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { updateActiveEvent } from "../actions/events.action";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type EventCardPropType = EventFormValues & { id: string };

const EventCard = ({
  id,
  title,
  description,
  duration,
  isActive,
  videoCallSoftware,
}: EventCardPropType) => {
  const [isEventActive, setIsActive] = useState(isActive);

  const onChange = async () => {
    setIsActive(!isEventActive);
    try {
      await updateActiveEvent(id, !isEventActive);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Switch
            checked={isEventActive}
            value={+isEventActive}
            onCheckedChange={onChange}
          />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center bg-secondary p-1 px-2 rounded-sm">
            <Clock className="mr-1 h-4 w-4" />
            <span className="text-xs font-semibold">{duration} min</span>
          </div>
          <div className="flex items-center">
            <Video className="mr-1 h-5 w-5" />
            <span className="text-xs font-semibold">{videoCallSoftware}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center space-x-2">
          <Link href="/">
            <Button variant="link" className="py-0">
              <LinkIcon />
              <span className="text-sm">Copy Link</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none bg-secondary  p-2 rounded-md group-hover:bg-primary-foreground">
              <Ellipsis className="!size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!mr-8 space-y-2">
              <DropdownMenuItem className="cursor-pointer">
                <form>
                  <button className="flex items-center gap-2">
                    <Pencil />
                    Edit
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <form>
                  <button className="flex items-center gap-2">
                    <Copy />
                    Copy
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <form>
                  <button className="flex items-center gap-2">
                    <SquareArrowOutUpRight />
                    Preview
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <form>
                  <button className="flex items-center gap-2">
                    <Trash />
                    Delete
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
export default EventCard;
