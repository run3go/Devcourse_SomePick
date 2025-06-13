import type { LoaderFunctionArgs } from "react-router";
import { fetchChatUsers, fetchMatchingUsers } from "../../apis/matching";
import { fetchProfile } from "../../apis/user";

export const getUserMessage = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return;
  const chatUserProfile = await fetchProfile(params.id);
  const matchingUserProfile = await fetchMatchingUsers();
  const matchedUserProfile = await fetchChatUsers();
  return {
    chatUserProfile,
    matchingUserProfile,
    matchedUserProfile,
  };
};
