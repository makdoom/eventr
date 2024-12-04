"use client";

import AvailabilityHeader from "@/app/components/AvailabilityHeader";
import ScheduleCard from "@/app/components/ScheduleCard";
import { Input } from "@/components/ui/input";
import { Schedule } from "@prisma/client";
import { useMemo, useState } from "react";

type AvailabilityClientPropType = {
  availabilityList: {
    id: string;
    eventName: string;
    isDefault: boolean;
    schedule: Schedule[];
  }[];
};

const getFormattedTimeStr = (data: Schedule[]) => {
  const filtered = data.filter((item) => item.isActive);
  const finalStr = filtered.reduce((acc, curr, index) => {
    if (curr.isActive && !acc) {
      acc += `${curr.day} `;
    }

    if (index !== 0 && curr.isActive) {
      const prevItem = filtered[index - 1];
      const prevTimeStr = `${prevItem.fromTime}-${prevItem.tillTime}`;
      const currTimeStr = `${curr.fromTime}-${curr.tillTime}`;

      if (prevTimeStr !== currTimeStr) {
        if (!acc.includes(prevItem.day)) {
          acc += ` to ${prevItem.day}, ${prevItem.fromTime} - ${prevItem.tillTime}`;
        } else {
          acc += ` ${prevItem.fromTime} - ${prevItem.tillTime}`;
        }

        acc += `|${curr.day} - `;
        if (index == filtered.length - 1) {
          acc += `${curr.fromTime} - ${curr.tillTime}`;
        }
      } else if (index == filtered.length - 1) {
        acc += ` to ${curr.day}, ${curr.fromTime}  -  ${curr.tillTime}`;
      }
    }

    return acc;
  }, "");

  return finalStr.split("|");
};

const AvailabilityClient = ({
  availabilityList,
}: AvailabilityClientPropType) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered availability list based on search term
  const filteredList = useMemo(() => {
    return availabilityList.filter((item) =>
      item.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availabilityList, searchTerm]);

  return (
    <div className="p-1">
      <AvailabilityHeader />

      <div className="flex flex-col gap-4 mt-10">
        <Input
          placeholder="Search event"
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col gap-2 h-[calc(100vh-190px)] overflow-auto no-scrollbar">
          {filteredList.map((item) => (
            <ScheduleCard
              key={item.id}
              eventName={item.eventName}
              isDefault={item.isDefault}
              schedule={item.schedule}
              scheduleTimeList={getFormattedTimeStr(item.schedule)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AvailabilityClient;
