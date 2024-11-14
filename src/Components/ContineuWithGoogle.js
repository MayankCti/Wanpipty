import React from 'react';
import { auth, googleProvider } from '../Auth/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { GoogleLogin } from '../Redux/Action/userReducer';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { pageRoutes } from '../Routes/pageRoutes';
import Loader from './Loader';
import { message } from 'antd';

const ContineuWithGoogle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userReducer);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result?.user);
            handleGoogleLogin(result?.user);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            message.error(`Error signing in with Google:`)
        }
    };

    const handleGoogleLogin = (value) => {
        const callback = (response) => {
            if (response.success) navigate(pageRoutes?.home);
        };
        const data = {
            email: value?.email,
            google_signup_token: value?.accessToken,
            full_name: value?.displayName,
            profile_image: value?.photoURL
        }
        dispatch(GoogleLogin({ payload: data, callback }));
    };

    if (isLoading) {
        <Loader />
    }
    return (
        <div className="ct_outline_button ct_mt_30">
            <button type="button" className="ct_ff_poppin" onClick={handleGoogleSignIn}>
                <img src="assets/img/google_1.png" alt="" />
                Login with
                <span className="ct_fw_900">Google</span>
            </button>
        </div>
    )
}

export default ContineuWithGoogle;