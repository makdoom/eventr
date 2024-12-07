import { EventFormValues } from "@/schemas";
import { create } from "zustand";

type Mode = "NEW" | "EDIT";

type EventStore = {
  open: boolean;
  mode: Mode | null;
  searchValue: string;

  data?: EventFormValues | null;

  handleOpen: (mode: Mode) => void;
  handleClose: () => void;
  handleEventDialogData: (data: EventFormValues) => void;
  setSearchValue: (value: string) => void;
};

export const useEvent = create<EventStore>((set) => ({
  open: false,
  mode: "NEW",
  data: null,
  searchValue: "",

  handleOpen: (mode) => set({ open: true, mode }),
  handleClose: () => set({ open: false, mode: null }),
  handleEventDialogData: (data) => set({ data }),
  setSearchValue: (value) => set({ searchValue: value }),
}));
