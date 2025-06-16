import { v4 as uuid } from "uuid";
import supabase from "../utils/supabase";

export const storeImage = async (imageFile: File, type: string) => {
  try {
    const newFileName = uuid();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${type}/${newFileName}`, imageFile);
    if (error) {
      console.log("이미지 업로드 실패:", error);
      return;
    }
    const res = supabase.storage.from("images").getPublicUrl(data.path);
    return res.data.publicUrl;
  } catch (e) {
    console.error(e);
  }
};

export const deleteImage = async (imageUrl: string, type: string = "temp") => {
  try {
    const path = imageUrl.substring(imageUrl.indexOf(type));
    const { error } = await supabase.storage.from("images").remove([path]);
    if (error) {
      console.log("이미지 삭제 실패");
    }
  } catch (e) {
    console.error(e);
  }
};
