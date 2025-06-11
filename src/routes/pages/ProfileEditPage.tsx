import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import type { SingleValue } from "react-select";
import { updateProfile } from "../../apis/user";
import { deleteImage, storeImage } from "../../apis/util";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileSelectBox from "../../components/profile/ProfileSelectBox";
import SelectTags from "../../components/profile/SelectTags";
import { optionsGroup } from "../../components/signup/data/optionsData";
import { interests, keywords } from "../../constants/data/tags";
export default function ProfileEditPage() {
  const { state: profile }: { state: ProfileData } = useLocation();
  const navigate = useNavigate();

  const [mainImageUrl, setMainImageUrl] = useState(profile.main_image);
  const [subImageUrl, setSubImageUrl] = useState(profile.sub_image || null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [subImageFile, setSubImageFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState(profile.nickname);
  const [age, setAge] = useState(profile.age.toString());
  const [status, setStatus] = useState(profile.status);
  const [description, setDescription] = useState(profile.description || "");
  const [job, setJob] = useState(profile.job || "");
  const [location, setLocation] = useState(profile.location || "");
  const [height, setHeight] = useState(profile.height?.toString() || "");
  const [mbti, setMbti] = useState(profile.mbti || "");
  const [partnerNickname, setPartnerNickname] = useState(
    profile.partner_nickname || ""
  );
  const [keywordList, setKeywordList] = useState<string[]>(
    profile.keywords || []
  );
  const [interestList, setInterestList] = useState<string[]>(
    profile.interests || []
  );
  const [idealTypeList, setIdealTypeList] = useState<string[]>(
    profile.ideal_types || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "age" | "height"
  ) => {
    const { value } = e.target;
    const number = value.replace(/[^0-9.]/g, "").replace(/(\..*)/g, "$1");
    if (Number(number) >= 0 && Number(number) <= 250) {
      if (type === "age") {
        setAge(number);
      } else {
        setHeight(number);
      }
    }
  };

  const handleSubmit = async () => {
    const mainUrl =
      mainImageFile && (await storeImage(mainImageFile, "main_image"));
    const subUrl =
      subImageFile && (await storeImage(subImageFile, "sub_image"));
    const payload: ProfileUpdatePayload = {
      main_image: mainUrl || profile.main_image,
      sub_image: subUrl || profile.sub_image,
      status,
      nickname,
      age: Number(age),
      job,
      location,
      height: Number(height),
      mbti,
      keywords: keywordList,
      interests: interestList,
      ideal_types: idealTypeList,
    };
    await updateProfile(payload);
    navigate(`/profile/${profile.id}`);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "sub"
  ) => {
    if (!e?.target.files) return;
    const url = await storeImage(e.target.files[0], "temp");
    if (type === "main" && url) {
      setMainImageUrl(url);
      setMainImageFile(e.target.files[0]);
    } else if (type === "sub" && url) {
      setSubImageUrl(url);
      setSubImageFile(e.target.files[0]);
    }
    if (url) {
      setTimeout(() => {
        deleteImage(url);
      }, 2000);
    }
  };

  const isCouple = status === "couple";
  if (isCouple) {
    return (
      <main className="relative flex justify-center mb-[50px]">
        <form
          action={handleSubmit}
          className="flex items-center flex-col w-270"
        >
          <div className="mt-16 flex gap-[68px]">
            <label htmlFor="main_image">
              <ProfileCard image={mainImageUrl} isMain isEdited />
              <input
                className="hidden"
                type="file"
                id="main_image"
                onChange={(e) => handleFileChange(e, "main")}
              />
            </label>
          </div>
          <div className="flex items-center gap-[18px] mt-[42px]">
            <div className="flex items-center gap-2">
              <Icon width="10px" height="9px" left="-49px" top="-405px" />
              <span className="font-semibold text-[var(--primary-pink-point)] leading-[1]">
                상대 닉네임
              </span>
            </div>
            <input
              onChange={(e) => setPartnerNickname(e.target.value)}
              value={partnerNickname}
              className="w-[150px] box-border py-2 border-3 border-[var(--gray-200)] rounded-[20px] pl-[20px] focus:outline-[var(--primary-pink)]"
            />
          </div>
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-[264px] h-[38px] mt-[37px]"
          >
            솔로로 전환하기
          </Button>
          {isModalOpen && (
            <Alert
              title="정말로 솔로로 전환하시겠습니까?"
              subtitle="기존 커플 기록이 전부 삭제됩니다"
              isOk="네"
              isNotOk="아니요"
              onClick={() => {
                setIsModalOpen(false);
                setStatus("solo");
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
          <div className="flex flex-col w-full mt-[50px]">
            <Button type="submit" className="w-[264px] h-[38px] self-end mt-8">
              <span className="leading-[1]">프로필 정보 저장</span>
            </Button>
          </div>
        </form>
      </main>
    );
  } else
    return (
      <main className="relative flex justify-center mb-[150px]">
        <form
          action={handleSubmit}
          className="flex items-center flex-col w-270"
        >
          {/* 프로필 사진 */}
          <div className="mt-16 flex gap-[68px]">
            <label htmlFor="main_image">
              <ProfileCard image={mainImageUrl} isMain isEdited />
              <input
                className="hidden"
                type="file"
                id="main_image"
                onChange={(e) => handleFileChange(e, "main")}
              />
            </label>
            <label htmlFor="sub_image">
              <ProfileCard image={subImageUrl} isEdited />
              <input
                className="hidden"
                type="file"
                id="sub_image"
                onChange={(e) => handleFileChange(e, "sub")}
              />
            </label>
          </div>
          {/* 한줄 소개 */}
          <div className="flex items-center gap-[18px] mt-[42px] mb-[37px]">
            <div className="flex items-center gap-2">
              <Icon width="10px" height="9px" left="-49px" top="-405px" />
              <span className="font-semibold text-[var(--primary-pink-point)] leading-[1]">
                한줄 소개
              </span>
            </div>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="box-border w-[730px] py-4 border-3 border-[var(--gray-200)] rounded-[20px] pl-[30px] focus:outline-[var(--primary-pink)]"
            />
          </div>
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-[264px] h-[38px]"
          >
            커플로 전환하기
          </Button>
          {isModalOpen && (
            <Alert
              title="정말로 커플로 전환하시겠습니까?"
              subtitle="매칭과 채팅 기록이 모두 삭제됩니다."
              isOk="네"
              isNotOk="아니요"
              onClick={() => {
                setStatus("couple");
                setIsModalOpen(false);
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
          <div className="flex flex-col w-full mb-[137px] mt-[132px]">
            <h3 className="mb-[55px] text-xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]">
              내 정보
            </h3>
            <div className="flex gap-[76px] p-10 border-3 border-[var(--gray-200)] rounded-[20px]">
              <ul className="flex flex-col gap-7">
                {/* 닉네임 */}
                <li className="flex items-center">
                  <span className="user-info">닉네임</span>
                  <input
                    type="text"
                    className="user-info-input"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </li>
                {/* 나이 */}
                <li className="flex items-center">
                  <span className="user-info">나이</span>
                  <input
                    type="text"
                    pattern="[0-9]+"
                    className="user-info-input"
                    value={age}
                    onChange={(e) => handleChange(e, "age")}
                  />
                </li>
                {/* 직업 */}
                <li className="flex items-center">
                  <span className="user-info">직업</span>
                  <ProfileSelectBox
                    type="job"
                    value={{
                      value: optionsGroup.job.find((item) => item.label === job)
                        ?.value as string,
                      label: job,
                    }}
                    onChange={(
                      newValue: SingleValue<{ value: string; label: string }>
                    ) => {
                      if (newValue) {
                        setJob(newValue.label);
                      }
                    }}
                  />
                </li>
                {/* 지역 */}
                <li className="flex items-center">
                  <span className="user-info">지역</span>
                  <ProfileSelectBox
                    type="location"
                    value={{
                      value: optionsGroup.location.find(
                        (item) => item.label === location
                      )?.value as string,
                      label: location,
                    }}
                    onChange={(
                      newValue: SingleValue<{ value: string; label: string }>
                    ) => {
                      if (newValue) {
                        setLocation(newValue.label);
                      }
                    }}
                  />
                </li>
                {/* 키 */}
                <li className="flex items-center">
                  <span className="user-info">키</span>
                  <input
                    type="text"
                    className="user-info-input"
                    value={height}
                    onChange={(e) => handleChange(e, "height")}
                  />
                </li>
                {/* MBTI */}
                <li className="flex items-center">
                  <span className="user-info">MBTI</span>
                  <ProfileSelectBox
                    type="mbti"
                    value={{
                      value: optionsGroup.mbti.find(
                        (item) => item.label === mbti
                      )?.value as string,
                      label: mbti,
                    }}
                    onChange={(
                      newValue: SingleValue<{ value: string; label: string }>
                    ) => {
                      if (newValue) {
                        setMbti(newValue.label);
                      }
                    }}
                  />
                </li>
              </ul>
              {/* 태그 */}
              <ul className="flex flex-col gap-[38px] border-l border-[var(--gray-50)] pl-10">
                <SelectTags
                  type="나를 표현하는 키워드"
                  list={keywords}
                  values={keywordList}
                  setValues={setKeywordList}
                />
                <SelectTags
                  type="나의 관심사"
                  list={interests}
                  values={interestList}
                  setValues={setInterestList}
                />
                <SelectTags
                  type="나의 이상형"
                  list={keywords}
                  values={idealTypeList}
                  setValues={setIdealTypeList}
                />
              </ul>
            </div>
            <Button type="submit" className="w-[264px] h-[38px] self-end mt-8">
              <span className="leading-[1]">프로필 정보 저장</span>
            </Button>
          </div>
        </form>

        {/* 프롬프트 창 */}
        {/* <div className="fixed inset-0 bg-black opacity-30 z-50" />
      <Prompt>
        <span>내 연인의 닉네임을 입력해주세요.</span>
      </Prompt> */}
      </main>
    );
}
