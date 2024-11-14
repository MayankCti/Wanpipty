import { message } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Headers from '../Components/Headers';
import SideBar from '../Components/SideBar';
import { AddMoneyInWallet } from '../Redux/Action/walletReducer';
import { depositeAmountWalletEndPointURL } from '../Routes/bakendEndPoint';
import { pageRoutes } from '../Routes/pageRoutes';
import Loader from '../Components/Loader';

const AddMoney = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(
        (state) => state.walletReducer
    );
    const [amount, setAmount] = useState(100);

    const onHandleAddAmount = () => {
        if (parseFloat(amount) >= 100 && amount != '') {
            const callback = async (response) => {
                if (response?.success) {
                    window.location.href = response.message
                }
            };
            const data = {
                amount: amount
            }
            dispatch(AddMoneyInWallet({ payload: data, callback }));
        } else {
            message.error("The amount should not be less than 100.");
        }
    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="ct_dashboard_main_bg">
            <Headers />
            <div className="ct_dashboard_inner">
                <SideBar />
                <div className="ct_dashboard_right_cnt mt-5 pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 mx-auto">
                                <div className="ct_add_mony_outline_bg pb-5">
                                    <div>
                                        <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.wallet)} className="ct_reinvest_btn d-inline-block">Back</a>
                                    </div>
                                    <div className="form-group pt-4">
                                        <label for="" className="ct_clr_8C98A9 mb-2">Add amount to wallet</label>
                                        <div className="position-relative">
                                            <input
                                                type="number"
                                                onInput={(e) => { e.target.value = Math.abs(e.target.value); }}
                                                min='0'
                                                className="form-control ct_profile_input ct_text_indent_30"
                                                value={amount == '' ? 0 : amount?.toString()}
                                                onChange={(e) => setAmount(e.target.value)}
                                                onWheel={() => document.activeElement.blur()}
                                                placeholder="Enter Amount"
                                            />
                                            <img src="assets/img/peso_icon.png" alt="" className="ct_login_icon_top ct_img_20" style={{ left: "20px", top: "25px" }} />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 flex-wrap mt-3">
                                        <button className="ct_reinvest_btn d-inline-block px-2" onClick={() => setAmount(parseFloat(amount == '' ? 0 : amount) + 100)}>+100</button>
                                        <button className="ct_reinvest_btn d-inline-block px-2" onClick={() => setAmount(parseFloat(amount == '' ? 0 : amount) + 500)}>+500</button>
                                        <button className="ct_reinvest_btn d-inline-block px-2" onClick={() => setAmount(parseFloat(amount == '' ? 0 : amount) + 1000)}>+1000</button>
                                        <button className="ct_reinvest_btn d-inline-block px-2" onClick={() => setAmount(parseFloat(amount == '' ? 0 : amount) + 5000)}>+5000</button>
                                        <button className="ct_reinvest_btn d-inline-block px-2" onClick={() => setAmount(parseFloat(amount == '' ? 0 : amount) / 2)}>1/2</button>
                                        <button className="ct_reinvest_btn d-inline-block px-2" onClick={() => setAmount(parseFloat(amount == '' ? 0 : amount) * 2)}>X2</button>
                                    </div>
                                    <div className="mt-5 pt-4">
                                        <button type="button" className="ct_add_wallet_btn" onClick={onHandleAddAmount}>ADD TO WALLET</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMoney;