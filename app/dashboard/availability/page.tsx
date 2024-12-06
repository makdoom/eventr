import { getUserSession } from "@/app/lib/hooks";
import { getAvailableSchedules } from "@/app/actions/availableSchedules.action";
import AvailabilityClient from "@/app/components/AvailabilityClient";

const Availability = async () => {
  const session = await getUserSession();
  const availabilityList = await getAvailableSchedules(
    session?.user?.id as string
  );

  return <AvailabilityClient availabilityList={availabilityList} />;
};
export default Availability;
