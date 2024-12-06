import { create } from "zustand";

type Mode = "NEW" | "EDIT";

type EventStore = {
  open: boolean;
  mode: Mode | null;

  //   data?: ScheduleFormValues | null;

  handleOpen: (mode: Mode) => void;
  handleClose: () => void;
  //   handleDialogData: (data: ScheduleFormValues) => void;
};

export const useEvent = create<EventStore>((set) => ({
  open: false,
  mode: "NEW",
  //   data: null,

  handleOpen: (mode) => set({ open: true, mode }),
  handleClose: () => set({ open: false, mode: null }),
  //   handleDialogData: (data) => set({ data }),
}));
