import type { LoaderFunctionArgs } from "react-router";
import { fetchProfile } from "../../apis/user";

export const getUserProfile = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return;
  const profile = await fetchProfile(params.id);
  return profile;
};
