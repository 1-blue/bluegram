export const combinePhotoUrl = (url: string) =>
  `${process.env.NEXT_PUBLIC_PHOTO_URL}/${url}`;

export const getLogoUrl = () => `${process.env.NEXT_PUBLIC_FRONT_URL}/logo.png`;

// 2022/05/27 - 스로틀 헬퍼 함수 - by 1-blue
export const throttleHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};

// 2022/07/05 - 정규 표현식 모음 - by 1-blue
type RegExpType = "id" | "password" | "email" | "phone" | "birthday";
export const getRegExp = (type: RegExpType) => {
  switch (type) {
    case "id":
      // 숫자와 영어가 최소 한 글자 이상 포함되고, 최소 6자리여야 합니다.
      return /(?=.*\d)(?=.*[a-zA-ZS]).{6,}/;

    case "password":
      // 숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리여야 합니다.
      return /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

    case "email":
      // 이메일 형식에 맞게 입력해 주세요.
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    case "phone":
      // 숫자만 11자리 입력해 주세요.
      return /[0-9]{11,11}/;

    case "birthday":
      // 숫자만 8자리 입력해 주세요.
      return /[0-9]{8,8}/;
  }
};
