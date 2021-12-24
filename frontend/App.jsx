import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// layout
import AppLayout from "@components/AppLayout";

// pages
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import ProfilePage from "@pages/ProfilePage";
import SignupPage from "@pages/SignupPage";
import DirectMessagePage from "@pages/DirectMessagePage";
import PostPage from "@pages/PostPage";
import NotFoundPage from "@pages/NotFoundPage";

// action
import { loadToMeAction } from "./src/store/actions/userAction";

const App = () => {
  const dispatch = useDispatch();

  // 2021/12/20 - 로그인한 유저 정보 요청 - by 1-blue
  useEffect(() => dispatch(loadToMeAction()), []);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/directMessage" element={<DirectMessagePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
