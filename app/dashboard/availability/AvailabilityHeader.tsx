import AvaialbilityEventModal from "@/app/components/AvailabilityEventModal";

const AvailabilityHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Add a new schedule</h2>
        <p className="text-sm">
          Configure times when you are available for bookings.
        </p>
      </div>

      <AvaialbilityEventModal />
    </div>
  );
};
export default AvailabilityHeader;
