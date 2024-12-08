"use client";

import { DateValue } from "@react-types/calendar";
import Calendar from "./Calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

type RenderCalendarType = {
  availability: {
    id: string;
    eventName: string;
    schedule: { day: string; isActive: boolean }[];
  };
};

const RenderCalendar = ({ availability }: RenderCalendarType) => {
  console.log(availability);

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

    return !availability.schedule?.[dayOfWeek]?.isActive;
  };
  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
    />
  );
};
export default RenderCalendar;
