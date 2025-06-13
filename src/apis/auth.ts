import supabase from "../utils/supabase";

// 회원 가입 (이메일, 비밀번호, 그 외 모든 정보)
export const signupUser = async (
  email: string,
  password: string,
  userData: SoloOptions | CoupleOptions
) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    if (error) {
      console.log("회원가입 실패:", error.message);
      return;
    }
  } catch (e) {
    console.error("회원가입 실패:", e);
  }
};
// 닉네임 중복 확인 (닉네임)
export const checkNickname = async (nickname: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("nickname", nickname)
      .maybeSingle();
    if (error) {
      console.log("닉네임 중복 확인 실패:", error.message);
      return;
    }
    return data ? true : false;
  } catch (e) {
    console.error(e);
  }
};
// 이메일 중복 확인 (이메일)
export const checkEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    if (error) {
      console.log("이메일 중복 확인 실패:", error.message);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
// 로그인 (이메일, 비밀번호)
export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("로그인 실패:", error.message);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
// 구글 로그인
export const loginUserByGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) {
      console.log(error);
      return;
    }
  } catch (e) {
    console.error(e);
  }
};
// profile에 정보가 있는지 확인
export const checkHasProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      console.log(error);
      return;
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
// 로그아웃
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("로그아웃 실패:", error.message);
      return;
    }
    console.log("로그아웃 성공");
  } catch (e) {
    console.error(e);
  }
};
