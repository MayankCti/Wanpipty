import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Headers from "../Components/Headers";
import SideBar from "../Components/SideBar";
import {
  fetchProfile,
  updateUserProfileData,
} from "../Redux/Action/userReducer";
import { pageRoutes } from "../Routes/pageRoutes";
import Loader from "../Components/Loader";
import ColumnGroup from "antd/es/table/ColumnGroup";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.userReducer);
  const [userData, setUserData] = useState({});
  const [changeImage, setChangeImage] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [full_name_error, setFullNameError] = useState("");
  const [user_name_error, setUserNameError] = useState("");

  useEffect(() => {
    profileData();
  }, [isEdit]);

  const profileData = async () => {
    const data = await dispatch(fetchProfile());
    setUserData(data?.payload?.data ?? {});
  };

  const onHandleImageChange = (e) => {
    setChangeImage(e.target.files[0]);
  };

  const onUpdateProfile = () => {
    const data = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/;
    const data2 = /^[a-zA-Z0-9]+$/;
    if (data?.test(userData?.full_name) && data2?.test(userData?.username)) {
      const callback = async (response) => {
        if (response?.success) {
          setIsEdit(false);
        }
      };
      const formData = new FormData();
      formData.append("username", userData?.username);
      formData.append("full_name", userData?.full_name);
      if (changeImage) {
        formData.append("file", changeImage);
      }
      dispatch(updateUserProfileData({ payload: formData, callback }));
    } else {
      if (!data?.test(userData?.full_name)) {
        setFullNameError("Please enter your full name (first and last name)");
      } else if (!data?.test(userData?.username)) {
        setUserNameError("Please enter username");
      }
    }
  };

  const onChangeFullName = (e) => {
    setUserData({
      ...userData,
      full_name: e.target.value,
    });
    const data = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/;
    if (!data?.test(e.target.value)) {
      setFullNameError("Please enter your full name (first and last name)");
    } else {
      setFullNameError("");
    }
  };

  const onChangeUserName = (e) => {
    setUserData({
      ...userData,
      username: e.target.value,
    });
    const data2 = /^[a-zA-Z0-9]+$/;
    if (!data2?.test(e.target.value)) {
      setUserNameError("Please enter username");
    } else {
      setUserNameError("");
    }
  };

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
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <h3>
                    <span className="ct_fs_30 ct_ff_oswald text-white ct_fw_600">
                      My Profile
                    </span>
                  </h3>
                  <div className="d-flex align-items-center gap-3">
                    {!isEdit && (
                      <button
                        className="ct_yellow_btn"
                        onClick={() => setIsEdit(!isEdit)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => navigate(pageRoutes.change_password)}
                      className="ct_yellow_btn w-auto"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 pt-4">
              <div className="col-md-6 mx-auto">
                <div className="ct_main_profile_section">
                  <div className="ct_main_profile_section_img mx-auto text-center mb-4">
                    <img
                      src={
                        changeImage
                          ? URL.createObjectURL(changeImage)
                          : userData?.profile_image ?? "assets/img/user124.jpg"
                      }
                      alt=""
                      className="ct_img_148"
                    />
                    {isEdit && (
                      <label for="ct_profile_upload">
                        <input
                          type="file"
                          name=""
                          onChange={onHandleImageChange}
                          className="d-none"
                          id="ct_profile_upload"
                          accept="image/*"
                        />
                        <div className="ct_upload_img_icon ct_pointer_curser">
                          <i className="fa-solid fa-pen"></i>
                        </div>
                      </label>
                    )}
                  </div>
                  <form>
                    <div className="form-group mb-4">
                      <label for="" className="ct_clr_8C98A9 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userData?.full_name}
                        onChange={(e) => onChangeFullName(e)}
                        className="form-control ct_profile_input"
                        placeholder="Enter Full Name"
                        readOnly={!isEdit ? true : false}
                      />
                      {full_name_error != "" && (
                        <span style={{ color: "red" }}>{full_name_error}</span>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label for="" className="ct_clr_8C98A9 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={userData?.username}
                        onChange={(e) => onChangeUserName(e)}
                        className="form-control ct_profile_input"
                        placeholder="Enter Username"
                        readOnly={!isEdit ? true : false}
                      />
                      {user_name_error != "" && (
                        <span style={{ color: "red" }}>{user_name_error}</span>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label for="" className="ct_clr_8C98A9 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        value={userData?.mobile_number ?? ""}
                        className="form-control ct_profile_input"
                        placeholder="Enter Mobile Number"
                        readOnly
                      />
                    </div>
                    {isEdit && (
                      <a
                        className="ct_yellow_btn w-auto mt-5 ct_pointer_curser"
                        onClick={onUpdateProfile}
                      >
                        Submit
                      </a>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
