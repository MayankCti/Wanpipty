import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Headers from '../Components/Headers'
import SideBar from '../Components/SideBar'
import { allTransactionData, DashboardData, getUpdatedWalletData } from '../Redux/Action/walletReducer';
import { pageRoutes } from '../Routes/pageRoutes';
import Loader from '../Components/Loader';
import moment from 'moment';
import { curSym } from '../Auth/Pip';
import ReactPagination from '../Layout/ReactPagination';
import PaginationDropdown from '../Layout/PaginationDropdown';

const Wallet = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(5);
    const { isLoading } = useSelector(
        (state) => state.walletReducer
    );
    const [dashboardData, setDashboardData] = useState();
    const [getAllTransactionData, setGetAllTransactionData] = useState([]);

    const displayUsers = getAllTransactionData?.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    useEffect(() => {
        onHandleGetWallet();
    }, []);

    const onHandleGetWallet = async () => {
        await dispatch(getUpdatedWalletData()).then((res) => {
            getWalletData();
        });
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getWalletData = async () => {
        const value = await dispatch(DashboardData());
        setDashboardData(value?.payload?.data);
        const values = await dispatch(allTransactionData());
        setGetAllTransactionData(values?.payload?.data ?? []);
        console.log(values?.payload?.data, "object")
    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="ct_dashboard_main_bg">
            <Headers />
            <div className="ct_dashboard_inner">
                <SideBar path="wallet" />
                <div className="ct_dashboard_right_cnt">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-5 mx-auto mb-4">
                                <div className="ct_my_wallet_bg">
                                    <div className="d-flex align-items-center gap-3">
                                        <img src="assets/img/wallet_img.svg" alt="" />
                                        <div>
                                            <h4 className="ct_fs_24 ct_fw_600 text-white ct_ff_oswald">My Wallet</h4>
                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                <img src="assets/img/peso_icon.png" alt="" className="ct_img_20" />
                                                <p className="mb-0 ct_fs_20 ct_clr_FFC701 ct_fw_600">{" "}{dashboardData?.wallet_balance ?? 0}</p><i className="fa-solid fa-arrows-rotate ct_refress_hover" onClick={onHandleGetWallet}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <a onClick={() => navigate(pageRoutes.add_money)}><button className="ct_reinvest_btn d-flex align-items-center ps-2 gap-2"><img src="assets/img/top.png" alt="" className="ct_img_25" /><span className="mx-auto ct_clr_FFC701 ct_fw_700 ct_btn_136">+Add</span> </button></a>
                                        <a onClick={() => navigate(pageRoutes.withdraw, { state: { data: dashboardData?.wallet_balance } })}> <button className="ct_reinvest_btn d-flex align-items-center ps-2 gap-2 mt-2"><img src="assets/img/down.png" alt="withdraw.html" className="ct_img_25" /><span className="mx-auto ct_red_text ct_fw_700 ct_btn_136">-Withdraw</span> </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-12">
                                <h3><span className="ct_fs_30 ct_ff_oswald text-white ct_fw_600">Wallet Transaction</span></h3>
                                {displayUsers?.length != 0 &&
                                    <>
                                        <div className="table-responsive ">
                                            <table className="table ct_custom_table">
                                                <thead>
                                                    <tr>
                                                        <th>S No.</th>
                                                        <th></th>
                                                        <th>Status</th>
                                                        <th>Amount </th>
                                                        <th>Time</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        displayUsers?.map((item, i) => (
                                                            <tr>
                                                                <td><p className="text-white">{i + 1}</p></td>
                                                                <td>
                                                                    <img src={item?.transaction_type == "Deposit" || item?.transaction_type == "BetWin" ? "assets/img/top.png" : "assets/img/down.png"} alt="" />
                                                                </td>
                                                                <td>
                                                                    <p className={`mb-0  ${item?.transaction_type == "Deposit" || item?.transaction_type == "BetWin" ? "ct_green_text" : "ct_red_text"} ct_fs_18 ct_fw_600`}>{item?.transaction_type}</p>
                                                                </td>
                                                                <td>
                                                                    <p className={`mb-0 ${item?.transaction_type == "Deposit" || item?.transaction_type == "BetWin" ? "ct_green_text" : "ct_red_text"} ct_fs_18 ct_fw_600`}>{curSym}{" "}{item?.amount}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="mb-0 ct_clr_FFC701 ct_fs_18 ct_fw_600">{moment(item?.created_at).format('HH:mm MMMM DD YYYY')}</p>
                                                                </td>
                                                                <td><p className="mb-0 ct_clr_FFC701 ct_fs_18 ct_fw_600">{item?.status == true ? "Completed" : "Pending"}</p></td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-3">
                                            {
                                                getAllTransactionData?.length > 0 && <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 mb-3">
                                                    <PaginationDropdown
                                                        onChange={(val) => {
                                                            setUserPerPages(val);
                                                            setCurrentPage(0);
                                                        }}
                                                    />
                                                    <ReactPagination
                                                        pageCount={Math.ceil(
                                                            getAllTransactionData.length / usersPerPage
                                                        )}
                                                        onPageChange={handlePageClick}
                                                        currentPage={currentPage}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </>
                                }
                                {getAllTransactionData?.length == 0 &&
                                    <div className="">
                                        <p className="mb-0 mt-3 ct_fs_24 ct_fw_400 ct_ff_poppin ct_clr_8C98A9 text-center">No transactions found.</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet