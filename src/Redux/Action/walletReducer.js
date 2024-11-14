import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { pipGetAccessToken } from "../../Auth/Pip";
import {
    depositeAmountWalletEndPointURL,
    getDashboardValueEndPointURL,
    getTodayGamesDetails,
    getAllTransactionDataEndPointURL,
    getAllHistoryEndPointURL,
    getTodayResultHistoryEndPointURL,
    placeBetEndPointURL,
    addAmountInWalletEndPointURL,
    checkPaymentStatusEndPointURL,
    checkWalletAccountEndPointURL
} from "../../Routes/bakendEndPoint";

export const AddMoneyInWallet = createAsyncThunk("add-money", async (props) => {
    const { payload, callback } = props;
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('post', addAmountInWalletEndPointURL, headers, false, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const DashboardData = createAsyncThunk("fetch_dashboard_data", async (props) => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', getDashboardValueEndPointURL, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});

export const todayGameData = createAsyncThunk("fetch_games_data", async (props) => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', getTodayGamesDetails, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});

export const allTransactionData = createAsyncThunk("fetch_transaction_data", async (props) => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', getAllTransactionDataEndPointURL, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});

export const allHistoryData = createAsyncThunk("fetch_history_data", async (props) => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', getAllHistoryEndPointURL, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});

export const todayHistoryData = createAsyncThunk("fetch_today_history_data", async (props) => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', getTodayResultHistoryEndPointURL, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});

export const AddBetAmount = createAsyncThunk("add-bet", async (props) => {
    const { payload, callback } = props;
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('post', placeBetEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const PaymentStatus = createAsyncThunk("payment-status", async (props) => {
    const { payload, callback } = props;
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('post', checkPaymentStatusEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const DepositeMoney = createAsyncThunk("deposit-money", async (props) => {
    const { payload, callback } = props;
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('post', depositeAmountWalletEndPointURL, headers, true, payload);
        callback(response);
        return response;
    } catch (error) {
        callback(null, error);
    }
});

export const getUpdatedWalletData = createAsyncThunk("walllet-data", async (props) => {
    try {
        const token = pipGetAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        var response = await API_REQUEST('get', checkWalletAccountEndPointURL, headers, false);
        return response;
    } catch (error) {
        return error;
    }
});