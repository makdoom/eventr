"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EventDialog from "./EventDialog";
import { useEvent } from "@/store/eventStore";

const EventsHeader = () => {
  const { searchValue, setSearchValue } = useEvent();

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-xl font-semibold">Event Types</h1>
        <p className="text-sm text-muted-foreground">
          Create events to share for people to book on your calendar.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            value={searchValue}
            placeholder="Search events"
            className="pl-8 bg-secondary"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <EventDialog />
      </div>
    </div>
  );
};
export default EventsHeader;
