import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CalendarStore = {
  schedules: Schedule[];
  title: string;
  memo: string;
  addSchedule: (newSchedule: Schedule) => void;
  deleteSchedule: (oldSchedule: Schedule) => void;
  setTitle: (value: string) => void;
  setMemo: (value: string) => void;
};

export const useCalendarStore = create<CalendarStore>()(
  devtools(
    immer((set) => ({
      schedules: [],
      title: "",
      memo: "",
      addSchedule: (newSchedule: Schedule) =>
        set((state) => {
          state.schedules.push(newSchedule);
        }),
      deleteSchedule: (oldSchedule: Schedule) =>
        set((state) => {
          state.schedules.filter((schedule) => schedule.id !== oldSchedule.id);
        }),
      setTitle: (value) =>
        set((state) => {
          state.title = value;
        }),
      setMemo: (value) =>
        set((state) => {
          state.memo = value;
        }),
    }))
  )
);
