import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type SignUpData = SoloOptions | CoupleOptions;

type SignUpStore = {
  data: SignUpData;
  updateData: (newData: Partial<SignUpData>) => void;
  resetData: (status?: "solo" | "couple") => void;

  id: string;
  setId: (id: string) => void;

  mainImgFile: File | null;
  mainImgUrl: string;
  setMainImgFile: (file: File | null, url?: string) => void;

  subImgFile: File | null;
  subImgUrl: string;
  setSubImgFile: (file: File | null, url?: string) => void;

  email: string;
  setEmail: (email: string) => void;

  pw: string;
  setPw: (pw: string) => void;

  birthDate: string;
  setBirthDate: (birthDate: string) => void;

  genderNum: string;
  setGenderNum: (genderNum: string) => void;
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
                  status: "solo",
                  main_image: "",
                  nickname: "",
                  age: 0,
                  gender: "",

                  sub_image: "",
                  job: "",
                  // height: 0,
                  location: "",
                  mbti: "",
                  keywords: "",
                  interests: "",
                  ideal_types: "",
                },
          mainImgFile: null,
          mainImgUrl: "",
          subImgFile: null,
          subImgUrl: "",
          email: "",
          pw: "",
          birthDate: "",
          genderNum: "",
        })),
      id: "",
      setId: (id) => set({ id }),

      mainImgFile: null,
      mainImgUrl: "",
      setMainImgFile: (file, url = "") =>
        set({ mainImgFile: file, mainImgUrl: url }),
      subImgFile: null,
      subImgUrl: "",
      setSubImgFile: (file, url = "") =>
        set({ subImgFile: file, subImgUrl: url }),
      email: "",
      setEmail: (string) => set({ email: string }),
      pw: "",
      setPw: (string) => set({ pw: string }),
      birthDate: "",
      setBirthDate: (string) => set({ birthDate: string }),
      genderNum: "",
      setGenderNum: (string) => set({ genderNum: string }),
      // resetPartialData: (keys) => set((state) => {
      //   keys.forEach((key) => {
      //     const value = state.data[key];
      //     if(typeof value === 'string') {
      //       state.data[key] = "";
      //     }
      //   })
      // })
    })),
    { name: "signUpStore" }
  )
);
