import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CalendarStore = {
  targetDate: string;
  schedules: Schedule[];
  title: string;
  memo: string;
  setTargetDate: (date: string) => void;
  setSchedules: (schedules: Schedule[]) => void;
  addSchedule: (newSchedule: Schedule) => void;
  deleteSchedule: (id: number) => void;
  setTitle: (value: string) => void;
  setMemo: (value: string) => void;
};

export const useCalendarStore = create<CalendarStore>()(
  devtools(
    immer((set) => ({
      targetDate: "",
      schedules: [],
      title: "",
      memo: "",
      setTargetDate: (date) =>
        set((state) => {
          state.targetDate = date;
          state.title = "";
          state.memo = "";
        }),
      setSchedules: (schedules) =>
        set((state) => {
          state.schedules = [...schedules];
        }),
      addSchedule: (newSchedule) =>
        set((state) => {
          state.schedules.push(newSchedule);
        }),
      deleteSchedule: (id) =>
        set((state) => {
          state.schedules = state.schedules.filter(
            (schedule) => schedule.id !== id
          );
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
