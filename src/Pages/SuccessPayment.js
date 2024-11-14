import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Loader from '../Components/Loader';
import { DepositeMoney, PaymentStatus } from '../Redux/Action/walletReducer';
import { pageRoutes } from '../Routes/pageRoutes';
import '../sucess.scss';

const SuccessPayment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSuccess, setIsSuccess] = useState(false);
    const { isLoading } = useSelector(
        (state) => state.walletReducer
    );

    useEffect(() => {
        const order_id = window.location.search?.split("&")[1]?.split("=")[1]
        const callback = async (response) => {
            if (response?.success) {
                if (response?.payment == 0) {
                    addPayment(response?.data?.price);
                } else {
                    setTimeout(() => {
                        navigate(pageRoutes.wallet);
                    }, 2000)
                }
            } else {
                setTimeout(() => {
                    navigate(pageRoutes.wallet);
                }, 2000)
            }
        };
        const data = {
            order_id: order_id
        }
        dispatch(PaymentStatus({ payload: data, callback }));
    }, []);

    const addPayment = (val) => {
        const callback = async (response) => {
            if (response?.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate(pageRoutes.wallet);
                }, 2000)
            }
        };
        const data = {
            transaction_type: "Deposit",
            amount: val
        }
        dispatch(DepositeMoney({ payload: data, callback }));
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="ct_dashboard_main_bg">
            { isSuccess ?
                <div class="main-container">
                    <div class="check-container">
                        <div class="check-background">
                            <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="check-shadow"></div>
                    </div>
                    <div className="mt-2 text-white">
                        Payment deposit successfully.
                </div>
                </div>
                :
                <div class="main-container">
                    <svg class="cross__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="cross__circle" cx="26" cy="26" r="25" fill="none" />
                        <path class="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
                        <path class="cross__path cross__path--right" fill="none" d="M16,36 l20,-20" />
                    </svg>
                    <div className="mt-2 text-white">
                        Payment failed!
                </div>
                </div>
            }
        </div>
    )
}

export default SuccessPayment;