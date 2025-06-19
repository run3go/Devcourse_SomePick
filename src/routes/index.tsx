import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import {
  fetchUserData,
  requireAuth,
  requireNoAuth,
} from "./loader/auth.loader";
import { getCoupleInfo } from "./loader/calendar.loader";
import { getUserMessage } from "./loader/message.loader";
import { getUserProfile } from "./loader/user.loader";
import AuthCallback from "./pages/AuthCallback";
import AuthPage from "./pages/AuthPage";
import Back from "./pages/Back";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MatchingPage from "./pages/MatchingPage";
import ChatEmptyPage from "./pages/message/ChatEmptyPage";
import ChatRequestPage from "./pages/message/ChatRequestPage";
import ChatRoomPage from "./pages/message/ChatRoomPage";
import ChatWaitingPage from "./pages/message/ChatWaitingPage";
import MessageLayoutPage from "./pages/message/MessageLayoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostCreatePage from "./pages/post/PostCreatePage";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostsPage from "./pages/post/PostsPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpCouplePage from "./pages/signup/SignUpCouplePage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignUpSoloStep1Page from "./pages/signup/SignUpSoloStep1Page";
import SignUpSoloStep2Page from "./pages/signup/SignUpSoloStep2Page";
import SignUpSoloStep3Page from "./pages/signup/SignUpSoloStep3Page";
import TodayFortunePage from "./pages/TodayFortunePage";

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
        loader: requireAuth,
        Component: PostCreatePage,
      },
      {
        path: "/profile/edit",
        loader: requireAuth,
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
        loader: requireAuth,
        Component: MatchingPage,
      },
      {
        path: "/todayfortune",
        loader: requireAuth,
        Component: TodayFortunePage,
      },
      {
        path: "/message",
        loader: getUserMessage,
        Component: MessageLayoutPage,
        children: [
          {
            index: true,
            Component: ChatEmptyPage,
          },
          {
            path: ":id/request",
            loader: getUserMessage,
            Component: ChatRequestPage,
          },
          {
            path: ":id",
            loader: getUserMessage,
            Component: ChatRoomPage,
          },
          {
            path: ":id/waiting",
            loader: getUserMessage,
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
      { path: "callback", Component: AuthCallback },
      {
        path: "login",
        loader: requireNoAuth,
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
    path: "/back",
    Component: Back,
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
