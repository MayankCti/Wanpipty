import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { changePasswordSchema } from '../Auth/schema';
import Headers from '../Components/Headers';
import SideBar from '../Components/SideBar';
import { Formik } from "formik";
import ErrorMessage from "../Components/ErrorMessage";
import { pageRoutes } from '../Routes/pageRoutes';
import Loader from '../Components/Loader';
import { changeUserPassword } from '../Redux/Action/userReducer';
import Eye from '../Components/Eye';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userReducer);
    const [isEye, setIsEye] = useState(false);
    const [isEye1, setIsEye1] = useState(false);
    const [isEye2, setIsEye2] = useState(false);

    const initialState = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    const onHandleSubmitForm = async (values, { setSubmitting }) => {
        setSubmitting(false);
        const callback = (response) => {
            if (response.success) navigate(pageRoutes?.my_profile);
        };
        delete values.confirmPassword;
        dispatch(changeUserPassword({ payload: values, callback }));
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="ct_dashboard_main_bg">
            <Headers />
            <div className="ct_dashboard_inner">
                <SideBar />
                <div className="ct_dashboard_right_cnt">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h3><span className="ct_fs_30 ct_ff_oswald text-white ct_fw_600">Change Password</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5 pt-4">
                            <div className="col-md-6 mx-auto">
                                <div className="ct_main_profile_section">
                                    <Formik
                                        initialValues={initialState}
                                        validationSchema={changePasswordSchema}
                                        onSubmit={(values, actions) => {
                                            onHandleSubmitForm(values, actions);
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
                                            <form >
                                                <div className="form-group mb-4 position-relative mb-4">
                                                    <input
                                                        type={isEye ? "text" : "password"}
                                                        className="ct_profile_input form-control ct_login_input ct_ff_poppin text-white"
                                                        placeholder="Current Password"
                                                        id="currentPassword"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.currentPassword}
                                                    />
                                                    <i className="bi bi-lock ct_login_icon_top text-white " style={{top:"25px",left:"15px"}}></i>
                                                    <Eye data="text-white" top="26px"  isEye={isEye} onClick={() => setIsEye(!isEye)} />
                                                    <ErrorMessage
                                                        errors={errors}
                                                        touched={touched}
                                                        fieldName="currentPassword"
                                                    />
                                                </div>
                                                <div className="form-group mb-4 position-relative mb-4">
                                                    <input
                                                        type={isEye1 ? "text" : "password"}
                                                        className="ct_profile_input form-control ct_login_input ct_ff_poppin text-white"
                                                        placeholder="New Password"
                                                        id="newPassword"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.newPassword}
                                                    />
                                                    <i className="bi bi-lock ct_login_icon_top text-white" style={{top:"25px",left:"15px"}}></i>
                                                    <Eye data="text-white" top="26px" isEye={isEye1} onClick={() => setIsEye1(!isEye1)} />
                                                    <ErrorMessage
                                                        errors={errors}
                                                        touched={touched}
                                                        fieldName="newPassword"
                                                    />
                                                </div>
                                                <div className="form-group mb-4 position-relative mb-4">
                                                    <input
                                                        type={isEye2 ? "text" : "password"}
                                                        className="ct_profile_input form-control ct_login_input ct_ff_poppin text-white"
                                                        placeholder="Confirm Password"
                                                        id="confirmPassword"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.confirmPassword}
                                                    />
                                                    <i className="bi bi-lock ct_login_icon_top text-white" style={{top:"25px",left:"15px"}}></i>
                                                    <Eye data="text-white" top="26px" isEye={isEye2} onClick={() => setIsEye2(!isEye2)} />
                                                    <ErrorMessage
                                                        errors={errors}
                                                        touched={touched}
                                                        fieldName="confirmPassword"
                                                    />
                                                </div>
                                                <a className="ct_yellow_btn w-auto mt-5 ct_pointer_curser" onClick={(e) => handleSubmit(e)}>Submit</a>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword