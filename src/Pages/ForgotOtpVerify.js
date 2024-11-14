import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { pageRoutes } from '../Routes/pageRoutes';
import { resendFogotPasswordOtpUserVerify, userVerifyForgotPasswordAccount } from '../Redux/Action/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import OtpInput from 'react-otp-input';
import { message } from 'antd';

const ForgotOtpVerify = () => {
    const [reset_time, setResetTimmer] = useState(60);
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userReducer);
    const [otp, setOtp] = useState('');

    useEffect(() => {
        intervalCall();
    }, []);

    const intervalCall = () => {
        let data = 60;
        const intervalId = setInterval(() => {
            if (data != 0) {
                data -= 1
                setResetTimmer(data);
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }

    const onHandleOtpSubmit = async () => {
        const callback = (response) => {
            if (response.success) {
                navigate(pageRoutes?.login);
            }
        };
        const payload_data = {
            mobile_number: state?.data,
            otp: otp
        }
        if (otp?.length == 4) {
            dispatch(userVerifyForgotPasswordAccount({ payload: payload_data, callback }));
        } else {
            message.error("Please enter valid Otp")
        }
    };

    const onHandleResendOtp = async () => {
        const callback = (response) => {
            if (response.success) {
                console.log(response);
                intervalCall();
            }
        };
        const payload_data = {
            mobile_number: state?.data
        }
        dispatch(resendFogotPasswordOtpUserVerify({ payload: payload_data, callback }));
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div>
            <section className="ct_login_main_bg">
                <div className="ct_login_inner_main">
                    <div className="ct_login_left">
                        <div className="ct_padd_inline_212">
                            <div className="ct_admin_logo mx-auto text-center mb-4 pb-3">
                                <img src="assets/img/Panaloto_logo1.png" alt="" style={{ width: "260px" }} />
                            </div>
                            <div>
                                <h3 className="ct_fs_35 ct_fw_700 ct_ff_poppin  text-center mb-3">Otp verification</h3>
                                <p className="mb-0 text-center">
                                    One Time Password (OTP) has been sent via SMS to +63{state?.data}
                                </p>
                            </div>
                            <form className="ct_mt_30">
                                <div className="form-group mb-4 position-relative mb-4 ct_otp">
                                    <OtpInput
                                        id="otp"
                                        inputType="number"
                                        className="ct_login_input form-control ct_ff_poppin "
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>
                                <div className="ct_admin_login ct_mt_30 text-center">
                                    <p>You can sent resent opt after {reset_time != 0 && reset_time} {reset_time == 0 && <a href="javascript:void(0)" style={{ textDecoration: 'underline' }} onClick={onHandleResendOtp}>Resend Otp</a>}</p>
                                </div>
                                <div className="ct_admin_login ct_mt_30 text-center">
                                    <button type="button" onClick={(e) => onHandleOtpSubmit(e)}>Continue</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="ct_login_right_bg">
                        <h2 className="ct_yellow_text ct_fs_35 ct_anton_ff ct_fw_500  text-center w-100">Your good luck is waiting for you </h2>
                        <h3 className="ct_fs_35 ct_anton_ff ct_fw_500 text-white text-center ct_mt_30 w-100">Login Now!!!</h3>
                        <div className="mt-5">
                            <img src="assets/img/countdown_img.png" alt="" className="w-100" />
                        </div>
                        <div className="mt-5">
                            <img src="assets/img/enery_circle.png" alt="" className="w-100 ct_responsive_img_w_50" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgotOtpVerify;