import { createSlice } from "@reduxjs/toolkit";
import { pipSaveProfile } from "../../Auth/Pip";
import {
    GoogleLogin,
    userLogin,
    updateUserProfileData,
    userSignup,
    userForgotPassword,
    fetchProfile,
    fetchFaq,
    fetchBidNumbers,
    resendOtpUserVerify,
    resendFogotPasswordOtpUserVerify,
    userVerifyForgotPasswordAccount,
    ChangePasswordForgot
} from "../Action/userReducer";

const initialState = {
    isLoading: false,
    isToggle: false,
    faq: [],
    bidNumbers: []
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        toggleChange: (state, action) => {
            state.isToggle = action?.payload;
        }
    },
    extraReducers: (builder) => {
        // google-login
        builder.addCase(GoogleLogin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(GoogleLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
        })
        builder.addCase(GoogleLogin.rejected, (state, action) => {
            state.isLoading = false;
        })
        // auth-login
        builder.addCase(userLogin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
        })
        // signup-user
        builder.addCase(userSignup.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(userSignup.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(userSignup.rejected, (state, action) => {
            state.isLoading = false;
        })
        //forgot-password-user
        builder.addCase(userForgotPassword.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(userForgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(userForgotPassword.rejected, (state, action) => {
            state.isLoading = false;
        })
        //fetch user data
        builder.addCase(fetchProfile.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            const { data, success } = action?.payload ?? {}
            state.profile = success ? data : {}
            if (success) {
                const value = {
                    full_name: data?.full_name,
                    username: data?.username,
                    profile_image: data?.profile_image
                }
                console.log(value)
                pipSaveProfile(value)
            }
            state.isLoading = false;
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.isLoading = false;
        })

        //faq
        //fetch user data
        builder.addCase(fetchFaq.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFaq.fulfilled, (state, action) => {
            const { data } = action?.payload ?? []
            state.faq = data ?? []
            state.isLoading = false;
        })
        builder.addCase(fetchFaq.rejected, (state, action) => {
            state.isLoading = false;
        })
        // fetch-bie-number
        builder.addCase(fetchBidNumbers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchBidNumbers.fulfilled, (state, action) => {
            const { data } = action?.payload ?? []
            state.bidNumbers = data ?? []
            state.isLoading = false;
        })
        builder.addCase(fetchBidNumbers.rejected, (state, action) => {
            state.isLoading = false;
        })

        // updateUserProfileData
        builder.addCase(updateUserProfileData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(updateUserProfileData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(updateUserProfileData.rejected, (state, action) => {
            state.isLoading = false;
        })

        // resendOtpUserVerify
        builder.addCase(resendOtpUserVerify.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(resendOtpUserVerify.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(resendOtpUserVerify.rejected, (state, action) => {
            state.isLoading = false;
        })

        // resendFogotPasswordOtpUserVerify
        builder.addCase(resendFogotPasswordOtpUserVerify.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(resendFogotPasswordOtpUserVerify.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(resendFogotPasswordOtpUserVerify.rejected, (state, action) => {
            state.isLoading = false;
        })

        // userVerifyForgotPasswordAccount
        builder.addCase(userVerifyForgotPasswordAccount.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(userVerifyForgotPasswordAccount.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(userVerifyForgotPasswordAccount.rejected, (state, action) => {
            state.isLoading = false;
        })

        // ChangePasswordForgot
        builder.addCase(ChangePasswordForgot.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(ChangePasswordForgot.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(ChangePasswordForgot.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
});

export const { toggleChange } = authSlice.actions;
export default authSlice.reducer;