import { message, message as toast } from 'antd';
import moment from "moment";

// Currency Symbol
export const curSym = "₱";

// Authorizationw
export const pipSetAccessToken = (token) => {
    if (!token)
        return;
    else
        localStorage.setItem("access-token", token);
};

export const pipGetAccessToken = () => {
    return localStorage.getItem("access-token");
};

export const pipSetAccessPopup = (data) => {
    localStorage.setItem("popup-token", data);
};

export const pipGetAccessPopup = () => {
    return JSON.parse(localStorage.getItem("popup-token"));
};

// Date View Format
export const pipViewDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
};

export const pipDeleteToken = () => {
    localStorage.clear();
    message.success("Successfully logged out");
};

export const pipSuccessMessage = (message) => {
    return toast.success(message)
};

export const pipErrorMessage = (message) => {
    return toast.error(message)
};

export const pipSaveProfile = (profile) => {
    if (!profile)
        return;
    else
        localStorage.setItem('users_data', JSON.stringify(profile));
};

export const pipGetProfile = () => {
    return JSON.parse(localStorage.getItem('users_data'));
};