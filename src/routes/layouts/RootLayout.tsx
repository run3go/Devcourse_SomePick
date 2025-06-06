import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
