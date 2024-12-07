"use client";

import { useEvent } from "@/store/eventStore";
import EventCard from "./EventCard";
import { useMemo } from "react";

type EventListPropType = {
  userName: string;
  events: {
    id: string;
    title: string;
    isActive: boolean;
    description: string;
    url: string;
    duration: number;
    videoCallSoftware: string;
  }[];
};

const EventLists = ({ userName, events }: EventListPropType) => {
  const { searchValue } = useEvent();

  const filteredList = useMemo(() => {
    return events.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [events, searchValue]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  grid-rows-auto overflow-auto w-full ">
      {filteredList?.map((event) => (
        <EventCard key={event.id} {...event} userName={userName} />
      ))}
    </div>
  );
};
export default EventLists;
