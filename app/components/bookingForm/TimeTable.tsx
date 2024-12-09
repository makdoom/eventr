import { format } from "date-fns";
type TimeTableProp = {
  selectedDate: Date;
  availability: {
    id: string;
    eventName: string;
    schedule: { day: string; isActive: boolean }[];
  };
};

const TimeTable = ({ selectedDate, availability }: TimeTableProp) => {
  console.log(availability);
  return (
    <div>
      <p className="">
        {format(selectedDate, "EEEE")}

        <span className="ml-1 text-muted-foreground">
          {format(selectedDate, "d")}
        </span>
      </p>
    </div>
  );
};
export default TimeTable;
