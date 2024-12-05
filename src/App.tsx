import React, { useEffect, useState } from 'react';
import './css/index.css';
import './css/main.css';
import './css/responsive.css';
import './css/shorts.css';
import LogoPage from './components/Pages/authPage/LogoPage';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignIn from './components/Pages/authPage/SignIn';
import AuthRouter from './components/Pages/authPage/AuthRouter';
import SignUp from './components/Pages/authPage/singUp';
import PrivateRouter from './components/Pages/authPage/PrivateRouter';
import UserPage from './components/Pages/UserPage';
import Loader from './components/utils/LoaderCom';

function App() {


  return (
    <div>
      <Loader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogoPage />} />
          <Route path="/user/*" element={<PrivateRouter element={<UserPage />} />} />
          <Route path="/signIn" element={<AuthRouter element={<SignIn />} />} />
          <Route path="/signUp" element={<AuthRouter element={<SignUp />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
