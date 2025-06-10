import type { LoaderFunctionArgs } from "react-router";
import { fetchPostsByAuthorId } from "../../apis/posts/fetchPosts";
import { fetchProfile } from "../../apis/user";

export const getUserProfile = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return;
  const userProfile = await fetchProfile(params.id);
  const posts = await fetchPostsByAuthorId(params.id);
  return { userProfile, posts };
};
