import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { pageRoutes } from '../Routes/pageRoutes';
import { signUpSchema } from '../Auth/schema';
import Loader from '../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from "../Components/ErrorMessage";
import { Formik } from "formik";
import { userSignup } from '../Redux/Action/userReducer';
// import ContineuWithGoogle from '../Components/ContineuWithGoogle';
import Eye from '../Components/Eye';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userReducer);
    const [isEye, setIsEye] = useState(false);
    const initialState = {
        full_name: "",
        password: "",
        mobile_number: ""
    };

    const handleUserSignup = async (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            if (response.success) navigate(pageRoutes?.otp_check, { state: { data: values.mobile_number,type:"signup" } });
            // if (response.success) navigate(pageRoutes?.login);
        };
        dispatch(userSignup({ payload: values, callback }));
    };


    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <section className="ct_login_main_bg">
                <div className="ct_login_inner_main">
                    <div className="ct_login_left">
                        <div className="ct_padd_inline_212">
                            <div className="ct_admin_logo mx-auto text-center mb-4">
                                <img src="assets/img/Panaloto_logo1.png" alt="" style={{ width: "260px" }} />
                            </div>
                            <div>
                                <h3 className="ct_fs_35 ct_fw_700 ct_ff_poppin  text-center mb-4">SIGN UP</h3>
                            </div>
                            <div className="ct_mt_30">
                                <p className="ct_ff_poppin ct_clr_8E8E8E">Note:- Please confirm that the number you have entered is connected to GCash.</p>
                            </div>
                            <Formik
                                initialValues={initialState}
                                validationSchema={signUpSchema}
                                onSubmit={(values, actions) => {
                                    handleUserSignup(values, actions);
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
                                                type="text"
                                                className="ct_login_input form-control ct_ff_poppin"
                                                placeholder="Full Name"
                                                id="full_name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.full_name}
                                            />
                                            <i className="bi bi-person ct_login_icon_top"></i>
                                            <ErrorMessage
                                                errors={errors}
                                                touched={touched}
                                                fieldName="full_name"
                                            />
                                        </div>
                                        <div className="form-group mb-4 position-relative mb-4">
                                            <input
                                                type="number"
                                                className="ct_login_input form-control ct_ff_poppin "
                                                placeholder="Mobile Number"
                                                id="mobile_number"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.mobile_number}
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
                                                className="ct_login_input form-control ct_ff_poppin"
                                                placeholder="Password"
                                                id="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            <i className='bi bi-lock ct_login_icon_top'></i>
                                            <Eye isEye={isEye} onClick={() => setIsEye(!isEye)} />
                                            <ErrorMessage
                                                errors={errors}
                                                touched={touched}
                                                fieldName="password"
                                            />
                                        </div>
                                        <div className="ct_admin_login ct_mt_30 text-center">
                                            <button type="submit" onClick={(e) => handleSubmit(e)}>Sign Up</button>
                                        </div>
                                        {/* <div className="ct_mt_30 text-center">
                                            <h4 className="ct_fs_20 ct_login_other_text ct_ff_poppin"><span className="ct_fw_900">Login</span> with Others</h4>
                                        </div>
                                        <ContineuWithGoogle /> */}
                                        <div className="ct_mt_30 text-center">
                                            <p className="ct_ff_poppin ct_clr_8E8E8E">Already have an account?<a href="javascript:void(0)" onClick={() => navigate(pageRoutes.login)} className="ct_blue_text ms-3 ct_fw_700">Login</a></p>
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
        </div>
    )
}

export default Signup