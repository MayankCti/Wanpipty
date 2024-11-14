
import axios from "axios";
import { pipSuccessMessage, pipErrorMessage } from "../../Auth/Pip";
import { BASE_URL } from "../../Routes/bakendEndPoint";

export const API_REQUEST = async (method, url, headers = {}, isToast, data) => {
    try {
        const res = await axios({
            method: method,
            url: BASE_URL + url,
            data: data,
            headers: headers
        });
        if (res?.data?.success == true) {
            isToast == true && pipSuccessMessage(res?.data?.message);
        } else {
            isToast == true && pipErrorMessage(res?.data?.message);
        }
        return res?.data;
    } catch (err) {
        isToast == true && pipErrorMessage(err?.response?.data?.message ?? "Internal server error");
    }
};