import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type SignUpData = {
  status: string;
  main_image: string;
  nickname: string;
  age: number;
  gender: string;
  // email?: string;
  // password?: string;
  partner_nickname?: string;
};

type SignUpStore = {
  data: SignUpData;
  updateData: (newData: Partial<SignUpData>) => void;
  resetData: () => void;
};

export const useSignUpStore = create<SignUpStore>()(
  devtools(
    immer((set) => ({
      data: {
        status: "",
        main_image: "",
        nickname: "",
        age: 0,
        gender: "",
      },
      updateData: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
      resetData: () =>
        set({
          data: {
            status: "",
            main_image: "",
            nickname: "",
            age: 0,
            gender: "",
          },
        }),
    })),
    { name: "signupStore" }
  )
);
