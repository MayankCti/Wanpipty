import React, { useEffect } from 'react';
import './App.css';
import PrivateRoute from './Layout/PrivateRoute';
import { AllRoutes, pageRoutes } from './Routes/pageRoutes';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import PageNotFound from './Components/PageNotFound';
import OtpCheck from './Pages/OtpCheck';
import ForgotOtpVerify from './Pages/ForgotOtpVerify';
import ChangeForgotPassword from './Pages/ChangeForgotPassword';

const App = () => {

  return (
    <div>
      <Routes>
        {
          AllRoutes?.map((item) => {
            return (
              <Route
                path={item.path}
                exact
                element={<PrivateRoute>{item?.element}</PrivateRoute>}
              />
            )
          })
        }
        <Route exact path={pageRoutes.dashboard} element={<Dashboard />} />
        <Route exact path={pageRoutes.login} element={<Login />} />
        <Route exact path={pageRoutes.signup} element={<Signup />} />
        <Route exact path={pageRoutes.forgot_password} element={<ForgotPassword />} />
        <Route exact path={pageRoutes.otp_check} element={<OtpCheck />} />
        <Route exact path={pageRoutes.otp_verify} element={<ForgotOtpVerify />} />
        <Route exact path={pageRoutes.change_forgot} element={<ChangeForgotPassword />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App;