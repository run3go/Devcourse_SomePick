import profileImage from "../../assets/images/profile_image.png";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileSelectBox from "../../components/profile/ProfileSelectBox";

export default function ProfileEditPage() {
  const keywords = [
    "잘생김",
    "예쁨",
    "귀여움",
    "성격 좋음",
    "감성적인",
    "패셔니스타",
    "착함",
    "똑똑함",
    "아담한",
    "듬직한",
    "고양이상",
    "강아지상",
    "여우상",
    "논리적인",
    "집순이 / 집돌이",
    "에겐남 / 에겐녀",
    "테토남 / 테토녀",
    "웃상",
    "친절함",
    "꿀보이스",
    "얘기를 잘 들어주는",
    "스윗남 / 스윗녀",
    "열정적인",
    "예의바른",
    "오픈마인드",
    "애정 표현이 많은",
    "낯가림",
    "낮이밝저",
    "겸손한",
    "돈이 많은",
    "능력 있는",
  ];
  const interests = [
    "사진",
    "음식",
    "패션",
    "공부",
    "카페",
    "맛집",
    "스포츠",
    "게임",
    "노래",
    "댄스",
    "영화",
    "독서",
    "재테크",
    "다이어트",
    "쇼핑",
    "드라이브",
    "캠핑",
    "뮤지컬",
    "연극",
    "방탈출",
    "메이크업",
    "요리",
    "사진찍기",
    "그림 그리기",
    "악기 연주",
    "여행",
    "봉사활동",
    "전시 관람",
    "페스티벌",
    "산책",
    "갓생",
  ];
  return (
    <main className="relative flex justify-center mb-[150px]">
      <div className="flex items-center flex-col w-270">
        <div className="w-full bg-[var(--gray-200)] text-center py-[18px]">
          <h2 className="font-bold text-2xl">My Profile</h2>
        </div>

        <div className="mt-16 flex gap-[68px]">
          <label htmlFor="main_image">
            <ProfileCard image={profileImage} isMain isEdited />
            <input className="hidden" type="file" id="main_image" />
          </label>
          <label htmlFor="sub_image">
            <ProfileCard image={null} isEdited />
            <input className="hidden" type="file" id="sub_image" />
          </label>
        </div>
        <div className="flex items-center gap-[18px] mt-[42px] mb-[37px]">
          <div className="flex items-center gap-2">
            <Icon width="10px" height="9px" left="-49px" top="-405px" />
            <span className="font-semibold text-[var(--primary-pink-point)] leading-[1]">
              한줄 소개
            </span>
          </div>
          <input className="box-border w-[730px] py-4 border-3 border-[var(--gray-200)] rounded-[20px] pl-[30px] focus:outline-[var(--primary-pink)]" />
        </div>
        <Button className="w-[264px] h-[38px]">커플로 전환하기</Button>
        <div className="flex flex-col w-full mb-[137px] mt-[132px]">
          <h3 className="mb-[55px] text-2xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]">
            내 정보
          </h3>
          <div className="flex gap-[76px] p-10 border-3 border-[var(--gray-200)] rounded-[20px]">
            <ul className="flex flex-col gap-7">
              <li className="flex items-center">
                <span className="user-info">닉네임</span>
                <input type="text" className="user-info-input" />
              </li>
              <li className="flex items-center">
                <span className="user-info">나이</span>
                <input type="text" className="user-info-input" />
              </li>
              <li className="flex items-center">
                <span className="user-info">직업</span>
                <ProfileSelectBox type="job" />
              </li>
              <li className="flex items-center">
                <span className="user-info">지역</span>
                <ProfileSelectBox type="location" />
              </li>
              <li className="flex items-center">
                <span className="user-info">키</span>
                <input type="text" className="user-info-input" />
              </li>
              <li className="flex items-center">
                <span className="user-info">MBTI</span>
                <ProfileSelectBox type="mbti" />
              </li>
            </ul>
            <ul className="flex flex-col gap-[38px] border-l border-[var(--gray-50)] pl-10">
              <li className="flex flex-col items-start gap-5">
                <span className="user-info w-50!">나를 표현하는 키워드</span>
                <ul className="relative flex gap-[10px] items-center flex-wrap px-[26px] py-5 border border-[var(--primary-pink)] rounded-[30px] pr-12">
                  {keywords.map((keyword) => (
                    <li className="hover:bg-[var(--primary-pink)] cursor-pointer flex px-[13px] py-[5px] border border-[var(--primary-pink)] rounded-[50px]">
                      <span className="text-xs">{keyword}</span>
                    </li>
                  ))}
                  <span className="absolute right-[22px] bottom-[13px] text-sm">
                    2 / 8
                  </span>
                </ul>
              </li>
              <li className="relative flex flex-col items-start gap-5">
                <span className="user-info">나의 관심사</span>
                <ul className="flex gap-[10px] items-center flex-wrap px-[26px] py-5 border border-[var(--primary-pink)] rounded-[30px]">
                  {interests.map((interest) => (
                    <li className="hover:bg-[var(--primary-pink)] cursor-pointer flex px-[13px] py-[5px] border border-[var(--primary-pink)] rounded-[50px]">
                      <span className="text-xs">{interest}</span>
                    </li>
                  ))}
                  <span className="absolute right-[22px] bottom-[13px] text-sm">
                    2 / 8
                  </span>
                </ul>
              </li>
              <li className="flex flex-col items-start gap-5">
                <span className="user-info">나의 이상형</span>
                <ul className="relative flex gap-[10px] items-center flex-wrap px-[26px] py-5 border border-[var(--primary-pink)] rounded-[30px]">
                  {keywords.map((keyword) => (
                    <li className="hover:bg-[var(--primary-pink)] cursor-pointer flex px-[13px] py-[5px] border border-[var(--primary-pink)] rounded-[50px]">
                      <span className="text-xs">{keyword}</span>
                    </li>
                  ))}
                  <span className="absolute right-[22px] bottom-[13px] text-sm">
                    2 / 8
                  </span>
                </ul>
              </li>
            </ul>
          </div>
          <Button className="w-[264px] h-[38px] self-end mt-8">
            <span className="leading-[1]">프로필 정보 저장</span>
          </Button>
        </div>
      </div>

      {/* 컨펌창 */}
      {/* <div className="fixed inset-0 bg-black opacity-30 z-50" />
      <Confirm>
        <span className="block">더 이상 소개팅 기능을 이용하실 수 없습니다.</span>
      </Confirm> */}

      {/* 프롬프트 창 */}
      {/* <div className="fixed inset-0 bg-black opacity-30 z-50" />
      <Prompt>
        <span>내 연인의 닉네임을 입력해주세요.</span>
      </Prompt> */}
    </main>
  );
}
