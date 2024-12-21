import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { nylas } from "@/lib/nylas";
import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import Link from "next/link";
import { GetFreeBusyResponse, NylasResponse } from "nylas";

type TimeTableProp = {
  selectedDate: Date;
  userName: string;
  duration: number;
};

const getData = async (userName: string, selectedDate: Date) => {
  const currentDay = format(selectedDate, "EEEE");

  const startDay = new Date(selectedDate);
  startDay.setHours(0, 0, 0, 0);

  const endDay = new Date(selectedDate);
  endDay.setHours(23, 59, 59, 999);

  const data = await prisma.$transaction(async (tx) => {
    const data = await tx.availabilitySchedule.findFirst({
      where: {
        isDefault: true,
        User: {
          username: userName,
        },
      },
      select: {
        id: true,
        User: {
          select: {
            grantEmail: true,
            grantId: true,
          },
        },
      },
    });

    const scheduleData = await tx.schedule.findFirst({
      where: { availabilityScheduleId: data?.id, day: currentDay },
      select: {
        id: true,
        day: true,
        fromTime: true,
        tillTime: true,
      },
    });

    return { ...scheduleData, ...data?.User };
  });

  // Check is user busy on this day
  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data.grantId as string,
    requestBody: {
      startTime: Math.floor(startDay.getTime() / 1000),
      endTime: Math.floor(endDay.getTime() / 1000),
      emails: [data.grantEmail as string],
    },
  });

  return { data, nylasCalendarData };
};

const calculateTimeSlots = (
  date: string,
  dbAvailaibilty: { fromTime: string; tillTime: string },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) => {
  const now = new Date();
  console.log(dbAvailaibilty);
  const availableFrom = parse(
    `${date} ${dbAvailaibilty.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const availableTill = parse(
    `${date} ${dbAvailaibilty.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const busySlot = nylasData.data[0]?.timeSlots.map((slot) => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));

  const allSlots = [];
  let currentSlots = availableFrom;
  while (isBefore(currentSlots, availableTill)) {
    allSlots.push(currentSlots);
    currentSlots = addMinutes(currentSlots, duration);
  }

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);

    return (
      isAfter(slot, now) &&
      !busySlot.some(
        (busy: { start: string; end: string }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
          (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });

  return freeSlots.map((slot) => format(slot, "HH:mm"));
};

const TimeTable = async ({
  selectedDate,
  userName,
  duration,
}: TimeTableProp) => {
  const { data, nylasCalendarData } = await getData(userName, selectedDate);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailaibiltyTime = {
    fromTime: format(
      parse(data.fromTime as string, "hh:mm a", new Date()),
      "HH:mm"
    ),
    tillTime: format(
      parse(data.tillTime as string, "hh:mm a", new Date()),
      "HH:mm"
    ),
  };
  const availableSlots = calculateTimeSlots(
    formattedDate,
    dbAvailaibiltyTime,
    nylasCalendarData,
    duration
  );

  console.log("hello", availableSlots);
  return (
    <div>
      <p className="">
        {format(selectedDate, "EEE MMMM ")},
        <span className="ml-1 text-muted-foreground">
          {format(selectedDate, "d")}
        </span>
      </p>

      <div className="mt-3 max-h-[450px] overflow-auto flex flex-col gap-2">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              key={index}
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
            >
              <Button className="w-full" variant="outline">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No time slots found</p>
        )}
      </div>
    </div>
  );
};
export default TimeTable;
