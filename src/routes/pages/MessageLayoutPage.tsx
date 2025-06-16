import { Outlet, useLoaderData } from "react-router";
import MessagePage from "./MessagePage";

export default function MessageLayoutPage() {
  const { matchingUserProfile, matchedUserProfile } = useLoaderData() ?? {};
  return (
    <>
      <div className="w-[1150px] h-full mx-auto gap-10 flex my-[5vh]">
        <MessagePage
          matchingUserProfile={matchingUserProfile}
          matchedUserProfile={matchedUserProfile}
        />
        <div className="w-[878px] h-[804px] py-5 box-shadow-custom rounded-2xl items-center justify-center flex dark:bg-[var(--dark-bg-secondary)] ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
