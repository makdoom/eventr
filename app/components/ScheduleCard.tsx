import { Schedule } from "@prisma/client";

type ScheduleCardPropType = {
  eventName: string;
  isDefault: boolean;
  schedule: Schedule[];
};

const ScheduleCard = ({
  eventName,
  isDefault,
  schedule,
}: ScheduleCardPropType) => {
  return (
    <div className="p-4 border rounded-md">
      <div>
        <h3 className="text-sm">{eventName}</h3>
      </div>
    </div>
  );
};
export default ScheduleCard;
