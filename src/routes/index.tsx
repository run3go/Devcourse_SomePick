import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import { fetchUserData } from "./loader/auth.loader";
import { getCoupleInfo } from "./loader/calendar.loader";
import { getUserProfile } from "./loader/user.loader";
import AuthPage from "./pages/AuthPage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MatchingPage from "./pages/MatchingPage";
// import MessageDetailPage from "./pages/MessageDetailPage";
import MessagePage from "./pages/MessagePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostsPage from "./pages/PostsPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpCouplePage from "./pages/SignUpCouplePage";
import SignUpPage from "./pages/SignUpPage";
import SignUpSoloStep1Page from "./pages/SignUpSoloStep1Page";
import SignUpSoloStep2Page from "./pages/SignUpSoloStep2Page";
import SignUpSoloStep3Page from "./pages/SignUpSoloStep3Page";
import TodayFortunePage from "./pages/TodayFortunePage";
import ChatRequestPage from "./pages/ChatRequestPage";
import ChatWaitingPage from "./pages/ChatWaitingPage";
import ChatRoomPage from "./pages/ChatRoomPage";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    loader: fetchUserData,
    children: [
      {
        path: "/",
        Component: MainPage,
      },
      {
        path: "/post/:channelName",
        Component: PostsPage,
      },
      {
        path: "/post/detail/:id",
        Component: PostDetailPage,
      },
      {
        path: "/post/create/:id?",
        Component: PostCreatePage,
      },
      {
        path: "/profile/edit",
        Component: ProfileEditPage,
      },
      {
        path: "/profile/:id",
        loader: getUserProfile,
        Component: ProfilePage,
      },
      {
        path: "/couplecalendar",
        loader: getCoupleInfo,
        Component: CalendarPage,
      },
      {
        path: "/matching",
        Component: MatchingPage,
      },
      {
        path: "/todayfortune",
        Component: TodayFortunePage,
      },
      {
        path: "/message",
        Component: MessagePage,
        children: [
          {
            path: ":id/request",
            Component: ChatRequestPage,
          },
          {
            path: ":id/room",
            Component: ChatRoomPage,
          },
          {
            path: ":id/waiting",
            Component: ChatWaitingPage,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthPage,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "signup",
        Component: SignUpPage,
      },
      {
        path: "signup/solo/1",
        Component: SignUpSoloStep1Page,
      },
      {
        path: "signup/solo/2",
        Component: SignUpSoloStep2Page,
      },
      {
        path: "signup/solo/3",
        Component: SignUpSoloStep3Page,
      },
      {
        path: "signup/couple",
        Component: SignUpCouplePage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
