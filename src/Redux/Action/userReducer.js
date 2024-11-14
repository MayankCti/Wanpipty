import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { pipSetAccessToken, pipGetAccessToken } from "../../Auth/Pip";
import {
    loginEndPointURL,
    signupEndPointURL,
    forgotPasswordEndPointURL,
    getUserProfileEndPointURL,
    updateUserProfileEndPointURL,
    changeUserPasswordEndPointURL,
    loginWithGoogleEndPointURL,
    getFaqEndPointURL,
    getBidNumbersEndPointURL,
    verifyMobileNumberEndPointURL,
    resendUserVerifyOtpEndPointURL,
    resendForgotPasswordOtpEndPointURL,
    verifyForgotPasswordEndPointURL,
    forgotChangePasswordEndPointURL
} from "../../Routes/bakendEndPoint";

export const GoogleLogin = createAsyncThunk("google-login", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        var response = await API_REQUEST('post', loginWithGoogleEndPointURL, headers, true, payload);
        pipSetAccessToken(response?.data);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const userLogin = createAsyncThunk("auth-login", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        var response = await API_REQUEST('post', loginEndPointURL, headers, true, payload);
        pipSetAccessToken(response?.data);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const userSignup = createAsyncThunk("signup-user", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        var response = await API_REQUEST('post', signupEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const userForgotPassword = createAsyncThunk("forgot-password-user", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        var response = await API_REQUEST('post', forgotPasswordEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const fetchProfile = createAsyncThunk("fetch_user", async () => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', getUserProfileEndPointURL, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});

export const updateUserProfileData = createAsyncThunk("update-user-profile", async (props) => {
    const { payload, callback } = props;
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('post', updateUserProfileEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
        console.log(error)
    }
});

export const changeUserPassword = createAsyncThunk("change-password", async (props) => {
    const { payload, callback } = props;
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('post', changeUserPasswordEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
        console.log(error)
    }
});

export const fetchFaq = createAsyncThunk("faq", async () => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', getFaqEndPointURL, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});

export const fetchBidNumbers = createAsyncThunk("fetch-bie-number", async (props) => {
    const { payload } = props;
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('POST', getBidNumbersEndPointURL, headers, false, payload);
        return response;
    } catch (error) {
        return error;
    }
});

export const userVerifyAccount = createAsyncThunk("verify_user", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        var response = await API_REQUEST('post', verifyMobileNumberEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const resendOtpUserVerify = createAsyncThunk("resend-otp-verify-user", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        var response = await API_REQUEST('post', resendUserVerifyOtpEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});


export const resendFogotPasswordOtpUserVerify = createAsyncThunk("resend-otp-verify-forgot", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        var response = await API_REQUEST('post', resendForgotPasswordOtpEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const userVerifyForgotPasswordAccount = createAsyncThunk("verify_user", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        var response = await API_REQUEST('post', verifyForgotPasswordEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const ChangePasswordForgot = createAsyncThunk("forgot-pass", async (props) => {
    const { payload, callback } = props;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        var response = await API_REQUEST('post', forgotChangePasswordEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});