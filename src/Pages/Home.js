import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Headers from '../Components/Headers';
import SideBar from '../Components/SideBar';
import { fetchProfile } from '../Redux/Action/userReducer';
import Loader from '../Components/Loader';
import { curSym, pipGetAccessPopup, pipGetProfile, pipSetAccessPopup } from '../Auth/Pip';
import { pageRoutes } from '../Routes/pageRoutes';
import { DashboardData, todayGameData, todayHistoryData } from '../Redux/Action/walletReducer';
import moment from 'moment';
import { message } from 'antd';
import ReactPagination from '../Layout/ReactPagination';
import PaginationDropdown from '../Layout/PaginationDropdown';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(5);
    const [showPopUp, setShowPopUp] = useState(pipGetAccessPopup());
    const [isShow, setIsShow] = useState(true);
    const { isLoading } = useSelector(
        (state) => state.walletReducer
    );
    const [dashboardData, setDashboardData] = useState({});
    const [gameDataValue, setGameDataValue] = useState([]);
    const [todayGameHistory, setTodayGameHistory] = useState([]);

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const displayUsers = todayGameHistory?.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    useEffect(() => {
        getDashboardValue();
        dispatch(fetchProfile());
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    useEffect(() => {
        console.log({ showPopUp }, { isShow }, "showPopUp");
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now1 = new Date();
            const hours1 = now1.getHours();
            const minutes1 = now1.getMinutes();
            const secondes1 = now1.getSeconds();
            if (hours1 == 14 && minutes1 == 5) {
                if (secondes1 == 0 || secondes1 == 1) {
                    getDashboardValue();
                }
            } else if (hours1 == 17 && minutes1 == 5) {
                if (secondes1 == 0 || secondes1 == 1) {
                    getDashboardValue();
                }
            } else if (hours1 == 21 && minutes1 == 5) {
                if (secondes1 == 0 || secondes1 == 1) {
                    getDashboardValue();
                }
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const getDashboardValue = async () => {
        const value = await dispatch(DashboardData());
        const gameValue = await dispatch(todayGameData());
        const todayHistory = await dispatch(todayHistoryData());
        localStorage.setItem("wallet_balance", JSON.stringify(value?.payload?.data?.wallet_balance ?? 0))
        setDashboardData(value?.payload?.data ?? {});
        setGameDataValue(gameValue?.payload?.data ?? []);
        setTodayGameHistory(todayHistory?.payload?.data ?? [])
    };

    const onHandleSelectBidNumber = (item, i) => {
        if (i == 0) {
            if (hours > 13 || (hours === 13 && minutes >= 50)) {
                message.error("You can not Bet After 1:50 PM")
            } else {
                if (item?.choosen_number?.length <= 10) {
                    navigate(pageRoutes.select_number, { state: { data: item?.game?.game_time, game_id: item?.game?.id, choosen_number: item?.choosen_number } })
                } else {
                    message.error("You have already bet on 10 numbers in this game.")
                }
            }
        } else if (i == 1) {
            if (hours > 16 || (hours === 16 && minutes >= 50)) {
                message.error("You can not Bet After 4:50 PM")
            } else {
                if (item?.choosen_number?.length <= 10) {
                    navigate(pageRoutes.select_number, { state: { data: item?.game?.game_time, game_id: item?.game?.id, choosen_number: item?.choosen_number } })
                } else {
                    message.error("You have already bet on 10 numbers in this game.")
                }
            }
        } else if (i == 2) {
            if (hours > 20 || (hours === 20 && minutes >= 50)) {
                message.error("You can not Bet After 8:50 PM")
            } else {
                if (item?.choosen_number?.length <= 10) {
                    navigate(pageRoutes.select_number, { state: { data: item?.game?.game_time, game_id: item?.game?.id, choosen_number: item?.choosen_number } })
                } else {
                    message.error("You have already bet on 10 numbers in this game.")
                }
            }
        }
    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="ct_dashboard_main_bg">
            <Headers />
            <div className="ct_dashboard_inner">
                <SideBar path="home" />
                <div className="ct_dashboard_right_cnt">
                    <div className="container">
                        <div className="row ">
                            <div className="col-md-12 mb-3" >
                                <h3><span className="ct_fs_35 ct_ff_oswald text-white ct_fw_600" >Choose your Bet time</span>
                                    <span className="ct_dash_yellow_text ct_fs_20 ct_fw_800 ms-3 ct_mob_block">Bet will restart
                                        at 12:00 AM everyday</span></h3>
                            </div>
                            {gameDataValue?.length != 0 ? gameDataValue?.slice(0, 3)?.map((item, i) => (
                                <div className="col-xl-4 col-lg-6 col-md-6 mb-4 mb-lg-0">
                                    <a href="javascript:void(0)" onClick={() => item?.results?.length == 0 ? onHandleSelectBidNumber(item, i) : message.error("You cannot bet after the result is declared.")}
                                        className={`ct_bet_time_card position-relative ${item?.choosen_number?.length != 0 && 'ct_bet_time_card_active'}`}>
                                        {item?.total_winning_amount > 0 &&
                                            <>
                                                <img src="assets/img/celebration_123.gif" className='ct_celebration_left_img' />
                                                <img src="assets/img/celebration_123.gif" className='ct_celebration_right_img' />
                                            </>
                                        }
                                        <div className="d-flex align-items-center gap-4">
                                            <i className="fa-regular fa-clock"></i>
                                            <h4 className="ct_fs_24 mb-0 ct_fw_700">{item?.game?.game_time}</h4>
                                        </div>
                                    </a>
                                    {item?.results?.length == 0 ?
                                        <div className="">
                                            <p className="mb-0 mt-3 ct_fs_24 ct_fw_400 ct_ff_poppin ct_clr_8C98A9 text-center">Result not declared yet.</p>
                                        </div>
                                        : item?.total_winning_amount > 0 ?
                                            <p className="mb-0 mt-3 ct_fs_24 ct_fw_400 ct_ff_poppin ct_clr_8C98A9 text-center">You have won {curSym} {item?.total_winning_amount}</p>
                                            :
                                            <p className="mb-0 mt-3 ct_fs_24 ct_fw_400 ct_ff_poppin ct_clr_8C98A9 text-center">Result declared</p>
                                    }
                                </div>
                            ))
                                :
                                <div className="">
                                    <p className="mb-0 mt-3 ct_fs_24 ct_fw_400 ct_ff_poppin ct_clr_8C98A9 text-center">Games not found.</p>
                                </div>
                            }
                        </div>
                        <div className="row mt-5 ">
                            <div className="col-lg-6 col-md-6 mb-4 mb-lg-0 mx-auto">
                                <div className="ct_dash_card">
                                    <img src="assets/img/wallet_img.svg" alt="" />
                                    <div>
                                        <h4 className="ct_fs_35 text-white mb-3 ct_fw_600 ct_ff_oswald">{curSym}{" "}{dashboardData?.wallet_balance ?? 0} </h4>
                                        <p className="ct_fs_20 mb-0">Wallet's Balance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${showPopUp == false && isShow == true && 'show active ct_display_block'} ct_warning_modal_msg`}
                id="exampleModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 pt-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsShow(false)}></button>
                        </div>
                        <div className="modal-body pt-0">
                            <h5 className="mb-4 ct_fw_600 ct_fs_24 text-center"> Resulta ng Laro:</h5>
                            <ol>
                                <li>Mon-Sat (2PM, 5PM draw) - last 2 numero ng 3D Lotto</li>
                                <li className="mt-2"> M-W-F (9PM draw) - last 2 numero ng 4D Lotto</li>
                                <li className="mt-2">T-TH-S (9PM draw) - last 2 numero ng 6D Lotto</li>
                                <li className="mt-2">Sun (2PM, 5PM, 9PM) - last 2 numero ng 3D Lotto</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${showPopUp == false && isShow == false && 'show active ct_display_block'} ct_warning_modal_msg`}
                id="exampleModal2">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 pt-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                pipSetAccessPopup(true)
                                setShowPopUp(true)
                            }
                            }
                            ></button>
                        </div>
                        <div className="modal-body pt-0">
                            <h5 className="mb-4 ct_fw_600 ct_fs_24 text-center"> Paalala:</h5>
                            <ol>
                                <li>
                                    Lahat ng nanalong numero ay ipo-post 10 minuto pagkatapos ng pag-post ng resulta ng PCSO.

                                </li>
                                <li className="mt-2"> Lahat ng withdrawal request bago mag 10PM ay babayaran sa parehong araw, habang ang request pagkatapos ng 10PM ay babayaran kinabukasan simula 9AM.  </li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )


}

export default Home;