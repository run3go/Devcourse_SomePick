import { create } from "zustand";

interface UploadImageStore {
  image: File[];
  setImage: (file: File[]) => void;
  clearImage: () => void;
}

export const useUploadImageStore = create<UploadImageStore>((set) => ({
  image: [],
  setImage: (file) => set({ image: file }),
  clearImage: () => set({ image: [] }),
}));
