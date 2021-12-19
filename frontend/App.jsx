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

// action
import { loadToMeAction } from "./src/store/actions/userAction";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(loadToMeAction()), []);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/*" element={<div>...?</div>} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;

// const HomePage = React.lazy(() => import("./src/pages/HomePage"));
// const LoginPage = React.lazy(() => import("./src/pages/LoginPage"));
// const ProfilePage = React.lazy(() => import("./src/pages/ProfilePage"));
// const RegisterPage = React.lazy(() => import("./src/pages/RegisterPage"));
// <React.Suspense fallback={<div>loadding</div>}>
// </React.Suspense>
