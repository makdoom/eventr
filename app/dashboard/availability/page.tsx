import { getUserSession } from "@/app/lib/hooks";
import prisma from "@/app/lib/db";
// import { notFound } from "next/navigation";
import AvailabilityHeader from "./AvailabilityHeader";
import ScheduleCard from "@/app/components/ScheduleCard";

const getAvailableTimes = async (userId: string) => {
  const data = await prisma.availabilitySchedule.findMany({
    where: { userId },
    select: {
      id: true,
      eventName: true,
      isDefault: true,
      schedule: true,
      createdAt: true,
    },
  });
  return data;
};

const Availability = async () => {
  const session = await getUserSession();
  const availabilityList = await getAvailableTimes(session?.user?.id as string);

  console.log(availabilityList);
  return (
    <div className="p-1">
      <AvailabilityHeader />

      <div className="mt-12">
        {availabilityList.map((item) => (
          <ScheduleCard
            key={item.id}
            eventName={item.eventName}
            isDefault={item.isDefault}
            schedule={item.schedule}
          />
        ))}
        {/* {data.length ? <p>Data Present</p> : <p>Data not found</p>} */}
      </div>
    </div>
  );
};
export default Availability;
