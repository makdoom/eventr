"use client";

import { useEvent } from "@/store/eventStore";
import EventCard from "./EventCard";
import { useMemo } from "react";

type EventListPropType = {
  eventList: {
    id: string;
    title: string;
    isActive: boolean;
    description: string;
    url: string;
    duration: number;
    videoCallSoftware: string;
  }[];
};

const EventLists = ({ eventList }: EventListPropType) => {
  const { searchValue } = useEvent();

  const filteredList = useMemo(() => {
    return eventList.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [eventList, searchValue]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  grid-rows-auto overflow-auto w-full ">
      {filteredList?.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
export default EventLists;
