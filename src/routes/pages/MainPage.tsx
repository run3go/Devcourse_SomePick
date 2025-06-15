import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { checkHasProfile } from "../../apis/auth";
import Dictionary from "../../components/main/Dictionary";
import MainCalendar from "../../components/main/MainCalendar";
import MainFortune from "../../components/main/MainFortune";
import Meeting from "../../components/main/Meeting";
import NearFooter from "../../components/main/NearFooter";
import Service from "../../components/main/Service";
import supabase from "../../utils/supabase";
import Footer from "../layouts/Footer";
import TopButton from "../../components/common/TopButton";

export default function MainPage() {
  const navigate = useNavigate();

  const dictionaryRef = useRef<HTMLDivElement | null>(null);
  const meetingRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const fortuneRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION") {
        const userId = session?.user.id;
        if (userId) {
          const data = await checkHasProfile(userId);
          if (!data?.nickname) {
            navigate("/auth/signup", { state: data });
          }
        }
      }
    });
  }, [navigate]);
  return (
    <>
      <div className="select-none dark:bg-[var(--dark-bg-primary)]">
        <TopButton />
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
