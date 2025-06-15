import { useEffect, useState } from "react";

export default function TopButton() {
  const [isVisible, setIsvisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrollY:", window.scrollY);
      if (window.scrollY > 300) {
        setIsvisible(true);
      } else {
        setIsvisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-[50px] h-[50px] fixed bottom-20 right-20 bg-[var(--primary-pink)]
        text-[var(--white)] rounded-[10px] transition-all cursor-pointer shadow-lg hover:bg-[var(--primary-pink-tone)] z-50"
        >
          TOP
        </button>
      )}
    </>
  );
}
