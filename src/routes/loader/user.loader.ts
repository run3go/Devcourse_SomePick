import type { LoaderFunctionArgs } from "react-router";
import { fetchFollowerList, fetchFollowingList } from "../../apis/follow";
import { fetchPostsByAuthorId } from "../../apis/posts/fetchPosts";
import { fetchProfile } from "../../apis/user";

export const getUserProfile = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return;
  const [userProfile, posts, followers, followings] = await Promise.all([
    fetchProfile(params.id),
    fetchPostsByAuthorId(params.id),
    fetchFollowerList(params.id),
    fetchFollowingList(params.id),
    new Promise((resolve) =>
      setTimeout(() => {
        resolve("");
      }, 500)
    ),
  ]);

  return {
    userProfile,
    posts,
    followers: followers?.map((user) => user.follower),
    followings: followings?.map((user) => user.following),
  };
};
