import whiteLogo from "../../assets/images/logo_white.png";
import "../../styles/icons.css";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#304463]">
        <div className="w-full text-white h-[400px]">
          <div className="items-center ml-[110px] pt-[60px] relative">
            <img src={whiteLogo} alt="logo" className="w-[150px] h-[150px]" />
            <p className="absolute top-[169px] left-0 text-[18px] pl-[12px] mb-[30px]">
              권유정 박정수 이현우 정지유 한상아
            </p>
            <hr className="w-[95%]" />
            <div className="flex justify-between">
              <p className="text-[18px] pt-[15px] pl-[12px]">
                © 2025 somepick. All rights reserved.
              </p>
              <div className="iconGithub mr-[110px] mt-[15px]"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
