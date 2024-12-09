import { FocusableElement, DOMAttributes } from "@react-types/shared";
import { type CalendarState } from "react-stately";
import { type AriaButtonProps } from "@react-aria/button";
import { useDateFormatter, VisuallyHidden } from "react-aria";
import CalendarButton from "./CalendarButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarHeaderPropType = {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
};

const CalendarHeader = ({
  state,
  calendarProps,
  nextButtonProps,
  prevButtonProps,
}: CalendarHeaderPropType) => {
  const monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  const [monthName, , year] = monthDateFormatter
    .formatToParts(state.visibleRange.start.toDate(state.timeZone))
    .map((part) => part.value);

  return (
    <div className="flex items-center pb-4">
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>

      <h2 className="font-semibold flex-1">
        {monthName}
        <span className="text-muted-foreground text-sm font-medium ml-2">
          {year}
        </span>
      </h2>

      <div className="flex items-center gap-2">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeft className="size-4" />
        </CalendarButton>

        <CalendarButton {...nextButtonProps}>
          <ChevronRight className="size-4" />
        </CalendarButton>
      </div>
    </div>
  );
};
export default CalendarHeader;
