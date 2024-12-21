"use client";

import { DateValue } from "@react-types/calendar";
import Calendar from "./Calendar";
import {
  today,
  getLocalTimeZone,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type RenderCalendarType = {
  availability: {
    id: string;
    eventName: string;
    schedule: { day: string; isActive: boolean }[];
  };
};

const RenderCalendar = ({ availability }: RenderCalendarType) => {
  console.log(availability);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = useState(() => {
    const dateParams = searchParams.get("date");

    return dateParams ? parseDate(dateParams) : today(getLocalTimeZone());
  });

  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);

    const url = new URL(window.location.href);
    url.searchParams.set("date", date.toString());
    router.push(url.toString());
  };

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

    return !availability.schedule?.[dayOfWeek]?.isActive;
  };

  useEffect(() => {
    const dateParams = searchParams.get("date");
    if (dateParams) {
      setDate(parseDate(dateParams));
    }
  }, [searchParams]);

  return (
    availability?.schedule && (
      <Calendar
        minValue={today(getLocalTimeZone())}
        isDateUnavailable={isDateUnavailable}
        value={date}
        onChange={handleDateChange}
      />
    )
  );
};
export default RenderCalendar;
