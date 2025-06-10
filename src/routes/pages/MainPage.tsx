import Service from "../../components/main/Service";
import Dictionary from "../../components/main/Dictionary";
import MainFortune from "../../components/main/MainFortune";
import Meeting from "../../components/main/Meeting";
import NearFooter from "../../components/main/NearFooter";
import MainCalendar from "../../components/main/MainCalendar";
import Footer from "../layouts/Footer";
import { useRef } from "react";

export default function MainPage() {
  const dictionaryRef = useRef<HTMLDivElement | null>(null);
  const meetingRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const fortuneRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <>
      <div className="select-none">
        <Service
          onClickDictionary={() => scrollToSection(dictionaryRef)}
          onClickMeeting={() => scrollToSection(meetingRef)}
          onClickCalendar={() => scrollToSection(calendarRef)}
          onClickFortune={() => scrollToSection(fortuneRef)}
        />
        <div ref={dictionaryRef}>
          <Dictionary />
        </div>
        <div ref={meetingRef}>
          <Meeting />
        </div>
        <div ref={calendarRef}>
          <MainCalendar />
        </div>
        <div ref={fortuneRef}>
          <MainFortune />
        </div>
        <NearFooter />
        <Footer />
      </div>
    </>
  );
}
