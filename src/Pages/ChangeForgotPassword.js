import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ForgotChangeSchema } from '../Auth/schema';
import { pageRoutes } from '../Routes/pageRoutes';
import { Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";
import { ChangePasswordForgot } from '../Redux/Action/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Eye from '../Components/Eye';

const ChangeForgotPassword = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userReducer);
    const [isEye, setIsEye] = useState(false);
    const [isEye1, setIsEye1] = useState(false);
    const initialState = {
        password: "",
        confirmPassword: "",
    };

    const handleLogin = async (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            if (response.success) navigate(pageRoutes?.login);
        };
        const data = {
            mobile_number: state?.data,
            newPassword: values?.password
        }
        dispatch(ChangePasswordForgot({ payload: data, callback }));
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
                                <h3 className="ct_fs_35 ct_fw_700 ct_ff_poppin  text-center mb-4">Forgot password</h3>
                            </div>
                            <Formik
                                initialValues={initialState}
                                validationSchema={ForgotChangeSchema}
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
                                        <div className="form-group mb-4 position-relative mb-4">
                                            <input
                                                type={isEye1 ? "text" : "password"}
                                                id="confirmPassword"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.confirmPassword}
                                                className="ct_login_input form-control ct_ff_poppin"
                                                placeholder="Confirm Password"
                                            />
                                            <i className='bi bi-lock ct_login_icon_top'></i>
                                            <Eye isEye={isEye1} onClick={() => setIsEye1(!isEye1)} />
                                            <ErrorMessage
                                                errors={errors}
                                                touched={touched}
                                                fieldName="confirmPassword"
                                            />
                                        </div>
                                        <div className="ct_admin_login ct_mt_30 text-center">
                                            <button onClick={(e) => handleSubmit(e)} type="submit">Submit</button>
                                        </div>
                                        <div className="ct_mt_30 text-center">
                                            <p className="ct_ff_poppin ct_clr_8E8E8E">Already know your password ?<a href="javascript:void(0)" onClick={() => navigate(pageRoutes.login)} className="ct_blue_text ms-1 ct_fw_700">Login</a></p>
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

export default ChangeForgotPassword