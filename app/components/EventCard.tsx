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
import {
  copyEvent,
  deleteEvent,
  updateActiveEvent,
} from "../actions/events.action";
import { MouseEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEvent } from "@/store/eventStore";
import { useRouter } from "next/navigation";

type EventCardPropType = EventFormValues & { id: string; userName: string };

const EventCard = ({
  id,
  title,
  description,
  duration,
  isActive,
  userName,
  url,
  videoCallSoftware,
}: EventCardPropType) => {
  const { handleOpen, handleEventDialogData } = useEvent();
  const [isEventActive, setIsActive] = useState(isActive);
  const router = useRouter();

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

  const editEventHandler = () => {
    handleEventDialogData({
      id,
      title,
      url,
      description,
      isActive,
      duration,
      videoCallSoftware,
    });
    handleOpen("EDIT");
  };

  const deleteEventHandler = async () => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const copyEventHandler = async () => {
    try {
      await copyEvent(id);
      toast.success("Event copied successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const navigateHandler = () => router.push(`/${userName}/${url}`);

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow self-auto"
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigateHandler();
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {title.length > 25 ? `${title.slice(0, 25)}...` : title}
          </CardTitle>
          <Switch
            checked={isEventActive}
            value={+isEventActive}
            onCheckedChange={onChange}
          />
        </div>
        <CardDescription>
          {description?.length > 80
            ? `${description.slice(0, 80)}...`
            : description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center bg-secondary p-1 px-2 rounded-sm">
            <Clock className="mr-1 h-4 w-4" />
            <span className="text-xs">{duration} min</span>
          </div>
          <div className="flex items-center">
            <Video className="mr-1 h-4 w-4" />
            <span className="text-xs ">{videoCallSoftware}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center space-x-2">
          <Link href={`/${userName}/${url}`}>
            <Button variant="link" className="p-0">
              <LinkIcon />
              <span className="text-sm">Copy Link</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="z-50 outline-none bg-secondary  p-2 rounded-md group-hover:bg-primary-foreground"
            >
              <Button
                variant="outline"
                onClick={(e: MouseEvent) => e.stopPropagation()}
              >
                <Ellipsis className="!size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!mr-8 space-y-2">
              <DropdownMenuItem className="cursor-pointer">
                <button
                  className="flex items-center gap-2"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    editEventHandler();
                  }}
                >
                  <Pencil />
                  Edit
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <button
                  className="flex items-center gap-2"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    copyEventHandler();
                  }}
                >
                  <Copy />
                  Copy
                </button>
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
                <button
                  className="flex items-center gap-2"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    deleteEventHandler();
                  }}
                >
                  <Trash />
                  Delete
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
export default EventCard;
