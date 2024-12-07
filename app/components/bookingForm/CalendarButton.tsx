import { Button } from "@/components/ui/button";
import { useRef } from "react";
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from "react-aria";
import { type CalendarState } from "react-stately";

type CalendarButtonPropType = AriaButtonProps<"button"> & {
  state?: CalendarState;
  side?: "left" | "right";
};

const CalendarButton = (props: CalendarButtonPropType) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing();

  return (
    <Button
      size="icon"
      variant="outline"
      ref={ref}
      disabled={props.isDisabled}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </Button>
  );
};
export default CalendarButton;
