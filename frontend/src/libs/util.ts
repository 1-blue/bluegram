export const combinePhotoUrl = (url: string) =>
  `${process.env.NEXT_PUBLIC_PHOTO_URL}/${url}`;

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
