import { createSlice } from "@reduxjs/toolkit";
import {
    AddMoneyInWallet,
    DashboardData,
    todayGameData,
    allTransactionData,
    allHistoryData,
    todayHistoryData,
    AddBetAmount,
    PaymentStatus,
    DepositeMoney,
    getUpdatedWalletData
} from "../Action/walletReducer";

const initialState = {
    isLoading: false
};

export const walletSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    extraReducers: (builder) => {
        // add-wallet-money
        builder.addCase(AddMoneyInWallet.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(AddMoneyInWallet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
        })
        builder.addCase(AddMoneyInWallet.rejected, (state, action) => {
            state.isLoading = false;
        })
        // dashboard-data
        builder.addCase(DashboardData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(DashboardData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(DashboardData.rejected, (state, action) => {
            state.isLoading = false;
        })
        // today-game-data
        builder.addCase(todayGameData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(todayGameData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(todayGameData.rejected, (state, action) => {
            state.isLoading = false;
        })
        // get-transaction-data
        builder.addCase(allTransactionData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(allTransactionData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(allTransactionData.rejected, (state, action) => {
            state.isLoading = false;
        })
        // get-history-data
        builder.addCase(allHistoryData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(allHistoryData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(allHistoryData.rejected, (state, action) => {
            state.isLoading = false;
        })
        // get-today-history-data
        builder.addCase(todayHistoryData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(todayHistoryData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(todayHistoryData.rejected, (state, action) => {
            state.isLoading = false;
        })
        // add-bet
        builder.addCase(AddBetAmount.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(AddBetAmount.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(AddBetAmount.rejected, (state, action) => {
            state.isLoading = false;
        })
        // PaymentStatus
        builder.addCase(PaymentStatus.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(PaymentStatus.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(PaymentStatus.rejected, (state, action) => {
            state.isLoading = false;
        })
        // DepositeMoney
        builder.addCase(DepositeMoney.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(DepositeMoney.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(DepositeMoney.rejected, (state, action) => {
            state.isLoading = false;
        })

        // getUpdatedWalletData

        builder.addCase(getUpdatedWalletData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getUpdatedWalletData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(getUpdatedWalletData.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
});

export default walletSlice.reducer;