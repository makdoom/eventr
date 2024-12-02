import { getUserSession } from "@/app/lib/hooks";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import AvailabilityHeader from "./AvailabilityHeader";

const getAvailableTimes = async (userId: string) => {
  const data = await prisma.availability.findMany({ where: { id: userId } });
  if (!data) return notFound();

  return data;
};

const Availability = async () => {
  const session = await getUserSession();
  const data = await getAvailableTimes(session?.user?.id as string);

  console.log(data);
  return (
    <div className="p-1">
      <AvailabilityHeader />

      <div className="mt-12">
        {data.length ? <p>Data Present</p> : <p>Data not found</p>}
      </div>
    </div>
  );
};
export default Availability;
