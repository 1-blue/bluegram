import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// pages
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import ProfilePage from "@pages/ProfilePage";
import RegisterPage from "@pages/RegisterPage";

// store
import store from "@store/configureStore";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<div>...?</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

// const HomePage = React.lazy(() => import("./src/pages/HomePage"));
// const LoginPage = React.lazy(() => import("./src/pages/LoginPage"));
// const ProfilePage = React.lazy(() => import("./src/pages/ProfilePage"));
// const RegisterPage = React.lazy(() => import("./src/pages/RegisterPage"));
// <React.Suspense fallback={<div>loadding</div>}>
// </React.Suspense>
