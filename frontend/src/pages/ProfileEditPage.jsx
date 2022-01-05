import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

// component
import Spinner from "@components/common/Spinner";
import Avatar from "@components/common/Avatar";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Toast from "@components/common/Toast";

// action
import {
  resetMessageAction,
  loadToMeDetailAction,
  editToMeAllAction,
  editToMePasswordAction,
  signOutAction,
  uploadImagesAction,
} from "@store/actions";

// hook
import useInput from "@hooks/useInput";

const Wrapper = styled.section`
  max-width: 900px;
  width: 100%;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  background-color: white;
  border: 2px solid rgba(128, 0, 128, 0.4);
  border-radius: 0.2em;

  & > .menu {
    flex: 0 0 auto;
    flex-basis: 200px;
    display: flex;
    flex-flow: column nowrap;
    border-right: 2px solid rgba(128, 0, 128, 0.4);

    ${({ role }) => {
      switch (role) {
        case "account":
          return css`
            & > .menu-account {
              border-left: 4px solid var(--main-color);
              transform: translateX(-3px);
            }
          `;
        case "password":
          return css`
            & > .menu-password {
              border-left: 4px solid var(--main-color);
              transform: translateX(-3px);
            }
          `;
        case "signout":
          return css`
            & > .menu-signout {
              border-left: 4px solid var(--main-color);
              transform: translateX(-3px);
            }
          `;
      }
    }}
    & > li {
      padding: 1em 0;
      text-align: center;
    }
  }

  & > .content {
    flex: 0.8 0 auto;
    padding: 1em;
    /* margin: 0 auto; */

    & > .top {
      display: flex;
      align-items: center;
      margin-bottom: 1em;

      & > img {
        margin-right: 1em;
      }
      & > span {
        font-size: 1.2em;
        font-weight: bold;
        margin-right: 1em;
      }
      & > button {
        color: var(--light-blue);
        font-weight: bold;
        font-size: 0.8rem;
      }
    }

    & > .mid {
      display: flex;
      flex-flow: column nowrap;

      & > div {
        display: flex;
        align-items: center;
        margin-bottom: 0.4em;

        &:nth-last-child(2) {
          margin-bottom: 1em;
        }

        & > label {
          flex: 0 0 auto;
          flex-basis: 150px;
          font-weight: bold;
          text-align: end;
          margin-right: 1em;
        }

        & > input {
          flex: 0 0 auto;
          border-radius: 0.2em;
        }
      }

      & > button {
        align-self: center;
        width: 200px;
      }
    }
  }

  @media (max-width: 1024px) {
    flex-flow: column nowrap;
    & > .menu {
      border-right: 0;
      border-bottom: 2px solid rgba(128, 0, 128, 0.4);

      & > li {
        flex: 1 0 auto;
      }
    }
  }
`;

const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useParams();
  const { me } = useSelector(state => state.user);
  const {
    loadToMeLoading,
    editToMeAllLoading,
    editToMeAllDone,
    editToMeAllError,
    editToMePasswordLoading,
    editToMePasswordDone,
    editToMePasswordError,
    signOutLoading,
    signOutDone,
    signOutError,
  } = useSelector(state => state.user);
  const { imagePreviews } = useSelector(state => state.image);
  const [name, onChangeName, setName] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [birthday, onChangeBirthday, setBirthday] = useInput("");
  const [prevPassword, onChangePrevPassword, setPrevPassword] = useInput("");
  const [currPassword, onChangeCurrPassword, setCurrPassword] = useInput("");
  const [currPasswordCheck, onChangeCurrPasswordCheck, setCurrPasswordCheck] = useInput("");
  const imageRef = useRef(null);

  // 2022/01/03 - 이미지 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onChangeProfileImage = useCallback(e => {
    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    dispatch(uploadImagesAction(formData));
  }, []);

  // 2022/01/03 - 비밀번호 변경 성공/실패 메시지 - by 1-blue
  useEffect(() => {
    if (!(editToMePasswordDone || editToMePasswordError)) return;
    alert(editToMePasswordDone || editToMePasswordError);

    dispatch(resetMessageAction());

    if (editToMePasswordDone) navigate("/login");
  }, [editToMePasswordDone, editToMePasswordError]);

  // 2022/01/03 - 회원탈퇴 성공/실패 메시지 - by 1-blue
  useEffect(() => {
    if (!(signOutDone || signOutError)) return;
    alert(signOutDone || signOutError);

    dispatch(resetMessageAction());

    if (signOutDone) navigate("/signup");
  }, [signOutDone, signOutError]);

  // 2022/01/02 - 로그인한 유저 정보 추가로 받아오기 - by 1-blue
  useEffect(() => dispatch(loadToMeDetailAction()), []);

  // 2022/01/03 - 기존 정보 채워넣기 - by 1-blue
  useEffect(() => {
    if (!me.phone) return;

    setName(me.name);
    setPhone(me.phone);
    setBirthday(me.birthday);
  }, [me]);

  // 2022/01/03 - 수정사항 서버로 전달 - by 1-blue
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      switch (role) {
        case "account":
          if (!name) return alert("이름을 입력해주세요");
          if (!phone || phone?.length !== 11) return alert("전화번호를 11자리로 입력해주세요");
          if (!birthday || birthday?.length !== 8) return alert("생일을 8자리로 입력해주세요");

          return dispatch(editToMeAllAction({ name, phone, birthday, profileImage: imagePreviews?.[0] }));

        case "password":
          if (!prevPassword) return alert("이전 비밀번호를 입력해주세요");
          if (!currPassword) return alert("변경할 비밀번호를 입력해주세요");
          if (currPassword !== currPasswordCheck) return alert("비밀번호가 불일치합니다.\n확인후 다시 입력해주세요");

          dispatch(editToMePasswordAction({ prevPassword, currPassword }));

          setPrevPassword("");
          setCurrPassword("");
          setCurrPasswordCheck("");
          return;
        case "signout":
          if (confirm("정말 회원탈퇴를 하시겠습니까?\n\n회원탈퇴를 하시면 기존에 정보를 되돌릴 수 없습니다")) {
            return dispatch(signOutAction());
          }
      }
    },
    [role, name, phone, birthday, prevPassword, currPassword, currPasswordCheck, imagePreviews],
  );

  // 2022/01/03 - 조건에 따라 다른 컨텐츠 렌더링 - by 1-blue
  const content = useCallback(
    role => {
      switch (role) {
        case "account":
          return (
            <form className="mid" onSubmit={onSubmit}>
              <div>
                <label>사용자 이름</label>
                <Input type="text" placeholder="이름 입력" value={name} onChange={onChangeName} />
              </div>
              <div>
                <label>전화번호</label>
                <Input type="text" placeholder="전화번호 입력" value={phone} onChange={onChangePhone} maxLength={11} />
              </div>
              <div>
                <label>생년월일</label>
                <Input type="text" placeholder="생일 입력" value={birthday} onChange={onChangeBirthday} maxLength={8} />
              </div>

              <Button type="submit" $local>
                {editToMeAllLoading ? <Spinner button /> : "변경"}
              </Button>
            </form>
          );
        case "password":
          return (
            <form className="mid" onSubmit={onSubmit}>
              <div>
                <label>이전 비밀번호</label>
                <Input
                  type="password"
                  placeholder="이전 비밀번호 입력"
                  value={prevPassword}
                  onChange={onChangePrevPassword}
                />
              </div>
              <div>
                <label>새 비밀번호</label>
                <Input
                  type="password"
                  placeholder="새 비밀번호 입력"
                  value={currPassword}
                  onChange={onChangeCurrPassword}
                />
              </div>
              <div>
                <label>새 비밀번호 확인</label>
                <Input
                  type="password"
                  placeholder="새 비밀번호 확인 입력"
                  value={currPasswordCheck}
                  onChange={onChangeCurrPasswordCheck}
                />
              </div>
              <Button type="submit" $local>
                {editToMePasswordLoading ? <Spinner button /> : "변경"}
              </Button>
            </form>
          );
        case "signout":
          return (
            <form className="mid" onSubmit={onSubmit}>
              <Button type="submit" $local>
                {signOutLoading ? <Spinner button /> : "회원탈퇴"}
              </Button>
            </form>
          );
      }
    },
    [name, phone, birthday, prevPassword, currPassword, currPasswordCheck, imagePreviews],
  );

  if (loadToMeLoading || !me.phone) return <Spinner page />;

  return (
    <Wrapper role={role}>
      <ul className="menu">
        <li className="menu-account">
          <Link to="/profile/edit/account">프로필 편집</Link>
        </li>
        <li className="menu-password">
          <Link to="/profile/edit/password">비밀번호 변경</Link>
        </li>
        <li className="menu-signout">
          <Link to="/profile/edit/signout">회원 탈퇴</Link>
        </li>
      </ul>
      <div className="content">
        <div className="top">
          <Avatar width={38} height={38} image={imagePreviews ? { name: imagePreviews[0] } : me.Images[0]} />
          <span>{me.name}</span>
          {role === "account" && (
            <>
              <button type="button" onClick={() => imageRef.current.click()}>
                프로필 사진 바꾸기
              </button>
              <input type="file" hidden ref={imageRef} onChange={onChangeProfileImage} />
            </>
          )}
        </div>
        {content(role)}
      </div>

      {/* 성공 메시지 - 토스트 */}
      {editToMeAllDone && <Toast message={editToMeAllDone} success />}

      {/* 실패 메시지 - 토스트 */}
      {editToMeAllError && <Toast message={editToMeAllError} error />}
    </Wrapper>
  );
};

export default ProfileEditPage;
