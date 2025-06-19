import { formatDate } from "date-fns";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CalendarStore = {
  targetDate: string;
  schedules: Schedule[];
  title: string;
  memo: string;
  id: number;
  setTargetDate: (date: string) => void;
  setSchedules: (schedules: Schedule[]) => void;
  addSchedule: (newSchedule: Schedule) => void;
  updateSchedule: (modifiedSchedule: Schedule) => void;
  removeSchedule: (id: number) => void;
  setTitle: (value: string) => void;
  setMemo: (value: string) => void;
  setId: (value: number) => void;
};

export const useCalendarStore = create<CalendarStore>()(
  devtools(
    immer((set) => ({
      targetDate: formatDate(new Date(), "yyyy-M-dd"),
      schedules: [],
      title: "",
      memo: "",
      id: 0,
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
      updateSchedule: (modifiedSchedule) =>
        set((state) => {
          state.schedules = state.schedules.map((schedule) =>
            schedule.id === modifiedSchedule.id ? modifiedSchedule : schedule
          );
        }),
      removeSchedule: (id) =>
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
      setId: (value) =>
        set((state) => {
          state.id = value;
        }),
    }))
  )
);
