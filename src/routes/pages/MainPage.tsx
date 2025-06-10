import Service from "../../components/main/Service";
import Dictionary from "../../components/main/Dictionary";
import MainFortune from "../../components/main/MainFortune";
import Meeting from "../../components/main/Meeting";
import NearFooter from "../../components/main/NearFooter";
import MainCalendar from "../../components/main/MainCalendar";
import Footer from "../layouts/Footer";
export default function MainPage() {
  return (
    <>
      <div className="select-none">
        <Service />
        <Dictionary />
        <Meeting />
        <MainCalendar />
        <MainFortune />
        <NearFooter />
        <Footer />
      </div>
    </>
  );
}
