import type { LoaderFunctionArgs } from "react-router";
import { fetchChatUsers, fetchMatchingUsers } from "../../apis/matching";
import { fetchProfile } from "../../apis/user";

export const getUserMessage = async ({ params }: LoaderFunctionArgs) => {
  const chatUserProfile = params.id ? await fetchProfile(params.id) : null;
  const matchingUserProfile = await fetchMatchingUsers();
  const matchedUserProfile = await fetchChatUsers();
  console.log("matchingUserProfile", matchingUserProfile);
  console.log("matchedUserProfile", matchedUserProfile);
  return {
    chatUserProfile,
    matchingUserProfile,
    matchedUserProfile,
  };
};
