import { getUserSession } from "@/app/lib/hooks";
import AvailabilityHeader from "./AvailabilityHeader";
import ScheduleCard from "@/app/components/ScheduleCard";
import { getAvailableTimes } from "@/app/actions/availableTimes.action";
import { Schedule } from "@prisma/client";

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

const Availability = async () => {
  const session = await getUserSession();
  const availabilityList = await getAvailableTimes(session?.user?.id as string);

  return (
    <div className="p-1">
      <AvailabilityHeader />

      <div className="mt-12 flex flex-col gap-2">
        {availabilityList.map((item) => (
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
  );
};
export default Availability;
