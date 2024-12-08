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
  let prevItem: Schedule | null = null;
  const finalStr = data.reduce((acc, curr, index) => {
    if (curr.isActive) {
      if (!prevItem) {
        acc += index ? `|${curr.day}` : `${curr.day}`;
      } else {
        const prevTimeStr = `${prevItem.fromTime}${prevItem.tillTime}`;
        const currTimestr = `${curr.fromTime}${curr.tillTime}`;

        if (prevTimeStr !== currTimestr) {
          if (acc.includes(prevItem.day)) {
            acc += `, ${prevItem.fromTime} - ${prevItem.tillTime}`;
          } else {
            acc += ` to ${prevItem.day}, ${prevItem.fromTime} - ${prevItem.tillTime}`;
          }

          acc += `|${curr.day}`;
        } else if (index == data.length - 1) {
          acc += ` to ${curr.day}, ${curr.fromTime} - ${curr.tillTime}`;
        }
      }

      prevItem = curr;
    } else {
      if (acc.length) {
        if (prevItem && !acc.includes(prevItem?.day)) {
          acc += ` to ${prevItem?.day}, ${prevItem?.fromTime} - ${prevItem?.tillTime}`;
        } else if (prevItem?.isActive) {
          acc += `, ${prevItem?.fromTime} - ${prevItem?.tillTime}`;
        }
      }
      prevItem = null;
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
          autoFocus
          className="max-w-xs bg-secondary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col gap-2 h-[calc(100vh-190px)] overflow-auto no-scrollbar">
          {filteredList.length == 0 && (
            <div className="text-center mt-16">
              <p>
                No event found {searchTerm ? `related to "${searchTerm}"` : ""}
              </p>
            </div>
          )}
          {filteredList.map((item) => (
            <ScheduleCard
              key={item.id}
              id={item.id}
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
