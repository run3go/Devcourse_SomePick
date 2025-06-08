import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import AuthPage from "./pages/AuthPage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MatchingPage from "./pages/MatchingPage";
import MessageDetailPage from "./pages/MessageDetailPage";
import MessagePage from "./pages/MessagePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostsPage from "./pages/PostsPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import TodayFortunePage from "./pages/TodayFortunePage";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: MainPage,
      },
      {
        path: "/post/:id",
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
        path: "/profile/:id",
        Component: ProfilePage,
      },
      {
        path: "/couplecalendar",
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
            path: ":id",
            Component: MessageDetailPage,
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
        Component: SignUpPage,
      },
      {
        path: "signup/solo/2",
        Component: SignUpPage,
      },
      {
        path: "signup/couple",
        Component: SignUpPage,
      },
    ],
  },
  {
    path: "/*",
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
