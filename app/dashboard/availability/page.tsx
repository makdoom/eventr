import { getUserSession } from "@/app/lib/hooks";
import { getAvailableTimes } from "@/app/actions/availableTimes.action";
import AvailabilityClient from "./AvailabilityClient";

const Availability = async () => {
  const session = await getUserSession();
  const availabilityList = await getAvailableTimes(session?.user?.id as string);

  return <AvailabilityClient availabilityList={availabilityList} />;
};
export default Availability;
