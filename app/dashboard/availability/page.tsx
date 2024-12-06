import { getAvailableSchedules } from "@/app/actions/availableSchedules.action";
import AvailabilityClient from "@/app/dashboard/availability/AvailabilityClient";
import { getUserSession } from "@/app/lib/hooks";

const Availability = async () => {
  const session = await getUserSession();
  const availabilityList = await getAvailableSchedules(
    session?.user?.id as string
  );

  return <AvailabilityClient availabilityList={availabilityList} />;
};
export default Availability;
