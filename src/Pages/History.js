import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../Components/Headers'
import SideBar from '../Components/SideBar'
import Loader from '../Components/Loader';
import { allHistoryData } from '../Redux/Action/walletReducer';
import moment from 'moment';
import { curSym } from '../Auth/Pip';
import ReactPagination from '../Layout/ReactPagination';
import PaginationDropdown from '../Layout/PaginationDropdown';

const History = () => {
    const dispatch = useDispatch();
    const [allHistoryDatas, setAllHistoryDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(5);
    const { isLoading } = useSelector(
        (state) => state.walletReducer
    );

    const displayUsers = allHistoryDatas?.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    useEffect(() => {
        getAllHistoryData();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getAllHistoryData = async () => {
        const data = await dispatch(allHistoryData());
        setAllHistoryDatas(data?.payload?.data ?? []);
        console.log(data?.payload?.data);
    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="ct_dashboard_main_bg">
            <Headers />
            <div className="ct_dashboard_inner">
                <SideBar path="history" />
                <div className="ct_dashboard_right_cnt">
                    <div className="container">
                        <div className="row ">
                            <div className="col-md-12">
                                <h3><span className="ct_fs_30 ct_ff_oswald text-white ct_fw_600">Result History</span></h3>
                                {displayUsers?.length != 0 ?
                                    <>
                                        <div className="table-responsive ">
                                            <table className="table ct_custom_table">
                                                <thead>
                                                    <tr>
                                                        <th>S No.</th>
                                                        <th>Winning Number</th>
                                                        <th>Status</th>
                                                        <th>Amount </th>
                                                        <th>Game Time</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {displayUsers?.map((item, i) => (
                                                        <tr>
                                                            <td><p className="text-white">{i + 1}</p></td>
                                                            <td>
                                                                <div className="ct_small_num_box mx-auto ct_img_op_hover">
                                                                    <img src="assets/img/ct_num_fill.png" alt="" />
                                                                    <h4 className="mb-0 ct_dash_yellow_text ct_fw_900">{item?.bet?.choosen_number?.toString()?.length == 1 ? `0${item?.bet?.choosen_number}` : item?.bet?.choosen_number}</h4>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p className={`mb-0 ${item?.is_winning == true ? 'ct_green_text' : 'ct_red_text'} ct_fs_18 ct_fw_600`}>{item?.is_winning == true ? 'You Win' : 'You Lose'}</p>
                                                            </td>
                                                            <td>
                                                                <p className={`mb-0 ${item?.is_winning == true ? 'ct_green_text' : 'ct_red_text'} ct_fs_18 ct_fw_600`}>{curSym}{" "}{item?.is_winning == true ? item?.winning_amount : item?.bet?.bet_amount}</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 ct_clr_FFC701 ct_fs_18 ct_fw_600">{item?.game?.game_time ?? 'NA'}</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 ct_clr_FFC701 ct_fs_18 ct_fw_600">{moment(item?.created_at).format('HH:mm MMMM DD YYYY')}</p>
                                                            </td>
                                                            {/* <td>
                                                        <button className="ct_reinvest_btn">Reinvest AGAIN </button>
                                                    </td> */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-3">
                                            {
                                                allHistoryDatas?.length > 0 && <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 mb-3">
                                                    <PaginationDropdown
                                                        onChange={(val) => {
                                                            setUserPerPages(val);
                                                            setCurrentPage(0);
                                                        }}
                                                    />
                                                    <ReactPagination
                                                        pageCount={Math.ceil(
                                                            allHistoryDatas.length / usersPerPage
                                                        )}
                                                        onPageChange={handlePageClick}
                                                        currentPage={currentPage}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </>
                                    :
                                    <div className="">
                                        <p className="mb-0 mt-3 ct_fs_24 ct_fw_400 ct_ff_poppin ct_clr_8C98A9 text-center">No history found.</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default History
