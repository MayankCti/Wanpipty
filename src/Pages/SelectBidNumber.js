import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";
import Headers from "../Components/Headers";
import Loader from "../Components/Loader";
import SideBar from "../Components/SideBar";
import { fetchBidNumbers } from "../Redux/Action/userReducer";
import { pageRoutes } from "../Routes/pageRoutes";
import './Scroll.css'

const SelectBidNumber = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [seletedBidNumber, setSelectedBidNumber] = useState(
    state?.datas && state?.datas
  );
  const [selectNumber, setSelectNumber] = useState(state?.datas?.split('') ?? ["0", "0"])
  const { isLoading, bidNumbers } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const data = {
      game_time: state?.data,
    };
    dispatch(fetchBidNumbers({ payload: data }));
  }, []);

  const onHandleValueChange = (index, val, data) => {
    const newArray = [...selectNumber];
    if (data >= 1 && data <= 8) {
      newArray[index] = val == "plus" ? parseInt(data) + 1 : parseInt(data) - 1;
    } else if (data == 0 && val === "plus") {
      newArray[index] = parseInt(data) + 1;
    } else if (data == 9 && val === "minus") {
      newArray[index] = parseInt(data) - 1;
    }
    setSelectNumber(newArray)
  };

  const onHandleValueChange1 = (index, val, data) => {
    const newArray = [...selectNumber];
    if (selectNumber[0] > 0) {
      if (data >= 1 && data <= 8) {
        newArray[index] = val == "plus" ? parseInt(data) + 1 : parseInt(data) - 1;
      } else if (data == 0 && val === "plus") {
        newArray[index] = parseInt(data) + 1;
      } else if (data == 9 && val === "minus") {
        newArray[index] = parseInt(data) - 1;
      }
    } else {
      if (data > 1 && data < 9) {
        newArray[index] = val == "plus" ? parseInt(data) + 1 : parseInt(data) - 1;
      } else if (data == 1 && val === "plus") {
        newArray[index] = parseInt(data) + 1;
      } else if (data == 9 && val === "minus") {
        newArray[index] = parseInt(data) - 1;
      }
    }
    setSelectNumber(newArray)
  };

  const navigateToNextPage = () => {
    if (state?.choosen_number?.length < 10) {
      if (state?.choosen_number?.includes(selectNumber?.join(''))) {
        message.error(`You have already bet on this number ${selectNumber?.join('')}`)
      } else {
        bidNumbers?.map((item) => (
          selectNumber?.join('') == item?.number &&
          navigate(pageRoutes.bet_amount, {
            state: {
              data: state.data,
              datas: selectNumber?.join(''),
              game_id: state.game_id,
              message: item?.completed_percentage ? item?.completed_percentage : 0,
              choosen_number: state?.choosen_number
            },
          })
        ));
      }
    } else {
      message.error("You have already bet on 10 numbers in this game.")
    }
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="ct_dashboard_main_bg">
      <Headers />
      <div className="ct_dashboard_inner">
        <SideBar />
        <div className="ct_dashboard_right_cnt">
          <div className="container">
            <div className="row">
              {state?.choosen_number &&
                state?.choosen_number?.length != 0 &&
                <div className="col-md-12">
                  <h4 className="ct_fs_20 text-white text-center mb-4">Here are the numbers you've already bet on</h4>
                  <div className="d-flex align-items-center justify-content-center gap-3  flex-wrap mb-4">
                    {state?.choosen_number?.length != 0 &&
                      state?.choosen_number?.map((item) => (
                        <div className="ct_small_num_box ct_mx_0 ">
                          <img
                            src="assets/img/ct_num_fill.png"
                            alt=""
                          />
                          <h4
                            className="mb-0 ct_fw_900 text-white"
                          >
                            {item}
                          </h4>
                        </div>
                      ))}
                  </div>
                </div>
              }
            </div>
            <div className="row align-items-center ct_reverse_row_res">
              <div className="col-xl-4 mb-4 mb-xl-0">
                <div>
                  <div className="ct_bet_time_card  ct_bet_amount_bg_unset border-0 justify-content-center text-center d-block">
                    <div className="mt-xl-5 pt-4">
                      <div className="ct_small_num_box ct_small_box_154">
                        <img
                          src={
                            selectNumber?.join('')
                              ? "assets/img/ct_num_fill.png"
                              : "assets/img/ct_num_transparent.svg"
                          }
                          alt=""
                        />
                        <h4
                          className={`mb-0 ct_fw_900 ${selectNumber?.join('') && "text-white"
                            }`}
                        >
                          {selectNumber?.join('') ?? (
                            <i className="fa-solid fa-question"></i>
                          )}
                        </h4>
                      </div>
                      <div className="mt-5">
                        <a
                          href="javascript:void(0)"
                          onClick={navigateToNextPage}
                          className="ct_next_outline_btn ct_fw_600"
                        >
                          Next
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 offset-xl-1 mb-4 mb-xl-0">
                <div className="ct_bet_time_card mb-5 ct_bet_amount_bg_unset border-0 justify-content-center text-center d-block">
                  <div className="d-flex align-items-center gap-4 justify-content-center">
                    <i className="fa-regular fa-clock"></i>
                    <h4 className="ct_fs_24 mb-0 ct_fw_700">{state?.data}</h4>
                  </div>
                  <h4 className="ct_dash_yellow_text ct_fw_700 ct_ff_oswald mt-3">
                    Choose the number
                    </h4>
                </div>
                <div className="d-flex align-items-center flex-wrap gap-5 justify-content-center ct_bat_slider_345">
                  <div className="ct_bat_num_in_dec">
                    <div className="ct_decrease_btn" onClick={() => onHandleValueChange(0, "plus", selectNumber[0])}>
                      <i className="fa-solid fa-angle-up"></i>
                    </div>
                    <div className="ct_small_num_box my-2">
                      <img src="assets/img/ct_num_transparent.svg" alt="" />
                      <h4 className="mb-0 ct_fw_900 text-white">{selectNumber[0]}</h4>
                    </div>
                    <div className="ct_decrease_btn" onClick={() => onHandleValueChange(0, "minus", selectNumber[0])}>
                      <i className="fa-solid fa-angle-down" ></i>
                    </div>
                  </div>
                  <div className="ct_bat_num_in_dec">
                    <div className="ct_decrease_btn" onClick={() => onHandleValueChange(1, "plus", selectNumber[1])}>
                      <i className="fa-solid fa-angle-up"></i>
                    </div>
                    <div className="ct_small_num_box my-2">
                      <img src="assets/img/ct_num_transparent.svg" alt="" />
                      <h4 className="mb-0 ct_fw_900 text-white">{selectNumber[1]}</h4>
                    </div>
                    <div className="ct_decrease_btn" onClick={() => onHandleValueChange(1, "minus", selectNumber[1])}>
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SelectBidNumber;