import { Outlet, useNavigation } from "react-router";
import ScrollToTop from "../../components/common/ScrollToTop";
import LoadingPage from "../pages/LoadingPage";
import Header from "./Header";

export default function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Header />
          <Outlet />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}
