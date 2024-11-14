import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signInSchema } from '../Auth/schema';
import { pageRoutes } from '../Routes/pageRoutes';
import { Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";
import { userLogin } from '../Redux/Action/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Loader from '../Components/Loader';
// import ContineuWithGoogle from '../Components/ContineuWithGoogle';
import RememberMe from '../Components/RememberMe';
import Eye from '../Components/Eye';
import { pipSetAccessPopup } from '../Auth/Pip';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userReducer);
    const [isEye, setIsEye] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const initialState = {
        mobile_number: Cookies.get('user_email') ?? "",
        password: Cookies.get('user_password' ?? ""),
    };

    const handleLogin = async (values, { setSubmitting }) => {
        setSubmitting(false);
        if (isChecked) {
            setDataInCookies(values);
        }
        const callback = (response) => {
            if (response.success) {
                pipSetAccessPopup(false);
                navigate(pageRoutes?.home);
            }
        };
        dispatch(userLogin({ payload: values, callback }));
    };

    const setDataInCookies = (values) => {
        Cookies.set('user_email', values?.mobile_number, { expires: 365 });
        Cookies.set('user_password', values?.password, { expires: 365 });
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <section className="ct_login_main_bg">
                <div className="ct_login_inner_main">
                    <div className="ct_login_left">
                        <div className="ct_padd_inline_212">
                            <div className="ct_admin_logo mx-auto text-center mb-4">
                                <img src="assets/img/Panaloto_logo1.png" alt="" style={{ width: "260px" }} />
                            </div>
                            <div>
                                <h3 className="ct_fs_35 ct_fw_700 ct_ff_poppin  text-center mb-4">LOGIN</h3>
                            </div>
                            <Formik
                                initialValues={initialState}
                                validationSchema={signInSchema}
                                onSubmit={(values, actions) => {
                                    handleLogin(values, actions);
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                }) => (
                                    <form className="ct_mt_30">
                                        <div className="form-group mb-4 position-relative mb-4">
                                            <input
                                                type="number"
                                                id="mobile_number"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.mobile_number}
                                                className="ct_login_input form-control ct_ff_poppin"
                                                placeholder="Mobile Number"
                                                onWheel={() => document.activeElement.blur()}
                                            />
                                            <i className="bi bi-phone ct_login_icon_top"></i>
                                            <ErrorMessage
                                                errors={errors}
                                                touched={touched}
                                                fieldName="mobile_number"
                                            />
                                        </div>
                                        <div className="form-group mb-4 position-relative mb-4">
                                            <input
                                                type={isEye ? "text" : "password"}
                                                id="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                className="ct_login_input form-control ct_ff_poppin"
                                                placeholder="Password"
                                            />
                                            <i className='bi bi-lock ct_login_icon_top'></i>
                                            <Eye isEye={isEye} onClick={() => setIsEye(!isEye)} />
                                            <ErrorMessage
                                                errors={errors}
                                                touched={touched}
                                                fieldName="password"
                                            />
                                        </div>
                                        <div className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                                            <RememberMe isChecked={isChecked} onClick={() => setIsChecked(!isChecked)} />
                                            <div>
                                                <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.forgot_password)} className="ct_clr_8E8E8E ct_ff_poppin">Forgot Passowrd ?</a>
                                            </div>
                                        </div>
                                        <div className="ct_admin_login ct_mt_30 text-center">
                                            <button onClick={(e) => handleSubmit(e)} type="submit">Login Now</button>
                                        </div>
                                        {/* <div className="ct_mt_30 text-center">
                                            <h4 className="ct_fs_20 ct_login_other_text ct_ff_poppin"><span className="ct_fw_900">Login</span> with Others</h4>
                                        </div>
                                        <ContineuWithGoogle /> */}
                                        <div className="ct_mt_30 text-center">
                                            <p className="ct_ff_poppin ct_clr_8E8E8E">Don't have an account yet?<a href="javascript:void(0)" onClick={() => navigate(pageRoutes.signup)} className="ct_blue_text ms-3 ct_fw_700">Sign up</a></p>
                                        </div>
                                    </form>
                                )}
                            </Formik>
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
        </>
    )
}

export default Login