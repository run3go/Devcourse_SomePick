import { redirect, type LoaderFunctionArgs } from "react-router";
import { fetchChatUsers, fetchMatchingUsers } from "../../apis/matching";
import { fetchProfile } from "../../apis/user";
import supabase from "../../utils/supabase";

export const getUserMessage = async ({ params }: LoaderFunctionArgs) => {
  const chatUserProfile = params.id ? await fetchProfile(params.id) : null;
  const matchingUserProfile = await fetchMatchingUsers();
  const matchedUserProfile = await fetchChatUsers();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  return {
    chatUserProfile,
    matchingUserProfile,
    matchedUserProfile,
  };
};
