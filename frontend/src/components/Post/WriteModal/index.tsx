import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

// styled-components
import { Wrapper } from "./style";

// common-components
import Button from "@src/components/common/Button";
import Avatar from "@src/components/common/Avatar";
import Spinner from "@src/components/common/Spinner";
import Carousel from "@src/components/common/Carousel";

// component
import Photo from "@src/components/common/Photo";

// hooks
import useToastMessage from "@src/hooks/useToastMessage";

// action
import { postActions } from "@src/store/reducers";

// type
import type { RootState } from "@src/store/configureStore";
import { ResponseOfPhoto } from "@src/store/types";

type WriteForm = {
  text: string;
  photos: string[];
};
type Props = {
  showModal: boolean;
  onCloseModal: () => void;
};

const WritePostModal = ({ showModal, onCloseModal }: Props) => {
  const dispatch = useDispatch();
  const { me } = useSelector(({ user }: RootState) => user);

  // 2022/05/19 - 모달 ref ( 영역 외 클릭 시 닫기에 사용 ) - by 1-blue
  const modalRef = useRef<HTMLDivElement | null>(null);
  // 2022/05/19 - 이미지 input ref - by 1-blue
  const photoRef = useRef<HTMLInputElement | null>(null);
  // 2022/05/19 - 게시글 작성 form 관련 변수/메서드 - by 1-blue
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<WriteForm>();
  // 2022/05/19 - 현재 상태 - by 1-blue
  const [state, setState] = useState({
    title: "",
    step: 1,
  });
  // 2022/05/19 - 현재 이미지 인덱스 - by 1-blue
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  // 2022/05/19 - 이미지 업로드중인인지 판단할 변수 - by 1-blue
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  // 2022/05/19 - 게시글 생성 모달창 초기화 메서드 - by 1-blue
  const initializePostModal = useCallback(() => {
    setState({
      title: "새 게시물 만들기",
      step: 1,
    });
    setValue("text", "");
    setValue("photos", []);
  }, [setState, setValue]);
  // 2022/05/19 - 게시글 생성 모달창 초기화 실행 - by 1-blue
  useEffect(() => initializePostModal(), [initializePostModal]);
  // 2022/05/19 - 게시글 생성 모달창 오픈 시 스크롤 불가능하도록 구현 - by 1-blue
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 2022/05/19 - 모달 닫기 이벤트 - by 1-blue
  const handleClickOutside = useCallback(
    ({ target }: any) => {
      // 조건부로 생성되는 버튼들은 눌러도 창 안닫히도록 처리
      if (target.className === "modal-preview-remove-button") return;
      if (target.className === "modal-next-button") return;
      if (target.className === "modal-previous-button") return;

      if (showModal && !modalRef.current?.contains(target)) {
        if (!confirm("게시글 생성을 취소시겠습니까?")) return;
        onCloseModal();
        initializePostModal();
      }
    },
    [modalRef, onCloseModal, showModal, initializePostModal]
  );
  // 2022/05/19 - 모달 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // 2022/05/19 - 이미지 파일 탐색기로 선택 - by 1-blue
  const SeletedPhotos = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const formData = new FormData();
      [...e.target.files].forEach((photo) => formData.append("photos", photo));

      try {
        setUploadingPhotos(true);
        const {
          data: { photos },
        }: ResponseOfPhoto = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/photo`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        setValue("photos", [...getValues("photos"), ...photos]);
        setState({ title: "이미지 확인 및 수정하기", step: 2 });
        toast.success("이미지를 업로드했습니다.");
      } catch (error) {
        toast.error(
          "이미지 업로드에 실패했습니다.\n잠시후에 다시 시도해주세요!"
        );
      } finally {
        setUploadingPhotos(false);
      }
    },
    [setValue, getValues, setState, setUploadingPhotos]
  );
  // 2022/05/19 - 이미지 드래그 앤 드랍 - by 1-blue
  const photoDragAndDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!e.dataTransfer?.files) return;

      const formData = new FormData();

      [...e.dataTransfer.files].forEach((photo) =>
        formData.append("photos", photo)
      );

      try {
        setUploadingPhotos(true);

        const {
          data: { photos },
        }: ResponseOfPhoto = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/photo`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        setValue("photos", [...getValues("photos"), ...photos]);
        setState({ title: "이미지 확인 및 수정하기", step: 2 });

        toast.success("이미지를 업로드했습니다.");
      } catch (error) {
        toast.error(
          "이미지 업로드에 실패했습니다.\n잠시후에 다시 시도해주세요!"
        );
      } finally {
        setUploadingPhotos(false);
      }
    },
    [setValue, getValues, setState]
  );

  // 2022/05/19 - 게시글 생성 요청 - by 1-blue
  const onSubmit = useCallback(
    ({ text, photos }: WriteForm) => {
      if (text.length > 2200)
        return toast.error(
          `게시글 내용은 2200자 이하만 가능합니다.\n( 현재 ${text.length}자 )`
        );
      if (text.trim().length === 0)
        return toast.error("게시글의 내용을 채우고 버튼을 눌러주세요!");

      dispatch(postActions.uploadPostRequest({ content: text, photos }));
    },
    [dispatch]
  );
  // 2022/05/19 - 게시글 생성 성공 시 메시지 및 모달 닫기 및 페이지 이동 - by 1-blue
  const { uploadPostDone, uploadPostError } = useSelector(
    ({ post }: RootState) => post
  );
  useToastMessage({
    done: uploadPostDone,
    error: uploadPostError,
    excute: () => onCloseModal(),
    go: `/`,
  });

  //2022/05/19 - 특정 프리뷰 제거 - by 1-blue
  const onClickRemovePreview = useCallback(() => {
    setValue(
      "photos",
      getValues("photos").filter((photo, i) => i !== currentPhotoIndex + 1)
    );
  }, [setValue, getValues, currentPhotoIndex]);

  //2022/05/19 - 게시글 모달 보여줄 컨텐츠 - by 1-blue
  const contents = useCallback(() => {
    const photos = watch("photos");

    switch (state.step) {
      // 이미지 입력받기
      case 1:
        return (
          <>
            <h2 className="modal-body-title">
              사진과 동영상을 여기에 끌어다 놓으세요
            </h2>
            <input
              type="file"
              hidden
              ref={photoRef}
              accept="image/*"
              multiple
              onChange={SeletedPhotos}
            />
            <Button
              type="button"
              onClick={() => photoRef.current?.click()}
              style={{ width: "40%" }}
              primary
              contents="컴퓨터에서 선택"
            />
          </>
        );

      // 입력받은 이미지 수정하기 ( 순서 변경 및 확인... 추후에 이미지 크롭 추가 )
      case 2:
        return (
          <div className="modal-preview-carousel-wrapper">
            {/* 프리뷰 케루셀 */}
            <Carousel setPhotoIndex={setCurrentPhotoIndex}>
              {photos.map((photo) => (
                <Photo key={photo} photo={photo} $contain $priview />
              ))}
            </Carousel>
            {/* 특정 프리뷰 제거 버튼 and Spinner */}({/* 프리뷰 추가 버튼 */}
            <button
              type="button"
              className="modal-preview-remove-button"
              onClick={onClickRemovePreview}
            >
              ❌
            </button>
            <input
              type="file"
              hidden
              ref={photoRef}
              accept="image/*"
              multiple
              onChange={SeletedPhotos}
            />
            <Button
              type="button"
              onClick={() => photoRef.current?.click()}
              $upload
              loading={uploadingPhotos}
              className="modal-preview-append-button"
              contents="이미지 추가"
            />
          </div>
        );

      // 게시글 컨텐츠 입력
      case 3:
        return (
          <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-form-info">
              <Avatar width={36} height={36} photo={me?.Photos?.[0].name} />
              <b>{me?.name}</b>
            </div>

            <textarea
              className="modal-form-textarea"
              {...register("text")}
              placeholder="🗨️ 텍스트를 입력하세요 🗨️"
            />

            <span className="modal-form-text-length">
              {watch("text").length}/2,200
            </span>

            <Button
              type="submit"
              primary
              contents="게시"
              style={{ borderRadius: 0 }}
            />
          </form>
        );

      default:
        break;
    }
  }, [
    state,
    photoRef,
    SeletedPhotos,
    uploadingPhotos,
    onClickRemovePreview,
    handleSubmit,
    onSubmit,
    register,
    watch,
    me,
  ]);

  //2022/01/14 - 다음 스탭 - by 1-blue
  const onClickNextStep = useCallback(() => {
    setState((prev) => ({
      title: "컨텐츠 입력 및 게시글 생성",
      step: prev.step + 1,
    }));
  }, [setState]);

  //2022/01/14 - 이전 스탭 - by 1-blue
  const onClickPreviousStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: prev.step - 1 }));

    if (state.step === 3) {
      setState((prev) => ({ ...prev, title: "이미지 확인 및 수정하기" }));
    } else if (state.step === 2) {
      initializePostModal();
    }
  }, [setState, state, initializePostModal]);

  return (
    <>
      <Wrapper step={state.step}>
        {/* 모달 닫기 버튼 */}
        <button type="button" className="modal-close-button">
          ❌
        </button>

        <div
          className="modal"
          ref={modalRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={photoDragAndDrop}
        >
          {/* 다음 스탭으로 넘어가는 버튼 */}
          {state.step === 2 && (
            <button
              type="button"
              className="modal-next-button"
              onClick={onClickNextStep}
            >
              다음
            </button>
          )}

          {/* 이전 스탭으로 돌아가는 버튼 */}
          {state.step !== 1 && (
            <button
              type="button"
              className="modal-previous-button"
              onClick={onClickPreviousStep}
            >
              이전
            </button>
          )}

          {/* 모달 제목 */}
          <h1 className="modal-head">{state.title}</h1>

          {/* 모달 컨텐츠 */}
          <div className="modal-body">{contents()}</div>
        </div>
      </Wrapper>

      {uploadingPhotos && <Spinner kinds="page" />}
    </>
  );
};

export default WritePostModal;
