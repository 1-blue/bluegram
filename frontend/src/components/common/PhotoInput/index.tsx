import { useCallback, useRef, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

// common-component
import Icon from "@src/components/common/Icon";
import Photo from "@src/components/common/Photo";
import Spinner from "@src/components/common/Spinner";

// type
import { ICON } from "@src/type";
import type { SignUpForm } from "@src/pages/signup";
import type { ResponseOfPhoto } from "@src/store/types";

// style
import { Wrapper } from "./style";

type Props = {
  getValues: UseFormGetValues<SignUpForm>;
  setValue: UseFormSetValue<SignUpForm>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

const PhotoInput = ({
  getValues,
  setValue,
  isDragging,
  setIsDragging,
}: Props) => {
  // 2022/04/28 - 이미지 input ref - by 1-blue
  const photoRef = useRef<HTMLInputElement>(null);
  // 2022/04/28 - 이미지 업로드 로딩 변수 - by 1-blue
  const [uploadLoading, setUploadLoading] = useState(false);
  // 2022/04/28 - 이미지 업로드 ( 드래그 앤 드랍 ) - by 1-blue
  const onUploadPhotoByDrop = useCallback(
    async (e: any) => {
      e.preventDefault();

      setUploadLoading(true);

      try {
        const formData = new FormData();
        formData.append("photos", e.dataTransfer.files[0]);
        const {
          data: { photos },
        }: ResponseOfPhoto = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/photo`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        setValue("avatar", photos[0]);

        toast.success("이미지를 업로드했습니다.");
      } catch (error) {
        toast.error("이미지 업로드에 실패했습니다.");
      }

      setUploadLoading(false);
      setIsDragging(false);
    },
    [setUploadLoading, setIsDragging, setValue]
  );
  // 2022/04/28 - 이미지 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onUploadPhotoByExplorer = useCallback(
    async (e: any) => {
      setUploadLoading(true);

      try {
        const formData = new FormData();
        formData.append("photos", e.target.files[0]);
        const {
          data: { photos },
        }: ResponseOfPhoto = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/photo`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        setValue("avatar", photos[0]);

        toast.success("이미지를 업로드했습니다.");
      } catch (error) {
        toast.error("이미지 업로드에 실패했습니다.");
      }

      setUploadLoading(false);
      setIsDragging(false);
    },
    [setUploadLoading, setIsDragging, setValue]
  );

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={photoRef}
        onChange={onUploadPhotoByExplorer}
        hidden
      />
      <Wrapper
        onDragOver={(e) => e.preventDefault()}
        onDrop={onUploadPhotoByDrop}
        onClick={() => photoRef.current?.click()}
      >
        {isDragging ? (
          <>
            <span>여기에 이미지를 드래그해주세요</span>
            <Icon icon={ICON.PHOTO} width={80} height={80} />
          </>
        ) : getValues("avatar") ? (
          <Photo photo={getValues("avatar")} $contain />
        ) : (
          <span>여기를 클릭하거나 이미지를 드래그해주세요!</span>
        )}
      </Wrapper>

      {uploadLoading && <Spinner kinds="page" />}
    </>
  );
};

export default PhotoInput;
