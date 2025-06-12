import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type SignUpData = {
  status: "solo" | "couple";
  main_image: string;
  nickname: string;
  age: number;
  gender: "male" | "female";
  partner_nickname?: string;
};

type SignUpStore = {
  data: SignUpData;
  updateData: (newData: Partial<SignUpData>) => void;
  resetData: () => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
};

export const useSignUpStore = create<SignUpStore>()(
  devtools(
    immer((set) => ({
      data: {
        status: "solo",
        main_image: "",
        nickname: "",
        age: 0,
        gender: "male",
      },
      updateData: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
      resetData: () =>
        set({
          data: {
            status: "solo",
            main_image: "",
            nickname: "",
            age: 0,
            gender: "male",
          },
        }),
      imageFile: null,
      setImageFile: (file) => set({ imageFile: file }),
    })),
    { name: "signupStore" }
  )
);
