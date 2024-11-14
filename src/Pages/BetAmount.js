import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import Headers from '../Components/Headers';
import Loader from '../Components/Loader';
import SideBar from '../Components/SideBar';
import { AddBetAmount } from '../Redux/Action/walletReducer';
import { pageRoutes } from '../Routes/pageRoutes';

const BetAmount = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(
        (state) => state.walletReducer
    );
    const [amount, setAmount] = useState(10);
    const [walletBalance, setWalletBalance] = useState();
    console.log(state, "state")
    useEffect(() => {
        const balance_data = JSON.parse(localStorage.getItem("wallet_balance"));
        setWalletBalance(balance_data);
    }, []);

    const onHandleAddAmount = () => {
        if (parseFloat(amount) >= 10 && amount != '') {
            const callback = async (response) => {
                if (response?.success) {
                    navigate(pageRoutes.home);
                }
            };
            const data = {
                game_id: state?.game_id,
                choosen_number: state?.datas,
                bet_amount: `${amount}`
            }
            dispatch(AddBetAmount({ payload: data, callback }));
        } else {
            message.error("The amount should not be less than 10.");
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
                                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4">
                                        <div className="ct_small_num_box" data-toggle="tooltip" data-placement="top" title={`${state?.message}% of bids that have been placed`}>
                                            <img src="assets/img/ct_num_fill.png" alt="" />
                                            <h4 className="mb-0 ct_clr_636363 ct_fw_900 ct_dash_yellow_text">{state?.datas}</h4>
                                        </div>
                                        <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.select_number, { state: { data: state?.data, datas: state?.datas, game_id: state?.game_id, choosen_number: state?.choosen_number } })} className="ct_next_outline_btn ct_fw_600 w-auto px-4">Change Number</a>
                                    </div>
                                    <h4 className="ct_dash_yellow_text ct_fw_700 ct_ff_oswald mt-3 text-center">Enter your bet amount</h4>
                                    <div className="form-group pt-4">
                                        <label for="" className="ct_clr_8C98A9 mb-2">Bet amount</label>
                                        <div className="position-relative">
                                            <input
                                                type="number"
                                                onInput={(e) => { e.target.value = Math.abs(e.target.value); }}
                                                className="form-control ct_profile_input ct_text_indent_30"
                                                value={amount == '' ? 0 : amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Enter Amount"
                                            />
                                            <img src="assets/img/peso_icon.png" alt="" class="ct_login_icon_top ct_img_20" style={{ left: "20px", top: "50%", }}></img>
                                        </div>
                                    </div>
                                    <div className="form-group pt-4">
                                        <label for="" className="ct_clr_8C98A9 mb-2">Total Wallet Amount : </label>{" "}
                                        <label className="ct_clr_8C98A9 mb-2">{walletBalance ?? 0}</label>
                                    </div>
                                    <div className="mt-5 pt-4">
                                        <button type="button" className="ct_add_wallet_btn" onClick={onHandleAddAmount}>PLACE BET </button>
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

export default BetAmount