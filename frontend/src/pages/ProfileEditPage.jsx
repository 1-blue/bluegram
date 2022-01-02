import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// action
import { loadToMeDetailAction } from "@store/actions";

// component
import Spinner from "@components/common/Spinner";

const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const { me, loadToMeLoading } = useSelector(state => state.user);

  useEffect(() => dispatch(loadToMeDetailAction()), []);

  if (loadToMeLoading) return <Spinner page />;

  return (
    <>
      <h1>ProfileEditPage - 추후에 추가</h1>
    </>
  );
};

export default ProfileEditPage;
