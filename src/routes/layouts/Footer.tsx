import whiteLogo from "../../assets/images/logo_white.png";
import { IoLogoGithub } from "react-icons/io5";
// footer
export default function Footer() {
  return (
    <>
      <footer className="bg-[#304463] dark:bg-[#1A1A1A]">
        <div className="w-full text-white min-h-[200px] overflow-hidden">
          <div className="items-center ml-[110px] pt-[40px] relative">
            <img src={whiteLogo} alt="logo" className="w-[150px] h-[150px]" />
            <p className="absolute top-[149px] dark:text-[var(--dark-gray-700)] left-0 text-[18px] pl-[12px] mb-[30px]">
              권유정 박정수 이현우 정지유 한상아
            </p>
            <hr className="w-[95%] dark:text-[var(--dark-gray-700)]" />
            <div className="flex justify-between">
              <p className="text-[18px] dark:text-[var(--dark-gray-700)] pt-[15px] pl-[12px]">
                © 2025 somepick. All rights reserved.
              </p>
              <div className="mr-[110px] mt-[25px] mb-[110px]">
                <IoLogoGithub size={60} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
