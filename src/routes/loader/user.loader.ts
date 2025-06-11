import type { LoaderFunctionArgs } from "react-router";
import { fetchFollowerList, fetchFollowingList } from "../../apis/follow";
import { fetchPostsByAuthorId } from "../../apis/posts/fetchPosts";
import { fetchProfile } from "../../apis/user";

export const getUserProfile = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return;
  const userProfile = await fetchProfile(params.id);
  const posts = await fetchPostsByAuthorId(params.id);
  const followers = await fetchFollowerList(params.id);
  const followings = await fetchFollowingList(params.id);
  return {
    userProfile,
    posts,
    followers: followers?.map((user) => user.follower),
    followings: followings?.map((user) => user.following),
  };
};
