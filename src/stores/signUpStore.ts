import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type SignUpData = SoloOptions | CoupleOptions;

type SignUpStore = {
  data: SignUpData;
  updateData: (newData: Partial<SignUpData>) => void;
  resetData: (status?: "solo" | "couple") => void;
  mainImgFile: File | null;
  setMainImgFile: (file: File | null) => void;
  subImgFile: File | null;
  setSubImgFile: (file: File | null) => void;
  email: string;
  setEmail: (email: string) => void;
  pw: string;
  setPw: (pw: string) => void;
  // resetPartialData: (keys: (keyof SignUpData)[]) => void;
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
        keywords: "",
        interests: "",
        ideal_types: "",
      },
      updateData: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
      resetData: (status) =>
        set(() => ({
          data:
            status === "couple"
              ? {
                  status: "couple",
                  main_image: "",
                  nickname: "",
                  age: 0,
                  gender: "",
                }
              : {
                  status: "",
                  main_image: "",
                  nickname: "",
                  age: 0,
                  gender: "",

                  sub_image: "",
                  job: "",
                  height: 0,
                  location: "",
                  mbti: "",
                  keywords: "",
                  interests: "",
                  ideal_types: "",
                },
          mainImgFile: null,
          subImgFile: null,
          email: "",
          pw: "",
        })),
      mainImgFile: null,
      setMainImgFile: (file) => set({ mainImgFile: file }),
      subImgFile: null,
      setSubImgFile: (file) => set({ subImgFile: file }),
      email: "",
      setEmail: (string) => set({ email: string }),
      pw: "",
      setPw: (string) => set({ pw: string }),

      // resetPartialData: (keys) => set((state) => {
      //   keys.forEach((key) => {
      //     const value = state.data[key];
      //     if(typeof value === 'string') {
      //       state.data[key] = "";
      //     }
      //   })
      // })
    })),
    { name: "signupStore" }
  )
);
