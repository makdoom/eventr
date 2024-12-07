import { EventFormValues } from "@/schemas";
import { create } from "zustand";

type Mode = "NEW" | "EDIT";

type EventStore = {
  open: boolean;
  mode: Mode | null;

  data?: EventFormValues | null;

  handleOpen: (mode: Mode) => void;
  handleClose: () => void;
  handleEventDialogData: (data: EventFormValues) => void;
};

export const useEvent = create<EventStore>((set) => ({
  open: false,
  mode: "NEW",
  data: null,

  handleOpen: (mode) => set({ open: true, mode }),
  handleClose: () => set({ open: false, mode: null }),
  handleEventDialogData: (data) => set({ data }),
}));
